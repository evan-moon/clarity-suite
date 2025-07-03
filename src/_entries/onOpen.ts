function onOpen() {
  if (SpreadsheetApp.getActiveSpreadsheet().getName().includes('Clarity Life')) {
    SpreadsheetApp.getUi()
      .createMenu('💎 Clarity Life')
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
          .addItem('Clean Up Clarity Life ', 'cleanUpClarityLife')
      )
      .addToUi();
  } else if (SpreadsheetApp.getActiveSpreadsheet().getName().includes('Clarity Creator Kit')) {
    SpreadsheetApp.getUi()
      .createMenu('💎 Clarity Creator Kit')
      .addSubMenu(
        SpreadsheetApp.getUi()
          .createMenu('🔄 Manual Update')
          .addItem('Update Realtime Stocks', 'syncRealtimeStocks')
          .addItem('Update Realtime Currencies', 'syncRealtimeCurrencies')
      )
      .addSubMenu(
        SpreadsheetApp.getUi().createMenu('⚙️ Settings').addItem('Connect to Notion', 'applySettingsFromSheet')
      )
      .addToUi();
  }

  return;
}

onOpen();
