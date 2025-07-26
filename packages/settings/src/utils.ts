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
	try {
		const notionSecret =
			PropertiesService.getScriptProperties().getProperty('NOTION_SECRET');
		
		if (!notionSecret) {
			SpreadsheetApp.getUi().alert('⚠️ 먼저 Notion 토큰을 입력해주세요.');
			return;
		}

		const notion = createNotionClient(notionSecret);
		const dbSearch = notion.findDatabaseByName('VARIABLES', notionSecret);

		if (!dbSearch.results || dbSearch.results.length === 0) {
			SpreadsheetApp.getUi().alert(
				'❌ Notion에서 VARIABLES DB를 찾을 수 없습니다.',
			);
			return;
		}
		
		if (dbSearch.results.length > 1) {
			SpreadsheetApp.getUi().alert(
				'❌ VARIABLES DB가 여러 개 있습니다. 고유한 이름을 사용해주세요.',
			);
			return;
		}

		const variablesDbId = dbSearch.results[0].id.replace(/-/g, '');
		const pages = notion.getPages(variablesDbId, { page_size: 100 });
		Logger.log(`VARIABLES DB에서 ${pages.results.length}개 설정 로드 중`);

		const rawProps: Record<string, string> = {};
		
		pages.results.forEach((page) => {
			const props = page.properties;
			const nameProp = props.Name;
			const valueProp = props.Value;

			if (!nameProp || !valueProp) return;

			const name =
				nameProp.type === 'title' ? nameProp.title[0]?.plain_text?.trim() : '';

			if (!name) return;

			let value = '';
			if (valueProp.type === 'rich_text') {
				if (valueProp.rich_text.length > 0) {
					const firstRichText = valueProp.rich_text[0];
					if (
						firstRichText.type === 'mention' &&
						firstRichText.mention.type === 'database'
					) {
						value = firstRichText.mention.database.id.replace(/-/g, '');
					} else {
						value = firstRichText.plain_text?.trim() || '';
					}
				}
			} else if (valueProp.type === 'url') {
				value = valueProp.url?.trim() || '';
			}

			if (!value) return;

			if (isValidScriptProperty(name, config.SCRIPT_PROPERTIES_MAP)) {
				const key = config.SCRIPT_PROPERTIES_MAP[name];
				rawProps[key] = value;
			}
		});

		if (!rawProps['NOTION_SECRET']) {
			rawProps['NOTION_SECRET'] = notionSecret;
		}

		PropertiesService.getScriptProperties().setProperties(rawProps, true);
		SpreadsheetApp.getActiveSpreadsheet().toast(
			'✅ Notion에서 변수를 성공적으로 불러왔습니다',
			'완료',
			5,
		);
		Logger.log(`설정 완료: ${Object.keys(rawProps).length}개 속성 설정됨`);
	} catch (e) {
		const message =
			e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
		Logger.log(`설정 오류: ${message}`);
		SpreadsheetApp.getUi().alert(`❌ ${message}`);
	}
}
