import { t } from 'i18n/index';
import { getDataFromNotion } from 'notion/api';

export function queryNotionEmptyRatePages(notionDbId: string, token: string) {
  const res = getDataFromNotion(
    notionDbId,
    {
      filter: {
        and: [
          { property: t('date'), date: { is_not_empty: true } },
          { property: t('tradeCurrency'), select: { is_not_empty: true } },
          { property: t('accountCurrency'), formula: { string: { is_not_empty: true } } },
          { property: t('exchangeRate'), number: { is_empty: true } },
        ],
      },
    },
    token
  );

  return res.results;
}

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
