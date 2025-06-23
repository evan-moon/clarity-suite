import { t } from 'i18n';
import { getDataFromNotion } from 'notion/api';

export function queryNotionEmptyRatePocketbookPages(notionDbId: string, token: string) {
  const res = getDataFromNotion(
    notionDbId,
    {
      filter: {
        and: [
          { property: t('date'), date: { is_not_empty: true } },
          { property: t('currency'), select: { is_not_empty: true } },
          { property: t('accountCurrency'), formula: { string: { is_not_empty: true } } },
          { property: t('exchangeRate'), number: { is_empty: true } },
        ],
      },
    },
    token
  );

  return res.results;
}
