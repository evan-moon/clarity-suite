import { appsScriptProperties } from 'appsScriptProperties';
import { assertEnv } from 'asserts';
import { t } from 'i18n';
import { createNotionClient } from 'notion/api';

export function queryNotionEmptyRatePiggyPages(notionDbId: string) {
  assertEnv('NOTION_SECRET', appsScriptProperties.NOTION_SECRET);

  const notion = createNotionClient(appsScriptProperties.NOTION_SECRET);
  const res = notion.getPages(notionDbId, {
    filter: {
      and: [
        { property: t('date'), date: { is_not_empty: true } },
        { property: t('currency'), select: { is_not_empty: true } },
        { property: t('accountCurrency'), formula: { string: { is_not_empty: true } } },
        { property: t('exchangeRate'), number: { is_empty: true } },
      ],
    },
  });

  return res.results;
}
