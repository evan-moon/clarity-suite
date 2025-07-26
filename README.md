# Clarity Suite

Clarity Suite는 **생산성과 개인 관리를 위한 통합 Google Apps Script 기반 플랫폼**입니다. TypeScript와 Turbo monorepo 구조로 구축되어 있으며, Google 스프레드시트를 중간 처리 도구로 활용하여 Notion과 연동하여 다양한 데이터를 관리하고 자동화합니다.

## 🗂️ 앱 구성

### 💎 Clarity Life
재무 관리 및 투자 포트폴리오 추적 시스템

```
💎 Clarity Life
├── 🔄 Manual Update
│   ├── Update Realtime Stocks
│   ├── Update Realtime Currencies
│   └── Sync Transaction Currency Rates (Max 50)
├── 📜 Generate Report
│   └── Snapshot Portfolio
└── ⚙️ Settings
    ├── Connect to Notion
    ├── Set Trigger
    └── Clean Up Clarity Life
```

### ⚙️ ADHD Life
ADHD 관리 및 일상 업무 자동화 시스템

```
⚙️ ADHD Life
├── 📋 Task Management
│   ├── Take ADHD Life Snapshots
│   └── Generate Weekly Report
└── ⚙️ Settings
    ├── Connect to Notion
    └── Set Trigger
```

## 🛠️ 주요 기능

### 💎 Clarity Life - 재무 관리

#### 실시간 데이터 동기화
- **실시간 주식 시세**: Google Finance API를 통한 실시간 주식 데이터 수집
- **실시간 환율**: 글로벌 환율 정보 자동 업데이트
- **거래 환율 계산**: 거래 시점 환율 자동 계산 (최대 50개 일괄 처리)

#### 포트폴리오 관리
- **포트폴리오 추적**: 투자 포트폴리오 성과 분석 및 스냅샷 저장
- **자동 계산**: 복잡한 금융 계산을 스프레드시트 수식으로 처리

#### 데이터베이스 연동
- **거래 내역**: 주식 거래 환율 정보 자동 계산
- **포트폴리오**: 포트폴리오 성과 데이터 자동 동기화

### ⚙️ ADHD Life - 생산성 관리

#### 작업 관리
- **작업 스냅샷**: 일일 작업 상태 추적
- **주간 리포트**: 주간 생산성 분석 리포트 생성
- **루틴 관리**: 반복 작업 및 습관 추적

#### 자동화
- **트리거 설정**: 정기적인 데이터 동기화
- **알림 시스템**: 중요한 작업 및 마감일 알림

## 🔧 기술적 특징

### TypeScript 기반 Turbo Monorepo
- **TypeScript**: 전체 코드베이스 타입 안전성 보장
- **Turbo**: 빠른 빌드 및 배포 파이프라인
- **Monorepo**: 패키지 간 의존성 관리 및 코드 재사용
- **esbuild**: 고성능 번들링으로 Google Apps Script 배포 최적화

### 스프레드시트 기반 처리
- Google 스프레드시트를 중간 계산 엔진으로 활용
- 복잡한 계산을 스프레드시트 수식으로 처리
- 계산 결과를 Notion 데이터베이스에 자동 반영

### Notion 연동
- **VARIABLES DB**: 중앙 집중식 환경변수 관리
- **자동 동기화**: 설정 변경 시 자동 환경변수 업데이트
- **멀티 데이터베이스**: 여러 Notion DB와 동시 연동

### 모듈화된 아키텍처
- **공통 패키지**: `@clarity-suite/notion`, `@clarity-suite/settings` 등
- **앱별 설정**: 각 앱의 고유한 설정 및 기능 분리
- **확장 가능**: 새로운 앱 추가 시 기존 인프라 재사용
- **타입 안전성**: TypeScript assertion 함수로 런타임 안전성 보장

## 🚀 사용법

1. **초기 설정**: Notion에서 VARIABLES DB 생성 및 환경변수 설정
2. **앱 선택**: Clarity Life 또는 ADHD Life 중 원하는 앱 선택
3. **연동 설정**: "Connect to Notion" 메뉴를 통해 Notion 연동
4. **자동화 설정**: "Set Trigger"를 통해 정기 동기화 설정
5. **데이터 관리**: 각 앱의 메뉴를 통해 데이터 동기화 및 리포트 생성

## 📦 패키지 구조

```
clarity-suite/
├── apps/
│   ├── clarity-life/          # 재무 관리 앱
│   └── adhd-life/            # ADHD 관리 앱
├── packages/
│   ├── notion/               # Notion API 연동
│   ├── settings/             # 환경변수 관리
│   ├── sheets/               # 스프레드시트 유틸리티
│   ├── utils/                # 공통 유틸리티 (타입 안전 assertion 함수 포함)
│   └── esbuild-config/       # esbuild 빌드 설정
```

## 🛠️ 개발 명령어

```bash
# 전체 빌드
yarn build

# linting 및 포맷팅
yarn lint
yarn format

# 타입 체크
yarn check-types

# 앱별 빌드 및 배포
yarn build:clarity-life
yarn deploy:clarity-life
yarn build:adhd
yarn deploy:adhd
```

## 📈 최근 개선사항

- **코드 통합**: assertEnv/assertEnvs 함수를 통합된 assert 함수로 대체하여 타입 안전성 향상
- **코드 정리**: 사용하지 않는 코드 제거 및 과도한 로깅 정리
- **아키텍처 개선**: 서비스별 독립성을 고려한 리팩토링으로 유지보수성 향상

Clarity Suite는 개인 생산성과 재무 관리를 위한 통합 솔루션으로, Notion의 강력한 데이터베이스 기능과 Google Apps Script의 자동화 능력을 결합하여 효율적인 개인 관리 시스템을 제공합니다.
