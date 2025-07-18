import {
	PropertyKeyInSpreadSheet,
	ScriptPropertyKeys,
	SettingConfig,
} from './types';
import { createNotionClient } from '@clarity-suite/notion';

export function isValidScriptProperty(
	key: string,
	SCRIPT_PROPERTIES_MAP: Record<PropertyKeyInSpreadSheet, ScriptPropertyKeys>,
): key is keyof typeof SCRIPT_PROPERTIES_MAP {
	return key in SCRIPT_PROPERTIES_MAP;
}

/**
 * VARIABLES라는 이름의 Notion DB에서 환경변수를 읽어 AppsScript ScriptProperties에 등록한다.
 * @param config 기존 SettingConfig (SCRIPT_PROPERTIES_MAP 등 활용)
 */
export function applySettingsFromNotionVariables(config: SettingConfig): void {
	Logger.log(
		`[applySettingsFromNotionVariables] 설정으로 시작: ${JSON.stringify(config)}`,
	);
	try {
		// 1. NOTION_SECRET을 우선 시트/환경 등에서 받아온다 (여기선 ScriptProperties에서 시도)
		const notionSecret =
			PropertiesService.getScriptProperties().getProperty('NOTION_SECRET');
		Logger.log(
			`[applySettingsFromNotionVariables] ScriptProperties에서 NOTION_SECRET: ${notionSecret ? '찾음' : '찾지 못함'}`,
		);
		if (!notionSecret) {
			Logger.log('[applySettingsFromNotionVariables] Notion 토큰이 없음');
			SpreadsheetApp.getUi().alert('⚠️ 먼저 Notion 토큰을 입력해주세요.');
			return;
		}
		const notion = createNotionClient(notionSecret);
		Logger.log('[applySettingsFromNotionVariables] Notion 클라이언트 생성됨');

		// 2. VARIABLES DB 찾기
		Logger.log(
			'[applySettingsFromNotionVariables] VARIABLES 데이터베이스 검색 중...',
		);
		const dbSearch = notion.findDatabaseByName('VARIABLES', notionSecret);
		Logger.log(
			`[applySettingsFromNotionVariables] 데이터베이스 검색 결과: ${JSON.stringify(dbSearch)}`,
		);
		if (!dbSearch.results || dbSearch.results.length === 0) {
			Logger.log(
				'[applySettingsFromNotionVariables] VARIABLES DB를 찾을 수 없음',
			);
			SpreadsheetApp.getUi().alert(
				'❌ Notion에서 VARIABLES DB를 찾을 수 없습니다.',
			);
			return;
		}
		if (dbSearch.results.length > 1) {
			Logger.log(
				`[applySettingsFromNotionVariables] VARIABLES DB가 여러 개 발견됨: ${dbSearch.results.length}개`,
			);
			SpreadsheetApp.getUi().alert(
				'❌ VARIABLES DB가 여러 개 있습니다. 고유한 이름을 사용해주세요.',
			);
			return;
		}
		const variablesDbId = dbSearch.results[0].id.replace(/-/g, '');
		Logger.log(
			`[applySettingsFromNotionVariables] VARIABLES DB ID 발견: ${variablesDbId}`,
		);

		// 3. VARIABLES DB의 모든 row 읽기
		Logger.log(
			'[applySettingsFromNotionVariables] VARIABLES DB에서 모든 페이지 읽는 중...',
		);
		const pages = notion.getPages(variablesDbId, { page_size: 100 });
		Logger.log(
			`[applySettingsFromNotionVariables] ${pages.results.length}개의 페이지 발견`,
		);

		const rawProps: Record<string, string> = {};
		pages.results.forEach((page, index) => {
			Logger.log(
				`[applySettingsFromNotionVariables] 페이지 ${index + 1} 처리 중: ${JSON.stringify(page.id)}`,
			);
			const props = page.properties;
			Logger.log(
				`[applySettingsFromNotionVariables] 페이지 속성 키들: ${Object.keys(props)}`,
			);

			// property key는 실제 DB의 property명과 일치해야 함 (예: 'Name', 'Value')
			const nameProp = props['Name'];
			const valueProp = props['Value'];

			Logger.log(
				`[applySettingsFromNotionVariables] Name 속성: ${JSON.stringify(nameProp)}`,
			);
			Logger.log(
				`[applySettingsFromNotionVariables] Value 속성: ${JSON.stringify(valueProp)}`,
			);

			if (!nameProp || !valueProp) {
				Logger.log(
					'[applySettingsFromNotionVariables] Name 또는 Value 속성이 없음, 건너뜀',
				);
				return;
			}

			const name =
				nameProp.type === 'title' ? nameProp.title[0]?.plain_text?.trim() : '';
			Logger.log(`[applySettingsFromNotionVariables] 추출된 이름: "${name}"`);
			if (!name) {
				Logger.log(
					'[applySettingsFromNotionVariables] 이름이 비어있음, 건너뜀',
				);
				return;
			}

			let value = '';
			if (valueProp.type === 'rich_text') {
				// rich_text 배열에서 mention 타입 처리
				if (valueProp.rich_text.length > 0) {
					const firstRichText = valueProp.rich_text[0];
					if (
						firstRichText.type === 'mention' &&
						firstRichText.mention.type === 'database'
					) {
						// mention 타입이고 database인 경우 ID 추출
						value = firstRichText.mention.database.id.replace(/-/g, '');
						Logger.log(
							`[applySettingsFromNotionVariables] mention에서 데이터베이스 ID 추출: "${value}"`,
						);
					} else {
						// 일반 텍스트인 경우 plain_text 사용
						value = firstRichText.plain_text?.trim() || '';
						Logger.log(
							`[applySettingsFromNotionVariables] rich_text plain_text에서 값 추출: "${value}"`,
						);
					}
				} else {
					value = '';
					Logger.log(
						`[applySettingsFromNotionVariables] rich_text 배열이 비어있음`,
					);
				}
			} else if (valueProp.type === 'url') {
				value = valueProp.url?.trim() || '';
				Logger.log(
					`[applySettingsFromNotionVariables] url에서 값 추출: "${value}"`,
				);
			}

			if (!value) {
				Logger.log('[applySettingsFromNotionVariables] 값이 비어있음, 건너뜀');
				return;
			}

			// mention type이 database인 경우는 이미 위에서 ID로 처리됨
			// 추가적인 DB 링크 처리 로직 제거

			if (isValidScriptProperty(name, config.SCRIPT_PROPERTIES_MAP)) {
				const key = config.SCRIPT_PROPERTIES_MAP[name];
				rawProps[key] = value;
				Logger.log(
					`[applySettingsFromNotionVariables] rawProp 설정: ${key} = "${value}"`,
				);
			} else {
				Logger.log(
					`[applySettingsFromNotionVariables] 이름 "${name}"이 유효한 스크립트 속성이 아님, 건너뜀`,
				);
			}
		});

		Logger.log(
			`[applySettingsFromNotionVariables] 최종 rawProps: ${JSON.stringify(rawProps)}`,
		);

		if (!rawProps['NOTION_SECRET']) {
			// NOTION_SECRET은 기존 값 유지
			rawProps['NOTION_SECRET'] = notionSecret;
			Logger.log(
				`[applySettingsFromNotionVariables] rawProps에 NOTION_SECRET 추가됨`,
			);
		}

		Logger.log(
			`[applySettingsFromNotionVariables] 스크립트 속성 설정: ${JSON.stringify(rawProps)}`,
		);
		PropertiesService.getScriptProperties().setProperties(rawProps, true);
		SpreadsheetApp.getActiveSpreadsheet().toast(
			'✅ Notion에서 변수를 성공적으로 불러왔습니다',
			'완료',
			5,
		);
		Logger.log('[applySettingsFromNotionVariables] 성공적으로 완료됨');
	} catch (e) {
		const message =
			e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
		Logger.log(`[applySettingsFromNotionVariables] 오류: ${message}`);
		Logger.log(
			`[applySettingsFromNotionVariables] 오류 스택: ${e instanceof Error ? e.stack : '스택 트레이스 없음'}`,
		);
		SpreadsheetApp.getUi().alert(`❌ ${message}`);
	}
}
