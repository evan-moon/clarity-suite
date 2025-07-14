import { createEveryDaysBatchTrigger } from '@clarity-suite/sheets';

function setTrigger() {
	createEveryDaysBatchTrigger('takeAdhdLifeSnapshots', 4);
}

setTrigger();
