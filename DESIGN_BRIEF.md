# Design Brief

## Product job

원흥 인근의 잠재 회원이 첫 화면에서 1986피트니스를 시설만 이용하는 헬스장이 아니라 함께 배우고 참여하며 운동을 이어가는 커뮤니티로 이해하고, 커뮤니티 경험 또는 상담으로 이동하게 한다.

## Direction

실제 센터 사진 위에서 흩어진 운동 경험 키워드가 중앙의 1986 워드마크로 모이는 저채도 오비트 구성. 짧은 집결 모션 뒤에는 사진과 참여 행동이 가장 선명하게 남는다.

## Brand reading

- Immutable identity: 1986 명칭, 올리브 그린, 실제 원흥점 사진, 과장 없는 전문성과 관계 중심 카피.
- Repeatable shapes/materials: 얇은 선, 원형 궤도, 작은 영문 라벨, 밝은 실제 사진과 짙은 오버레이.
- Existing inconsistencies to remove: 의미 없이 회전하던 원형 스탬프와 시설 소개에 머무는 첫 화면 인상.
- Media provenance: `assets/hero/hero-main.png`는 사용자가 제공한 원흥점 실제 이미지로 확인됨. 투명 공식 로고 파일은 현재 없음.

## Reference evidence

- 2026-08-24 Webflow Community orbital animation livestream 페이지의 제목·설명 영역 확인: 커뮤니티 홈페이지에서 HTML/CSS 기반 원형 궤도와 동적 데이터를 결합하는 구조.
- 현재 로컬 `#top` 확인: 실제 사진 배경, 좌측 하단 헤드라인, 고정 헤더와 CTA. 모바일에서는 사진을 상단 48%에 배치하고 카피가 하단으로 이동함.

## Reference synthesis

- Structure comes from: 현재 1986 첫 화면의 실제 사진과 카피 우선 구조.
- Interaction comes from: Webflow Community의 중심-궤도 관계 표현 원칙.
- Visual tone comes from: 기존 올리브/오프화이트/블랙 디자인 토큰.
- Hook/copy energy comes from: 브랜드 철학 “운동을 시작하는 곳에서, 운동이 계속되는 곳으로.”
- Motion/media behavior comes from: 흩어진 원형 요소가 중심 정체성으로 집결한 뒤 잔잔히 순환하는 방식.
- The final screen will not copy: Webflow 로고, 색상, 문구, 완성 레이아웃 또는 인터랙션 코드.

## Reference implementation map

| Reference evidence | Extracted principle | Local component | Motion/state | Mobile translation | Acceptance evidence |
|---|---|---|---|---|---|
| Webflow Community orbital animation description | 여러 커뮤니티 요소가 하나의 중심을 공유 | `.community-orbit` / `index.html` | 5개 노드 집결 → 저속 순환 | 3개 노드만 노출, 궤도 축소 | 1280×720 캡처: 5개 노드·중앙 코어·가로 overflow 0 확인 |
| 현재 1986 실제 사진 hero | 실제 경험을 모션보다 우선 | `.hero-community` / `styles.css` | 사진은 고정, 오버레이만 단계 진입 | 센터 중심을 보존한 상단 크롭 | 로컬 캡처에서 실제 배경·카피·궤도 충돌 없음 확인 |
| 기존 방문 상담 전환 | 첫 화면에 명확한 다음 행동 | `.hero-community-actions` | 밑줄·화살표 미세 이동 | 44px 이상 터치 영역 | 두 링크 높이 48px, 상담 URL 연결 확인 |

## Signature composition and component

- Signature composition: 실제 회원 사진 위 중앙 워드마크와 비대칭 궤도, 좌하단 커뮤니티 약속과 우하단 참여 CTA.
- Signature component: `1986 Community Orbit` — 운동 경험을 뜻하는 키워드가 1986을 중심으로 연결되는 모션형 워드마크.

## Motion storyboard

| Beat | Trigger | Elements | From → to | Duration/ease | Purpose | Reduced motion |
|---|---|---|---|---|---|---|
| Gather | 첫 진입 | 궤도선, 1986, 키워드 노드 | 축소·산개·투명 → 중심 배치 | 1.4s cubic-bezier(.2,.75,.2,1) | 각자의 운동 경험이 1986에 모임 | 최종 배치 즉시 표시 |
| Continue | Gather 종료 | 궤도 전체, 노드 | 0deg → 360deg | 30s linear infinite | 운동과 관계의 지속 | 정지 |
| Promise | 첫 진입 | 카피, CTA | 아래 18px → 제자리 | 0.65s ease, stagger | 의미와 행동을 순서대로 제시 | 최종 상태 |
| Explore | hover/focus | 노드·CTA | 밝기/선/화살표 변화 | 0.2s ease | 상호작용 가능성 전달 | 색상 변화만 유지 |

## Tokens

- Font: 기존 Noto Sans KR + DM Sans 유지.
- Text colors: white, accent-soft, muted gray.
- Surface colors: black overlay over owned hero media.
- Accent: existing olive `#66734e`.
- Border: 1px rgba white, no added shadow.
- Motion: intro 0.65–1.4s, ambient orbit 30s, microinteraction 0.2s.

## Copy ladder

- Tension: 혼자 시작한 운동은 쉽게 멈춥니다.
- Promise: 운동을 시작하는 곳에서, 운동이 계속되는 곳으로.
- Proof: TRAIN · LEARN · CONNECT · PARTICIPATE · CONTINUE.
- Action: 커뮤니티 경험 보기 / 방문 상담.

## Screen priorities

1. 중앙 1986 커뮤니티 정체성.
2. 실제 회원과 센터 사진.
3. 커뮤니티 경험 및 상담 행동.

## Behavior that must remain unchanged

- 기존 헤더, 섹션 링크, 상담 URL, 전화 연결, 페이지 순서와 사진 자산.

## Anti-template decisions

- Generic pattern being rejected: 중앙 문구와 버튼만 얹은 일반적인 피트니스 hero.
- Project-specific replacement: TRAIN–LEARN–CONNECT–PARTICIPATE–CONTINUE가 1986으로 모이는 브랜드 여정 시각화.

## Responsive and motion contract

- Viewports: 320 / 360 / 390 / 430 / desktop
- Desktop media behavior: 실제 사진 전체 화면, 중앙 우측 궤도, 좌하단 카피.
- Mobile media behavior: 상단 사진 영역 안에 축소 궤도, 노드 3개, 하단 고정 카피와 CTA.
- Scroll reveal grammar: 기존 세로 rise 유지.
- Reduced-motion final state: 궤도와 모든 노드를 최종 위치에서 정지.
- Text-clipping viewports: 320px에서 카피 2–3행, CTA 세로 배치 허용.

## Verification captures

- 로컬 데스크톱 1280×720 첫 화면 캡처 완료.
- 모션 1.8초 후 중앙 코어, 5개 노드, 카피, CTA 표시 확인.
- 데스크톱 가로 overflow 0, CTA 높이 48px 확인.
- 760px 이하에서 노드 2개 제거 및 360px 이하 카피·CTA 축소 규칙 확인.
- `prefers-reduced-motion`에서 집결·순환 애니메이션 제거 및 최종 상태 표시 규칙 확인.
