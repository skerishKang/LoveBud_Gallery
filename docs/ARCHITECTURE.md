# LoveBud Gallery 아키텍처

## 1. 현재 구조

```text
index.html
style.css
script.js
assets/images/*.png
```

### 데이터 흐름

```text
script.js의 allImages 배열
        ↓
파일명 prefix로 category 추론
        ↓
파일명 두 번째 조각으로 title 추론
        ↓
필터에 포함된 모든 slide DOM 생성
        ↓
CSS class로 현재·이전·다음 위치 변경
```

현재 구조는 빠르게 발표용 갤러리를 만드는 데 적합하지만 이미지가 늘어날수록 데이터 관리·성능·검증이 어려워집니다.

## 2. 현재 책임

### `index.html`

- 제목과 설명
- 고정 필터 버튼
- 이전·다음 버튼
- 슬라이드 컨테이너
- 인디케이터

### `script.js`

- 이미지 파일 목록
- 파일명 파싱
- 전체 slide 생성
- 필터링
- 키보드·터치 이동
- 카운터·인디케이터 갱신

### `style.css`

- 다크 테마
- 고정 viewport 레이아웃
- 슬라이드 위치와 애니메이션
- 필터·버튼·인디케이터 스타일

### `assets/images/`

- 원본 PNG와 배포용 이미지 역할을 동시에 수행

## 3. 목표 구조

```text
LoveBud_Gallery/
├─ README.md
├─ src/
│  ├─ index.html
│  ├─ gallery.js
│  └─ gallery.css
├─ content/
│  └─ gallery.json
├─ assets/
│  ├─ originals/
│  ├─ web/
│  └─ thumbnails/
├─ scripts/
│  ├─ generate-manifest.mjs
│  ├─ optimize-images.mjs
│  └─ validate-assets.mjs
├─ docs/
├─ tests/
└─ dist/
```

## 4. 목표 데이터 흐름

```text
원본 이미지 + gallery metadata
        ↓
자산 검증
        ↓
WebP·AVIF·thumbnail 생성
        ↓
배포 매니페스트 생성
        ↓
갤러리 그리드
        ↓
상세 뷰어
        ↓
전체화면 슬라이드쇼
```

## 5. Gallery Asset 모델

```typescript
interface GalleryAsset {
  id: string;
  file: string;
  webFile: string;
  thumbnail: string;
  title: string;
  description: string;
  alt: string;
  category: GalleryCategory;
  platform: GalleryPlatform;
  status: GalleryStatus;
  assetType: GalleryAssetType;
  version?: string;
  capturedAt?: string;
  sourceRepository?: string;
  sourceRef?: string;
  publicApproval: PublicApproval;
  rightsStatus: RightsStatus;
  featured?: boolean;
  order: number;
  supersedes?: string;
  supersededBy?: string;
}
```

매니페스트가 사용자 표시 정보와 필터의 기준입니다. 파일명은 저장 위치만 식별합니다.

## 6. 렌더링 구조

### 6.1 그리드

- 썸네일만 로드
- 카테고리·플랫폼·상태 필터
- 제목·상태 badge
- 키보드 탐색
- 검색 또는 빠른 필터

### 6.2 상세 뷰어

- 선택 자산의 web image 로드
- 제목·설명·상태·플랫폼
- 이전·다음 이동
- 원본 비율 유지
- URL deep link
- 공유 가능한 주소

### 6.3 슬라이드쇼

- 현재·이전·다음 자산만 선로딩
- 전체화면
- 자동재생은 선택 기능
- reduced motion 대응
- 발표 모드에서는 메타데이터 표시 여부 선택

## 7. 라우팅

정적 구조에서도 query 또는 hash 기반 deep link를 지원할 수 있습니다.

```text
/?asset=home-logged-out-v2
/#asset=home-logged-out-v2
```

정적 호스팅의 404 제약을 피하면서 특정 이미지를 직접 열 수 있습니다.

향후 라우터가 필요하면 `/assets/{id}` 구조로 확장할 수 있습니다.

## 8. 이미지 로딩 전략

### 첫 화면

- featured 썸네일 또는 첫 자산 thumbnail
- 현재 web image
- 다음 image preload

### 상세 이동

- 현재 web image
- 인접 자산 1개씩 preload
- 나머지는 요청 시 로드

### 그리드

- thumbnail에 `loading="lazy"`
- viewport 근처만 디코딩
- width·height 명시로 layout shift 방지

## 9. 이미지 최적화

- 원본은 보존
- 배포본은 WebP 우선
- 지원·효율 검토 후 AVIF 병행
- 썸네일은 표시 크기에 맞춰 별도 생성
- `srcset`·`sizes` 사용
- PNG가 필요한 투명도·픽셀 정확도 사례만 예외 처리

## 10. 상태·분류 구조

UI 필터는 파일 접두어가 아니라 다음 메타데이터를 사용합니다.

- category
- platform
- status
- assetType
- featured

다중 필터를 허용하되 URL 상태와 동기화할 수 있습니다.

## 11. 접근성 구조

- 이전·다음은 실제 button과 명확한 이름
- 썸네일은 button 또는 link
- 필터는 `aria-pressed` 또는 tablist 규칙
- 현재 자산 변경은 필요한 범위에서 `aria-live`
- 모달·전체화면은 focus trap과 ESC 닫기
- 의미 있는 alt
- `prefers-reduced-motion`
- `focus-visible`

## 12. 오류 상태

- 매니페스트 로딩 실패
- 이미지 404
- 빈 필터 결과
- 알 수 없는 asset ID
- 썸네일 생성 누락
- 공개 승인되지 않은 자산

오류 이미지를 다른 정상 이미지로 조용히 대체하지 않습니다. 문제를 식별할 수 있는 placeholder와 로그를 사용합니다.

## 13. 빌드·배포 경계

배포 대상은 `dist/`로 제한합니다.

```text
dist/
├─ index.html
├─ gallery.js
├─ gallery.css
├─ gallery.json
├─ assets/web/
└─ assets/thumbnails/
```

다음은 배포 대상에서 제외합니다.

- originals
- scripts
- tests
- docs
- 내부 검토 자산
- 공개 승인되지 않은 자산

## 14. 자동 검증

- 매니페스트 schema
- 중복 ID
- 파일 존재
- orphan 파일
- 공개 승인 상태
- 이미지 해상도·파일 크기
- 썸네일·web image 존재
- 대체 관계
- HTML·JS lint
- 링크·자산 경로
- Lighthouse
- dist 총 용량

## 15. 현재 단계에서 하지 않는 것

- 백엔드·DB
- 계정 시스템
- 이미지 편집기
- 실시간 공동 작업
- LoveBud 본 제품 코드 복제
- 무조건적인 프레임워크 전환
