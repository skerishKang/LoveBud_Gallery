# LoveBud Gallery 배포·성능 정책

## 1. 목적

이 문서는 LoveBud Gallery의 이미지 최적화, 빌드 산출물, 정적 배포, 성능 예산과 롤백 기준을 정의합니다.

## 2. 현재 상태

- 저장소 크기 약 56MB
- 이미지 34개가 PNG 원본 형태로 저장됨
- 전체 보기에서 모든 이미지를 DOM에 생성
- 원본·웹 최적화본·썸네일 미분리
- 별도 빌드 디렉터리 없음
- 저장소 파일 기준 배포 workflow 확인되지 않음

## 3. 배포 목표

- 원본은 보존하되 웹에서 직접 제공하지 않음
- 승인된 자산만 배포
- `dist/`만 정적 호스팅에 업로드
- 첫 화면에서 필요한 최소 자산만 요청
- 모바일에서 데이터·메모리 사용을 통제
- 배포 산출물과 원본의 관계를 재현 가능하게 유지

## 4. 권장 배포 구조

```text
dist/
├─ index.html
├─ gallery.css
├─ gallery.js
├─ gallery.json
├─ assets/
│  ├─ web/
│  └─ thumbnails/
└─ 404.html        선택
```

다음은 `dist/`에 포함하지 않습니다.

- `assets/originals/`
- 공개 승인되지 않은 자산
- scripts
- tests
- docs
- 개발 메모
- 중간 변환 파일

## 5. 이미지 형식

### Web image

- WebP 우선
- AVIF는 품질·브라우저·처리시간을 검토해 선택
- PNG는 투명도·픽셀 정확도가 필요한 예외에 한정

### Thumbnail

- 그리드 표시 크기에 맞춰 별도 리사이즈
- 원본 비율 유지
- 작은 화면에서 불필요한 고해상도 전송 금지

### 원본

- 편집·보관용
- 배포 산출물과 분리
- 변환 자동화의 입력값

## 6. 로딩 전략

### 초기 화면

다음만 우선 로드합니다.

- 페이지 CSS·JavaScript
- 매니페스트
- 첫 화면 thumbnail 또는 featured image
- 현재 web image

### 슬라이드 이동

- 현재 이미지
- 이전 이미지 1개
- 다음 이미지 1개

나머지는 이동 시점이나 idle 시간에 로드합니다.

### 그리드

- thumbnail에 `loading="lazy"`
- width·height 지정
- viewport 주변만 디코딩
- 상세 이미지는 선택 후 로드

## 7. 성능 예산

초기 권장 기준이며 실제 측정 후 조정합니다.

### 첫 페이지

- HTML+CSS+JS: gzip 기준 250KB 이하
- 초기 이미지 요청: 1MB 이하 목표
- 초기 전체 전송량: 1.5MB 이하 목표

### Thumbnail

- 개별 100KB 이하 목표
- 목록 표시 크기의 2배 정도 해상도

### Web image

- 개별 1MB 이하 목표
- 일반 화면 캡처는 500KB 이하 우선
- 초대형 발표 이미지는 예외 사유 기록

### 전체 배포 산출물

- `dist/` 전체 크기와 파일 수를 CI에서 출력
- 기준 대비 급격한 증가는 PR에서 설명

## 8. 반응형 이미지

가능하면 다음을 지원합니다.

```html
<img
  src="assets/web/home-v2-1280.webp"
  srcset="assets/web/home-v2-640.webp 640w,
          assets/web/home-v2-1280.webp 1280w,
          assets/web/home-v2-1920.webp 1920w"
  sizes="(max-width: 768px) 100vw, 80vw"
  width="1280"
  height="720"
  alt="로그아웃 홈 화면"
>
```

## 9. 캐시 정책

- 해시 또는 버전이 포함된 이미지 파일명 권장
- HTML과 gallery manifest는 짧은 캐시 또는 재검증
- 이미지 산출물은 긴 캐시 가능
- 같은 파일명으로 픽셀을 덮어쓰지 않는 것을 권장

## 10. 배포 후보

### GitHub Pages

장점:

- 저장소와 단순 연결
- 정적 사이트에 적합
- 운영 비용이 낮음

검토 사항:

- Preview 환경
- base path
- 캐시·대용량 파일

### Cloudflare Pages

장점:

- Preview 배포
- 전역 CDN
- 정적 산출물 배포에 적합

검토 사항:

- 프로젝트 연결과 권한
- 원본 자산 업로드 방지
- 빌드 명령과 output directory

## 11. Preview와 Production

권장 흐름:

1. PR에서 품질검사
2. `dist/` 생성
3. Preview 배포
4. 모바일·데스크톱 시각 검토
5. 공개 자산 검토
6. 승인 후 Production 반영

문서화 단계에서는 배포를 생성하거나 Production을 변경하지 않습니다.

## 12. 배포 검증

- 모든 매니페스트 파일 존재
- 공개 승인 자산만 포함
- 깨진 이미지 0건
- 중복 ID 0건
- deep link 정상
- 빈 필터 정상
- 모바일 360px·768px
- 키보드 탐색
- reduced motion
- Lighthouse 성능·접근성
- `dist/` 용량 출력

## 13. 오류 처리

### 이미지 로드 실패

- 오류 placeholder
- 자산 ID와 제목 표시
- 개발 환경에서 경로 로그
- 다른 정상 이미지를 대신 표시하지 않음

### 매니페스트 실패

- 갤러리 전체 오류 메시지
- 재시도 또는 새로고침 안내
- 빈 화면으로 남기지 않음

### 알 수 없는 deep link

- 해당 자산을 찾을 수 없다는 메시지
- 전체 갤러리로 이동
- 첫 이미지로 조용히 바꾸지 않음

## 14. 롤백

- 마지막 정상 `dist/` artifact 보존
- 배포 commit·artifact ID 기록
- 자산 공개 철회 시 이전 정상 배포 또는 수정 배포 적용
- 롤백 후 브라우저·모바일에서 실제 반영 확인

## 15. 배포 전 체크리스트

- [ ] manifest 검증
- [ ] 공개 승인 자산만 포함
- [ ] 원본 미포함
- [ ] WebP·thumbnail 생성
- [ ] 첫 화면 전송량 측정
- [ ] 이미지 404 없음
- [ ] 모바일 레이아웃 확인
- [ ] 키보드·접근성 확인
- [ ] deep link 확인
- [ ] Preview 검토
- [ ] 롤백 대상 기록
