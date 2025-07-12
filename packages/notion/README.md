# @clarity-suite/notion

Clarity Suite의 Notion API 유틸리티 패키지입니다.

## 설치 및 사용법 (Turbo Monorepo)

Turbo workspace 내의 앱에서 다음과 같이 import하여 사용할 수 있습니다:

```ts
import { createNotionClient } from "@clarity-suite/notion";

const notion = createNotionClient("YOUR_NOTION_TOKEN");
const pages = notion.getPages("DATABASE_ID", {});
```

## 제공 기능

- Notion DB 쿼리
- 페이지 생성/업데이트/삭제
- DB 이름으로 찾기 등

## 개발

- TypeScript 지원
- Turbo workspace 패키지로 관리
