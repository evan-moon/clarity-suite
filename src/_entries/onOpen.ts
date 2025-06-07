function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('동기화')
    .addItem('주식 정보 동기화', 'syncStocks')
    .addItem('환율 정보 동기화', 'syncCurrencies')
    .addToUi();
}

onOpen();
