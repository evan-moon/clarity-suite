import { appsScriptProperties } from '../appsScriptProperties';
import { syncCurrencyInTransactions as origin } from '../batches/transactions';
import { assertEnvs } from '../asserts';

function syncTransactions() {
  assertEnvs(appsScriptProperties);
  origin('Currency history', '20cea84fd29a80f98577df43d67af0c6');
}

syncTransactions();
