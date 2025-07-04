import { isClarityCreatorKit, isClarityLife } from 'services/_shared/appsScriptProperties';
import { createEveryHoursBatchTrigger, createEveryMinutesBatchTrigger } from 'services/_shared/sheet';

function setTrigger() {
  if (isClarityLife()) {
    createEveryHoursBatchTrigger('syncTransactionsCurrencies', 1);
    createEveryHoursBatchTrigger('updateRealtimeServices', 1);
    createEveryMinutesBatchTrigger('takeAccountHubSnapshots', 5);
    createEveryMinutesBatchTrigger('takePortfolioSnapshots', 5);
  } else if (isClarityCreatorKit()) {
    createEveryHoursBatchTrigger('updateRealtimeServices', 1);
  }
}

setTrigger();
