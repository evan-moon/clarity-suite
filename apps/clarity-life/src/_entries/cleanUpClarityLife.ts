import { assertEnvs } from '@clarity-suite/utils';
import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { clearNotionTable } from 'services/common/index';

function cleanUpClarityLife() {
	const ui = SpreadsheetApp.getUi();
	const response = ui.alert(
		'정말 모든 데이터를 지우시겠어요?',
		'이 동작은 되돌릴 수 없습니다. 신중하게 확인해주세요.',
		ui.ButtonSet.OK_CANCEL,
	);

	if (response !== ui.Button.OK) {
		SpreadsheetApp.getActiveSpreadsheet().toast(
			'청소가 취소되었습니다.',
			'취소',
			3,
		);
		return;
	}

	assertEnvs(appsScriptProperties);

	const { STOCK_TRANSACTION_NOTION_DB_ID, PORTFOLIO_NOTION_DB_ID } =
		appsScriptProperties;

	clearNotionTable(STOCK_TRANSACTION_NOTION_DB_ID);
	clearNotionTable(PORTFOLIO_NOTION_DB_ID);

	SpreadsheetApp.getActiveSpreadsheet().toast(
		'✅ Clarity Life가 성공적으로 청소되었습니다.',
		'완료',
		5,
	);
}

cleanUpClarityLife();
