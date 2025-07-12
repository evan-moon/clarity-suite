import { isClarityCreatorKit, isClarityLife } from 'services/_shared/appsScriptProperties';

function onOpen() {
  const ui = SpreadsheetApp.getUi();

  if (isClarityLife()) {
    ui.createMenu('💎 Clarity Life')
      .addSubMenu(
        SpreadsheetApp.getUi()
          .createMenu('🔄 Manual Update')
          .addItem('Update Realtime Stocks', 'syncRealtimeStocks')
          .addItem('Update Realtime Currencies', 'syncRealtimeCurrencies')
          .addItem('Sync Transaction Currency Rates (Max 50)', 'syncTransactionsCurrencies')
      )
      .addSubMenu(
        SpreadsheetApp.getUi()
          .createMenu('📜 Generate Report')
          .addItem('Snapshot Account Hub', 'takeAccountHubSnapshots')
          .addItem('Snapshot Portfolio', 'takePortfolioSnapshots')
      )
      .addSubMenu(
        SpreadsheetApp.getUi()
          .createMenu('⚙️ Settings')
          .addItem('Connect to Notion', 'applySettingsFromSheet')
          .addItem('Set Trigger', 'setTrigger')
          .addItem('Clean Up Clarity Life ', 'cleanUpClarityLife')
      )
      .addToUi();
  } else if (isClarityCreatorKit()) {
    ui.createMenu('💎 Clarity Creator Kit')
      .addSubMenu(
        SpreadsheetApp.getUi()
          .createMenu('🔄 Manual Update')
          .addItem('Update Realtime Stocks', 'syncRealtimeStocks')
          .addItem('Update Realtime Currencies', 'syncRealtimeCurrencies')
      )
      .addSubMenu(
        SpreadsheetApp.getUi()
          .createMenu('⚙️ Settings')
          .addItem('Connect to Notion', 'applySettingsFromSheet')
          .addItem('Set Trigger', 'setTrigger')
      )
      .addToUi();
  }

  return;
}

onOpen();
