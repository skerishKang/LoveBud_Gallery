# LoveBud Gallery 자산·공개·상태 정책

## 1. 목적

이 문서는 LoveBud Gallery에 포함되는 이미지의 상태, 출처, 공개 승인, 권리, 파일 구조와 메타데이터 기준을 정의합니다.

저장소가 공개되어 있으므로 각 자산은 단순히 파일이 존재한다는 이유만으로 공개 승인된 것으로 간주하지 않습니다.

## 2. 자산 단위

갤러리의 기본 관리 단위는 이미지 파일이 아니라 **Gallery Asset**입니다.

각 자산은 다음으로 구성됩니다.

- 고유 ID
- 원본 파일
- 웹 최적화본
- 썸네일
- 사용자용 제목
- 설명
- 기능 영역
- 플랫폼
- 상태
- 출처
- 공개 승인
- 권리 상태
- 버전·캡처일

## 3. 필수 메타데이터

권장 `gallery.json` 항목은 다음과 같습니다.

```json
{
  "id": "home-logged-out-v2",
  "file": "home_home-baseline-logged-out.png",
  "webFile": "home-logged-out-v2.webp",
  "thumbnail": "home-logged-out-v2-thumb.webp",
  "title": "로그아웃 홈 화면",
  "description": "로그인 전 LoveBud 핵심 가치를 설명하는 홈 화면",
  "category": "home",
  "platform": "desktop",
  "status": "current",
  "assetType": "product-capture",
  "version": "2.0",
  "capturedAt": "2026-04-14",
  "sourceRepository": "skerishKang/LoveBud",
  "sourceRef": "commit-or-branch",
  "publicApproval": "approved",
  "rightsStatus": "owned",
  "featured": true,
  "order": 10
}
```

## 4. 자산 상태

### `current`

현재 제품 또는 공식 승인 화면입니다.

### `approved-design`

구현 전이지만 승인된 디자인입니다.

### `in-development`

개발 중이며 변경될 수 있습니다.

### `concept`

제품 방향을 설명하는 컨셉 이미지입니다.

### `presentation`

발표·소개를 위해 가공한 이미지나 슬라이드입니다.

### `archived`

과거 버전으로 보관하는 화면입니다.

### `deprecated`

더 이상 사용하지 않으며 최신 자산이 따로 존재합니다.

상태가 없는 자산은 `unclassified`로 간주하고 공개 갤러리의 featured 영역에 노출하지 않습니다.

## 5. 자산 유형

- `product-capture`: 실제 제품 화면 캡처
- `design-mockup`: 디자인 시안
- `generated-concept`: AI 생성 또는 합성 컨셉 이미지
- `presentation-slide`: 발표 슬라이드
- `marketing-visual`: 홍보 이미지
- `comparison`: 전후·대안 비교 이미지
- `archive-capture`: 과거 제품 화면

AI 생성 이미지에는 반드시 `generated-concept`를 사용합니다. 실제 제품 화면처럼 표시하지 않습니다.

## 6. 카테고리

권장 기능 카테고리는 다음과 같습니다.

- `overview`
- `home`
- `love-tree`
- `memory`
- `editor`
- `community`
- `search`
- `account-settings`
- `mobile`
- `presentation`
- `archive`

파일명 접두어와 화면 카테고리를 동일시하지 않습니다. 매니페스트의 category가 기준입니다.

## 7. 플랫폼

- `desktop`
- `mobile`
- `tablet`
- `responsive`
- `presentation`
- `not-applicable`

## 8. 공개 승인

### `approved`

공개 저장소와 공개 배포에 포함할 수 있습니다.

### `internal-review`

검토 중이며 공개 배포에는 포함하지 않습니다.

### `restricted`

저장소 또는 배포에서 제외해야 합니다.

### `unknown`

승인 상태가 확인되지 않았습니다. 공개 배포 대상이 아닙니다.

공개 저장소에 이미 포함된 자산도 인벤토리 과정에서 다시 분류합니다.

## 9. 권리 상태

- `owned`: LoveBud 또는 저장소 소유자가 권리를 보유
- `licensed`: 라이선스 조건에 따라 사용 가능
- `third-party-approved`: 제3자 허가 확인
- `generated`: AI 생성물
- `unknown`: 확인 필요

`licensed` 또는 `third-party-approved`에는 출처와 조건을 기록합니다.

## 10. 개인정보·샘플 데이터

제품 캡처에는 다음 정보를 포함하지 않습니다.

- 실제 이름·전화번호·이메일
- 실제 계정 ID
- 실제 가족·지인 사진
- 개인 메시지
- 위치·일정·연락처
- 비공개 URL·토큰·API 키

샘플 데이터는 가상임을 설명할 수 있어야 하며, 실제 사용자와 혼동될 가능성이 없어야 합니다.

## 11. 파일 구조

권장 구조:

```text
assets/
├─ originals/
├─ web/
└─ thumbnails/
```

- `originals/`: 편집·보관용 원본
- `web/`: 브라우저 표시용 WebP·AVIF
- `thumbnails/`: 그리드와 목록용 작은 이미지

원본을 웹 페이지에서 직접 참조하지 않습니다.

## 12. 파일명

파일명은 안정적인 영문 slug를 사용합니다.

```text
home-logged-out-v2.png
home-logged-out-v2.webp
home-logged-out-v2-thumb.webp
```

제목·설명·상태를 파일명에 모두 담지 않습니다. 사용자 표시 정보는 매니페스트가 담당합니다.

## 13. 대체 관계

과거 자산은 다음 필드로 최신 자산과 연결할 수 있습니다.

```json
{
  "id": "home-v1",
  "status": "archived",
  "supersededBy": "home-v2"
}
```

최신 자산은 필요 시 `supersedes`를 가집니다.

## 14. 공개 중단

다음 상황에서는 자산을 즉시 공개 배포 대상에서 제외합니다.

- 개인정보 발견
- 미출시 기능 공개 철회
- 제3자 권리 문제
- 잘못된 제품 정보
- 폐기된 화면이 현재 화면처럼 표시됨
- 내부 검토 자료의 오노출

파일을 삭제하기 전에 매니페스트에서 공개 상태를 제거하고 배포 결과를 확인합니다. Git 이력에 남는 정보의 처리 필요성도 별도로 판단합니다.

## 15. 완료 기준

자산이 갤러리에 추가되려면 다음을 충족해야 합니다.

- [ ] 고유 ID
- [ ] 사용자용 제목과 설명
- [ ] category·platform·status
- [ ] assetType
- [ ] 공개 승인
- [ ] 권리 상태
- [ ] 원본·웹·썸네일 관계
- [ ] 의미 있는 대체텍스트
- [ ] 파일 존재·크기·해상도 검사
- [ ] 공개 화면 검토
