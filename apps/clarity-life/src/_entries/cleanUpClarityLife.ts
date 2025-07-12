import { appsScriptProperties } from 'services/_shared/appsScriptProperties';
import { assertEnvs } from 'services/_shared/asserts';
import { clearNotionTable } from 'services/common/index';

function cleanUpClarityLife() {
	const ui = SpreadsheetApp.getUi();
	const response = ui.alert(
		'Are you sure you want to delete all data?',
		'This action cannot be undone. Do you want to continue?',
		ui.ButtonSet.OK_CANCEL,
	);

	if (response !== ui.Button.OK) {
		SpreadsheetApp.getActiveSpreadsheet().toast(
			'Operation cancelled.',
			'Cancelled',
			3,
		);
		return;
	}

	assertEnvs(appsScriptProperties);

	const {
		PIGGY_TRANSACTION_NOTION_DB_ID,
		STOCK_TRANSACTION_NOTION_DB_ID,
		ACCOUNT_HUB_NOTION_DB_ID,
		ACCOUNT_SNAPSHOT_NOTION_DB_ID,
		PORTFOLIO_NOTION_DB_ID,
	} = appsScriptProperties;

	clearNotionTable(PIGGY_TRANSACTION_NOTION_DB_ID);
	clearNotionTable(STOCK_TRANSACTION_NOTION_DB_ID);
	clearNotionTable(ACCOUNT_HUB_NOTION_DB_ID);
	clearNotionTable(ACCOUNT_SNAPSHOT_NOTION_DB_ID);
	clearNotionTable(PORTFOLIO_NOTION_DB_ID);

	SpreadsheetApp.getActiveSpreadsheet().toast(
		'✅ Clarity Life cleaned up successfully',
		'Complete',
		5,
	);
}

cleanUpClarityLife();
