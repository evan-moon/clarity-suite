function onOpen() {
  SpreadsheetApp.getUi().createMenu('⚙️ Settings').addItem('Connect to Notion', 'applySettingsFromSheet').addToUi();

  SpreadsheetApp.getUi()
    .createMenu('Manual Sync')
    .addItem('Sync Real-time Stock Information', 'syncStocks')
    .addItem('Sync Real-time Currency Information', 'syncCurrencies')
    .addItem('Sync Transaction Currency Rates', 'syncTransactions')
    .addToUi();
}

onOpen();
