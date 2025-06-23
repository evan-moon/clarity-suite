function onOpen() {
  SpreadsheetApp.getUi().createMenu('⚙️ Settings').addItem('Connect to Notion', 'applySettingsFromSheet').addToUi();

  SpreadsheetApp.getUi()
    .createMenu('📲 Manual Sync')
    .addItem('Sync Real-time Stock Info', 'syncRealtimeStocks')
    .addItem('Sync Real-time Currency Info', 'syncRealtimeCurrencies')
    .addItem('Sync Transaction Currency Rates (Max 50)', 'syncTransactionsCurrencies')
    .addToUi();
}

onOpen();
