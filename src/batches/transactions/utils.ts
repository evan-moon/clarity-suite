import { getDataFromNotion } from '../../notion/api';

export function queryNotionEmptyRatePages(notionDbId: string, token: string) {
  const res = getDataFromNotion(
    notionDbId,
    {
      filter: {
        and: [
          { property: '날짜', date: { is_not_empty: true } },
          { property: '거래통화', select: { is_not_empty: true } },
          { property: '대상통화', select: { is_not_empty: true } },
          { property: '환율 (자동입력)', number: { is_empty: true } },
        ],
      },
    },
    token
  );

  return res.results;
}
