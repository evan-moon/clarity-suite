function onOpen() {
  SpreadsheetApp.getUi().createMenu('⚙️ 설정').addItem('노션과 연동하기', 'applySettingsFromSheet').addToUi();

  SpreadsheetApp.getUi()
    .createMenu('수동 동기화')
    .addItem('실시간 주식 정보 동기화', 'syncStocks')
    .addItem('실시간 환율 정보 동기화', 'syncCurrencies')
    .addItem('거래 내역 환율 동기화', 'syncTransactions')
    .addToUi();
}

onOpen();
