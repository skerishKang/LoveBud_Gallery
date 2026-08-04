# LoveBud Gallery 기여 가이드

## 1. 기본 원칙

- 모든 변경은 GitHub Issue를 기준으로 합니다.
- 한 PR은 하나의 주요 목적을 가집니다.
- 기존 원본 이미지는 이유 없이 삭제·덮어쓰지 않습니다.
- 파일명을 데이터 모델로 사용하지 않습니다.
- 실제 제품·컨셉·발표·보관 자산을 구분합니다.
- 공개 저장소에 포함되는 자산은 공개 승인과 권리 상태를 기록합니다.
- 문서와 구현이 달라지면 같은 PR에서 문서를 갱신합니다.

## 2. 브랜치

권장 형식:

```text
feat/issue-12-gallery-manifest
fix/issue-18-mobile-overflow
docs/issue-20-asset-policy
chore/issue-22-image-validation
```

`main` 직접 변경보다 이슈별 브랜치와 PR을 권장합니다.

## 3. 커밋

권장 형식:

```text
feat: add manifest-driven gallery filtering
fix: prevent all full-size images from loading initially
docs: define public asset approval policy
chore: generate web thumbnails for approved assets
```

이미지 일괄 추가 시 커밋 메시지에 자산 범위와 목적을 명확히 적습니다.

## 4. 자산 변경 규칙

### 신규 이미지

- 고유 ID
- title·description·alt
- category·platform·status·assetType
- publicApproval·rightsStatus
- sourceRepository·sourceRef 가능한 범위 기록
- web·thumbnail 생성

### 이미지 교체

- 픽셀 변경 이유 기록
- 버전 또는 capturedAt 갱신
- 이전 자산 archive 여부 결정
- 같은 파일명 덮어쓰기보다 새 버전 파일 권장

### 이미지 삭제

- 참조 여부 확인
- 대체 관계 확인
- 배포본 제거 확인
- 공개 중단인지 영구 삭제인지 구분

## 5. 원본과 생성 파일

- originals는 수동 편집·보관용 입력
- web·thumbnails는 생성 스크립트 출력
- 생성 파일을 수동 수정하지 않습니다.
- 생성 방식이 바뀌면 스크립트와 결과를 함께 검토합니다.

## 6. 코드 변경 규칙

- 전역 상태와 DOM 책임을 명확히 구분합니다.
- 모든 이미지를 동시에 렌더링하지 않습니다.
- 알 수 없는 asset ID와 이미지 오류를 처리합니다.
- 모바일에서 `overflow: hidden` 사용은 실제 화면 검증을 포함합니다.
- 접근 가능한 button·link 요소를 사용합니다.
- 애니메이션에는 reduced motion 대안을 제공합니다.

## 7. 접근성 기준

- 이전·다음 버튼에 접근 가능한 이름
- 필터 선택 상태 전달
- 썸네일 키보드 접근
- 상세 모달 focus trap·ESC
- 현재 이미지 변경 안내
- 의미 있는 alt
- `focus-visible`
- 색상만으로 상태 구분하지 않음

## 8. 성능 기준

- 첫 화면에서 전체 원본 이미지를 요청하지 않음
- thumbnail과 web image 분리
- width·height 명시
- 인접 자산만 preload
- 성능 예산 초과 시 PR에 이유 기록
- `dist/` 전체 크기 변화 기록

## 9. PR 설명 필수 항목

- 관련 Issue
- 변경 목적
- 변경한 자산·코드·문서
- 공개 승인 영향
- 현재·과거·컨셉 상태 변화
- 최적화 전후 용량
- 모바일·접근성 영향
- 검증 결과
- 제외 범위

## 10. 권장 검증 명령

향후 스크립트 도입 후 다음을 기준으로 합니다.

```bash
npm ci
npm run validate:assets
npm run lint
npm run build
npm run test
```

현재 패키지 구조가 없으므로 초기 개발 이슈에서 실제 명령을 확정합니다.

## 11. 수동 검증

- 전체 카테고리
- 빈 카테고리
- 첫·마지막 자산 순환
- 방향키
- 스와이프
- 특정 deep link
- 이미지 404
- 모바일 360px·768px
- 키보드 탐색
- reduced motion
- 공개 승인되지 않은 자산 미노출

## 12. 리뷰 체크리스트

### 데이터

- [ ] 고유 ID가 안정적인가
- [ ] title·description·alt가 파일명보다 명확한가
- [ ] category·platform·status가 정확한가
- [ ] 공개 승인·권리 상태가 기록되었는가
- [ ] 대체 관계가 유효한가

### 코드

- [ ] 전체 이미지 동시 로딩을 유발하지 않는가
- [ ] 오류·빈 상태를 처리하는가
- [ ] deep link가 유지되는가
- [ ] 모바일 레이아웃이 깨지지 않는가
- [ ] 키보드·스크린리더를 고려했는가

### 배포

- [ ] originals가 배포되지 않는가
- [ ] 공개 승인 자산만 포함되는가
- [ ] web·thumbnail이 존재하는가
- [ ] 크기 예산을 확인했는가
- [ ] Preview를 검토했는가

## 13. 완료의 정의

작업은 다음을 만족해야 완료입니다.

- Issue 완료 조건 충족
- 관련 문서 갱신
- 자산·경로·상태 검증
- 모바일·접근성 검증
- 성능 영향 기록
- Preview 또는 로컬 화면 검증
- 의도하지 않은 원본 삭제 없음
