# LoveBud Gallery 개발 로드맵

## 목표

현재의 정적 슬라이드쇼를 유지하면서, 이미지 자산을 구조적으로 관리하고 성능·모바일·접근성·공개 운영 기준을 갖춘 LoveBud 제품 시각 아카이브로 발전시킵니다.

## Phase 0 — 문서화

상태: 완료

- README
- 기술 감사
- 자산·공개 정책
- 목표 아키텍처
- 자산 워크플로
- 배포·성능 정책
- 기여 규칙
- Issue·PR 템플릿
- 개발 Epic과 하위 이슈

완료 조건:

- [x] 기존 코드·이미지 원본 비변경
- [x] 개발 범위와 순서 문서화
- [x] 공개 저장소 전제 반영

## Phase 1 — 이미지 매니페스트와 인벤토리

목표:

파일명 하드코딩을 제거하고 모든 자산에 고유 ID와 상태를 부여합니다.

작업:

- `content/gallery.json`
- 메타데이터 schema
- 34개 기존 이미지 인벤토리
- category·platform·status·assetType
- title·description·alt
- 공개 승인·권리 상태
- 중복 ID·누락 파일 검사
- 현재·과거·컨셉·발표 구분

완료 조건:

- [ ] 모든 이미지가 매니페스트에 존재
- [ ] 파일명 파싱 없이 제목·필터 구성 가능
- [ ] 공개 승인 미확인 자산을 식별 가능
- [ ] AI 생성 이미지와 제품 캡처가 구분됨

## Phase 2 — 원본·웹·썸네일 분리

목표:

원본 PNG를 보존하면서 브라우저용 경량 자산을 생성합니다.

작업:

- `assets/originals/`
- `assets/web/`
- `assets/thumbnails/`
- WebP·선택적 AVIF
- thumbnail 생성
- width·height 메타데이터
- 최적화 전후 크기 보고
- 원본 직접 배포 방지

완료 조건:

- [ ] 모든 공개 자산에 web·thumbnail 존재
- [ ] 원본이 페이지에서 직접 로드되지 않음
- [ ] 최적화 결과가 기록됨

## Phase 3 — 지연 로딩과 슬라이드 성능

목표:

전체 이미지를 한꺼번에 로드하지 않습니다.

작업:

- 현재 자산만 렌더링
- 이전·다음 1개씩 선로딩
- thumbnail lazy loading
- 이미지 decode·loading 상태
- 오류 placeholder
- 빈 카테고리 상태
- DOM 노드 수 제한

완료 조건:

- [ ] 첫 화면에서 34개 원본 이미지를 요청하지 않음
- [ ] 이동 시 인접 이미지가 자연스럽게 표시됨
- [ ] 이미지 오류가 명확히 표시됨

## Phase 4 — 갤러리 그리드·상세 뷰어·Deep Link

목표:

사용자가 특정 화면을 빠르게 찾고 공유할 수 있게 합니다.

작업:

- 썸네일 그리드
- 상세 뷰어
- 전체화면 슬라이드쇼
- asset ID 기반 deep link
- URL 상태 동기화
- 선택 자산 정보
- 전체 갤러리 복귀

완료 조건:

- [ ] 특정 자산 URL 직접 접근 가능
- [ ] 그리드에서 원하는 화면을 빠르게 찾을 수 있음
- [ ] 상세·슬라이드쇼 간 상태 유지

## Phase 5 — 분류·필터·비교 기능

목표:

기능·플랫폼·상태별로 자산을 탐색하고 버전을 비교합니다.

작업:

- category 필터
- platform 필터
- status 필터
- assetType 필터
- featured 보기
- 현재·과거 비교
- supersedes 관계
- 검색 또는 빠른 제목 필터

완료 조건:

- [ ] 모든 자산이 적절한 필터로 탐색됨
- [ ] current·concept·presentation·archive 구분 가능
- [ ] 이전 화면에서 최신 화면으로 이동 가능

## Phase 6 — 모바일·접근성

목표:

작은 화면과 키보드·스크린리더 환경에서 갤러리를 안정적으로 사용합니다.

작업:

- `100dvh`
- 필터 가로 스크롤 또는 반응형 배치
- 세로 스크롤 정책
- 버튼·인디케이터 크기
- `aria-label`, `aria-pressed`, `aria-live`
- focus trap·ESC
- `focus-visible`
- reduced motion
- 의미 있는 alt

완료 조건:

- [ ] 360px에서 주요 기능 사용 가능
- [ ] 키보드만으로 탐색 가능
- [ ] 스크린리더에 상태가 전달됨
- [ ] motion 감소 설정 존중

## Phase 7 — 빌드·배포 경계

목표:

승인된 웹 자산만 `dist/`로 배포합니다.

작업:

- 정적 빌드 스크립트
- `dist/` 생성
- 공개 승인 필터
- base path
- Preview 배포
- Production 절차
- 롤백
- 캐시 정책

완료 조건:

- [ ] 배포 대상이 `dist/`로 제한됨
- [ ] originals·검토 자산이 배포되지 않음
- [ ] Preview 검토 후 Production 반영 가능

## Phase 8 — CI와 자동 검증

목표:

자산·코드·배포 오류를 PR 단계에서 탐지합니다.

작업:

- manifest schema
- 중복 ID
- 누락·orphan 파일
- 공개 승인
- 이미지 크기·해상도
- web·thumbnail 생성 여부
- HTML·CSS·JS 검사
- 링크·deep link smoke test
- Lighthouse
- dist 크기 보고

완료 조건:

- [ ] 모든 PR에서 CI 실행
- [ ] 깨진 경로·중복 ID·승인 누락에서 실패
- [ ] 성능 예산 결과가 표시됨

## Phase 9 — LoveBud 본 저장소 연계

목표:

갤러리 자산이 어느 제품 버전과 연결되는지 추적합니다.

작업:

- sourceRepository·sourceRef
- 캡처 대상 URL·화면 ID
- release·commit 연결
- 선택적 자동 캡처
- 변경 화면 후보 생성
- 승인 후 갤러리 반영

완료 조건:

- [ ] 주요 current 자산의 출처 ref 확인 가능
- [ ] 제품 버전 변경 시 갤러리 갱신 절차가 재현 가능

## 권장 실행 순서

1. 매니페스트·인벤토리
2. 자산 공개·상태 검토
3. 원본·웹·썸네일 분리
4. 지연 로딩
5. 그리드·상세·deep link
6. 필터·비교
7. 모바일·접근성
8. dist 배포
9. CI
10. 본 저장소 연계

## 현재 비목표

- 백엔드·DB 구축
- 사용자 계정
- 온라인 이미지 편집기
- 프레임워크 전환 자체를 목표로 삼는 것
- LoveBud 본 애플리케이션 코드 복제
- 기존 PNG 원본 일괄 삭제
