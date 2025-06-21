# Assets Manager - 다국어 지원

이 프로젝트는 한국어와 영어를 지원하는 다국어 시스템을 포함하고 있습니다.

## 언어 변경 방법

언어를 변경하려면 `src/config/settings.ts` 파일을 수정하세요:

```typescript
// 여기서 언어를 직접 설정하세요
// Change the language here directly
const LANGUAGE: Language = 'ko'; // 'ko' for Korean, 'en' for English
```

- `'ko'`: 한국어 (Korean)
- `'en'`: 영어 (English)

## 지원되는 속성들

### 공통 속성 (Common Properties)

- `name`: 이름 / Name
- `title`: 제목 / Title

### 환율 속성 (Currency Properties)

- `currencyName`: 환율이름 / Currency Name
- `baseCurrency`: 기준통화 / Base Currency
- `targetCurrency`: 대상통화 / Target Currency
- `exchangeRate`: 환율 / Exchange Rate

### 주식 속성 (Stock Properties)

- `ticker`: Ticker
- `stockName`: 종목명 / Stock Name
- `currentPrice`: 현재가 / Current Price
- `previousClose`: 전일종가 / Previous Close
- `change`: 변동 / Change
- `yearHigh`: 52주최고가 / 52 Week High
- `yearLow`: 52주최저가 / 52 Week Low
- `pe`: PE
- `eps`: EPS
- `dividendYield`: 배당률 / Dividend Yield

### 거래 속성 (Transaction Properties)

- `date`: 날짜 / Date
- `transactionCurrency`: 거래통화 / Transaction Currency
- `transactionTargetCurrency`: 대상통화 / Target Currency
- `exchangeRateAuto`: 환율 (자동입력) / Exchange Rate (Auto)

## 사용 예시

코드에서 속성명을 사용할 때는 `t()` 함수를 사용하세요:

```typescript
import { t } from '../../config/i18n';

// 하드코딩된 속성명 대신
properties: {
  이름: { title: [...] }
}

// i18n 함수 사용
properties: {
  [t('name')]: { title: [...] }
}
```

## 주의사항

언어를 변경한 후에는 Notion 데이터베이스의 속성명도 해당 언어로 변경해야 합니다. 그렇지 않으면 데이터 동기화가 제대로 작동하지 않을 수 있습니다.
