# Design Brief

## Product job

원흥 인근의 잠재 회원이 첫 화면에서 1986피트니스를 시설만 이용하는 헬스장이 아니라 함께 배우고 참여하며 운동을 이어가는 커뮤니티로 이해하고, 커뮤니티 경험 또는 상담으로 이동하게 한다.

## Direction

실제 센터 사진 자체가 천천히 줌아웃하고 호흡하듯 이동하는 시네마틱 구성. 사진 속 1986 로고와 공간을 중심에 두고 카피와 참여 행동은 안정적으로 고정한다.

## Brand reading

- Immutable identity: 1986 명칭, 올리브 그린, 실제 원흥점 사진, 과장 없는 전문성과 관계 중심 카피.
- Repeatable shapes/materials: 얇은 선, 작은 영문 라벨, 실제 사진, 짙은 오버레이, 절제된 카메라 이동.
- Existing inconsistencies to remove: 사진을 가리던 오비트 그래픽과 시설 소개에 머무는 첫 화면 인상.
- Media provenance: `assets/hero/hero-main.png`는 사용자가 제공한 원흥점 실제 이미지로 확인됨. 투명 공식 로고 파일은 현재 없음.

## Reference evidence

- 2026-08-24 현재 로컬 `#top`의 오비트 버전 확인: 그래픽이 사진 속 로고와 겹쳐 실제 공간의 집중도를 낮춤.
- 기존 hero의 실제 사진, 좌측 하단 헤드라인, 고정 헤더와 CTA 구조 확인. 모바일에서는 사진을 상단 절반에 배치하고 카피가 하단으로 이동함.

## Reference synthesis

- Structure comes from: 현재 1986 첫 화면의 실제 사진과 카피 우선 구조.
- Interaction comes from: 사진의 미세한 포인터 반응과 스크롤 깊이 변화.
- Visual tone comes from: 기존 올리브/오프화이트/블랙 디자인 토큰.
- Hook/copy energy comes from: 브랜드 철학 “운동을 시작하는 곳에서, 운동이 계속되는 곳으로.”
- Motion/media behavior comes from: 사진이 111%에서 102.5%로 줌아웃한 뒤 18초 동안 미세 이동하는 카메라 방식.
- The final screen will not copy: 외부 브랜드의 로고, 색상, 문구, 완성 레이아웃 또는 인터랙션 코드.

## Reference implementation map

| Reference evidence | Extracted principle | Local component | Motion/state | Mobile translation | Acceptance evidence |
|---|---|---|---|---|---|
| 현재 오비트 버전 1280×720 캡처 | 사진 속 로고를 그래픽으로 가리지 않음 | `.hero-motion-media` / `index.html` | 줌아웃 → 저속 드리프트 | 상단 52% 크롭, 이동량 축소 | 구현 후 캡처에서 사진 로고와 카피 충돌 확인 |
| 현재 1986 실제 사진 hero | 실제 경험을 모션의 주인공으로 사용 | `.hero-motion-media img` / `styles.css` | 2.2초 진입, 포인터·스크롤 미세 반응 | 세로 이동만 적용 | `currentSrc`, 이미지 로딩, overflow 확인 |
| 기존 방문 상담 전환 | 첫 화면에 명확한 다음 행동 | `.hero-community-actions` | 밑줄·화살표 미세 이동 | 44px 이상 터치 영역 | 두 링크 높이 48px, 상담 URL 연결 확인 |

## Signature composition and component

- Signature composition: 화면 전체를 채우는 실제 센터 사진과 사진 속 1986 로고, 좌하단 커뮤니티 약속과 참여 CTA.
- Signature component: `1986 Living Photo` — 정지 사진을 카메라 줌·드리프트·포인터·스크롤 반응으로 살아 있게 만드는 미디어 프레임.

## Motion storyboard

| Beat | Trigger | Elements | From → to | Duration/ease | Purpose | Reduced motion |
|---|---|---|---|---|---|---|
| Establish | 첫 진입 | 실제 hero 사진 | 111%·저채도·투명 → 102.5%·원색·불투명 | 2.2s cubic-bezier(.2,.72,.2,1) | 공간과 사진 속 로고를 첫 증거로 제시 | 최종 사진 즉시 표시 |
| Continue | 진입 종료 | 실제 hero 사진 | 102.5% → 106.5%, 좌우 1.1% 이동 | 18s ease-in-out alternate | 운동이 이어지는 호흡감 | 정지 |
| Promise | 첫 진입 | 카피, CTA | 아래 18px → 제자리 | 0.65s ease, stagger | 의미와 행동을 순서대로 제시 | 최종 상태 |
| Explore | pointer/scroll/hover | 사진·CTA | 사진 ±4px, 스크롤 18px, 버튼 이동 | 0.2–0.45s ease | 화면과 사용자의 연결감 | 버튼 색상 변화만 유지 |

## Tokens

- Font: 기존 Noto Sans KR + DM Sans 유지.
- Text colors: white, accent-soft, muted gray.
- Surface colors: black overlay over owned hero media.
- Accent: existing olive `#66734e`.
- Border: 1px rgba white, no added shadow.
- Motion: photo intro 2.2s, ambient drift 18s, microinteraction 0.2–0.45s.

## Copy ladder

- Tension: 혼자 시작한 운동은 쉽게 멈춥니다.
- Promise: 운동을 시작하는 곳에서, 운동이 계속되는 곳으로.
- Proof: 실제 원흥점 공간과 1986 로고가 담긴 사진.
- Action: 커뮤니티 경험 보기 / 방문 상담.

## Screen priorities

1. 실제 사진 속 1986 브랜드와 센터 공간.
2. 운동을 계속하게 만드는 커뮤니티 약속.
3. 커뮤니티 경험 및 상담 행동.

## Behavior that must remain unchanged

- 기존 헤더, 섹션 링크, 상담 URL, 전화 연결, 페이지 순서와 사진 자산.

## Anti-template decisions

- Generic pattern being rejected: 중앙 문구와 버튼만 얹은 일반적인 피트니스 hero.
- Project-specific replacement: 실제 원흥점 사진이 천천히 살아 움직이며 사진 속 1986 로고를 직접 브랜드 증거로 보여주는 구성.

## Responsive and motion contract

- Viewports: 320 / 360 / 390 / 430 / desktop
- Desktop media behavior: 실제 사진 전체 화면, 2.2초 줌아웃과 18초 미세 드리프트, 좌하단 카피.
- Mobile media behavior: 사진을 상단 52%에 배치하고 줌과 세로 이동량을 축소, 하단 고정 카피와 CTA.
- Scroll reveal grammar: 기존 세로 rise 유지.
- Reduced-motion final state: 사진과 카피를 최종 위치에서 정지.
- Text-clipping viewports: 320px에서 카피 2–3행, CTA 세로 배치 허용.

## Verification captures

- 로컬 데스크톱 1280×720 첫 화면과 사진 진입 완료 상태 캡처 완료.
- 사진 원본 1672×941 로딩, 오비트 제거, 두 사진 애니메이션 실행을 확인.
- 데스크톱 가로 overflow 0, CTA 높이 48px 확인.
- 760px 이하 사진 상단 크롭 및 360px 이하 카피·CTA 축소 규칙을 확인한다.
- `prefers-reduced-motion`에서 사진·카피 애니메이션 제거 및 최종 상태 표시 규칙을 확인한다.

## Review wall update — 2026-08-24

- Product job: 실제 네이버 리뷰 9개를 넘기지 않고 한 화면 흐름에서 비교해 시설, 친절, 기구, 공간에 대한 반복 증거를 빠르게 인식하게 한다.
- Supplied reference evidence: 사용자가 제공한 세로형 네이버 리뷰 캡처 9장은 높이가 468–679px로 서로 다르며, 이 길이 차이를 제거하지 않고 편집 디자인의 리듬으로 사용한다.
- Signature composition: 동일 높이 카드 슬라이더 대신 3열 비대칭 masonry review wall. 카드 폭·회전·상하 위치를 미세하게 달리해 실제 후기들이 벽에 연속 부착되는 인상을 만든다.
- Signature component: `Review Burst Wall` — 섹션 진입 시 카드가 중앙에서 짧은 간격으로 scale/translate/rotate 되며 연속 조립된다.
- Motion storyboard: 헤더가 먼저 올라오고, 리뷰 카드 9개가 55ms 간격으로 520–680ms 동안 순차 등장한다. hover/focus에서 카드가 1.5% 확대되고 회전이 정렬되며, 이미지 밝기와 테두리가 함께 반응한다. reduced-motion에서는 최종 상태를 즉시 표시한다.
- Mobile transformation: 가로 슬라이드와 진행바를 제거하고 1열로 전환한다. 카드 폭을 94–100%로 번갈아 배치하고 회전량을 절반으로 줄여 리뷰 본문 가독성을 유지한다.

| Reference evidence | Extracted principle | Local component | Motion/state | Mobile translation | Acceptance evidence |
|---|---|---|---|---|---|
| 제공된 리뷰 9장의 서로 다른 세로 길이 | 길이 차이를 숨기지 않는 실제 후기 wall | `.member-review-grid` | CSS columns 기반 masonry | 1열, 폭과 정렬만 교차 | 9장 동시 렌더·가로 overflow 0 |
| 캡처 안의 반복되는 별점·시설 사진·후기 본문 | 실제 후기 자체를 장식보다 우선 | `.member-review-card img` | hover/focus 확대·정렬·밝기 | 확대량 축소 | 모든 원본 비율·본문 보존 |

## Review matrix update — 2026-08-24

- 실제 리뷰 9장은 데스크톱과 모바일 모두 3열 × 3행의 한눈에 보이는 매트릭스로 유지한다.
- 서로 다른 원본 길이는 자르지 않고 카드 안에 `contain`으로 축소해 캡처 전체를 보존한다.
- 진입 모션은 행 단위로 빠르게 이어지는 좌·중·우 순차 등장으로 구성해 작은 모바일 카드에서도 움직임이 인지되게 한다.
- `prefers-reduced-motion` 환경에서는 모션 없이 즉시 전체 리뷰를 보여준다.
| 사용자의 “파파파팍” 모션 요청 | 짧고 연속적인 증거 조립 | `reviewBurstObserver` / `script.js` | 55ms stagger, translate/scale/rotate | 거리·회전 축소 | 순차 delay와 reduced-motion 확인 |

- Acceptance evidence: 로컬 1280px 화면에서 3열 masonry, 실제 이미지 9장 로딩, 리뷰 진행바 제거, 가로 overflow 0을 확인했다.
- Mobile evidence: 760px 이하에서 columns 1, 카드 폭 96%, 짝수 카드 우측 4% 이동, 회전·등장 거리 축소 규칙을 확인했다. 320px에서도 카드 실너비가 뷰포트를 넘지 않는다.
- Motion evidence: 카드별 `--review-index` 0–8과 55ms stagger를 적용했고, IntersectionObserver 진입 시 `is-burst-visible` 한 번만 실행되며 reduced-motion에서는 즉시 최종 상태가 된다.

## Coaches density update — 2026-08-24

- Evidence: 기존 코칭팀에 사용했던 `coach-barbell-explanation`, `coach-barbell-practice`, `coach-joint-check` 3장은 트레이너가 설명하고 직접 연습하며 회원의 움직임을 확인하는 실제 장면이다.
- Implementation: ‘가르치는 사람이 계속 배우는 센터’ 제목 바로 아래에 3장짜리 `coaches-learning-gallery`를 배치해 제목의 증거로 연결한다. 아래 `coach-media`의 전문 자료 4장은 별도 1986 코칭팀 proof로 유지한다.
- Mobile transformation: 학습 갤러리는 2열 editorial collage를 유지하고, 코칭팀 proof 4장도 1열에서 2×2로 바꿔 한 화면 밀도를 높인다. 캡션은 42px 높이와 8–9px 영문으로 축소해 이미지 공간을 확보한다.
- Acceptance: 모바일 390px에서 두 갤러리 모두 가로 overflow 없이 2열을 유지하고, 4개 코칭 분야 proof가 2×2로 보이는지 확인한다.
- Verified: 로컬 데스크톱에서 학습 사진 3장과 코칭 proof 4장의 원본 로딩, 데스크톱 3열/2열 구성, 가로 overflow 0을 확인했다. 760px 이하 CSS에서 학습 갤러리는 첫 장 전체폭+아래 2장, 코칭 proof는 2×2로 전환된다.

## Coaching proof priority update — 2026-08-24

- Evidence: 사용자가 제공한 체형 변화 전후 사진과 웨딩 촬영 전후 사진은 각각 ‘체형 개선’과 ‘웨딩 PT’를 직접 보여주는 실제 결과 자료다.
- Implementation: 두 자료를 `window.TRAINERS[0].images`의 첫 번째와 두 번째로 추가해 코칭 proof 갤러리의 맨 위 첫 줄에 배치한다. 기존 4장은 그대로 유지한다.
- Responsive rule: 총 6장을 모든 화면에서 2열로 유지해 새 결과 자료가 첫 줄에서 나란히 보이고, 기존 자료는 아래 두 줄로 이어지게 한다.
