# Clarity Suite Backend

Clarity Suite Backend는 **Clarity Life** Notion 시스템의 핵심 기능들을 보조하는 Google Apps Script 기반 서버입니다. Google 스프레드시트를 중간 처리 도구로 활용하여 Notion의 tradebook, piggy, realtimeCurrencies, realtimeStocks 데이터베이스와 실시간 데이터를 동기화합니다.

## 🗂️ 메뉴 구조

Google 스프레드시트를 열면 자동으로 **"💎 Clarity Life"** 메뉴가 생성됩니다.

```
💎 Clarity Life
├── 🔄 Manual Update
│   ├── Update Realtime Stocks
│   ├── Update Realtime Currencies
│   └── Sync Transaction Currency Rates (Max 50)
├── 📜 Generate Report
│   └── Snapshot Account Hub
└── ⚙️ Settings
    └── Connect to Notion
```

### 메뉴별 기능 설명

#### 🔄 Manual Update

- **Update Realtime Stocks**: 실시간 주식 시세 데이터를 Notion에 동기화
- **Update Realtime Currencies**: 실시간 환율 데이터를 Notion에 동기화
- **Sync Transaction Currency Rates**: 거래 내역의 환율 정보를 자동 계산 (최대 50개)

#### 📜 Generate Report

- **Snapshot Account Hub**: 현재 계정 상태를 스냅샷으로 저장하여 추후 분석에 활용

#### ⚙️ Settings

- **Connect to Notion**: Notion API 연결 설정 및 데이터베이스 ID 관리

## 🛠️ 주요 역할 및 기능

- **Tradebook**: 거래 내역의 환율 정보 자동 계산 및 업데이트
- **Piggy**: 저금통 거래의 환율 정보 자동 계산 및 업데이트
- **Realtime Currencies**: 실시간 환율 데이터 동기화
- **Realtime Stocks**: 실시간 주식 시세 데이터 동기화

### 실시간 데이터 동기화

- Google Finance API 연동을 통한 실시간 주식 시세 수집
- 실시간 환율 정보 자동 업데이트
- 거래 시점 환율 자동 계산 (최대 50개 거래 일괄 처리)

### 스프레드시트 기반 처리

- Google 스프레드시트를 중간 계산 엔진으로 활용
- 복잡한 금융 계산을 스프레드시트 수식으로 처리
- 계산 결과를 Notion 데이터베이스에 자동 반영

### 데이터 타입별 처리

- 주식 데이터: 시세, 변동률, P/E, EPS, 배당수익률 등
- 환율 데이터: 실시간 환율, 과거 환율, 통화별 변환
- 거래 데이터: 거래 날짜별 환율 정보 자동 추가
