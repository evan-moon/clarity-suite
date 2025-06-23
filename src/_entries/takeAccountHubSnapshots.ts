import { appsScriptProperties } from 'appsScriptProperties';
import { takeAccountHubSnapshots as _takeAccountHubSnapshots } from 'services/accountHub';
import { assertEnvs } from 'asserts';

function takeAccountHubSnapshots() {
  assertEnvs(appsScriptProperties);

  const { ACCOUNT_HUB_NOTION_DB_ID, ACCOUNT_SNAPSHOT_NOTION_DB_ID } = appsScriptProperties;
  _takeAccountHubSnapshots(ACCOUNT_HUB_NOTION_DB_ID, ACCOUNT_SNAPSHOT_NOTION_DB_ID);
}

takeAccountHubSnapshots();
