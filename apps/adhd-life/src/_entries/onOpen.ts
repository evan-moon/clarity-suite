function onOpen() {
	const ui = SpreadsheetApp.getUi();

	ui.createMenu('⚙️ ADHD Life')
		.addSubMenu(
			SpreadsheetApp.getUi()
				.createMenu('⚙️ Settings')
				.addItem('Connect to Notion', 'applySettingsFromSheet')
				.addItem('Set Trigger', 'setTrigger'),
		)
		.addToUi();
}

onOpen();
