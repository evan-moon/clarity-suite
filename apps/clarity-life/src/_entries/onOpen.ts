function onOpen() {
	const ui = SpreadsheetApp.getUi();

	ui.createMenu('💎 Clarity Life')
		.addSubMenu(
			SpreadsheetApp.getUi()
				.createMenu('🔄 수동 업데이트')
				.addItem('종목 정보 최신화', 'syncRealtimeStocks')
				.addItem('환율 정보 최신화', 'syncRealtimeCurrencies')
				.addItem('거래 내역 환율 최신화', 'syncTransactionsCurrencies'),
		)
		.addSubMenu(
			SpreadsheetApp.getUi()
				.createMenu('📜 기록하기')
				.addItem('현재 포트폴리오 상태 기록하기', 'takePortfolioSnapshots'),
		)
		.addSubMenu(
			SpreadsheetApp.getUi()
				.createMenu('⚙️ 설정')
				.addItem('노션과 연동하기', 'applySettingsFromSheet')
				.addItem('트리거 설정하기', 'setTrigger')
				.addItem('Clarity Life 데이터 비우기', 'cleanUpClarityLife'),
		)
		.addToUi();
}

onOpen();
