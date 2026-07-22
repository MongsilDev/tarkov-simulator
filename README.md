# tarkov-simulator

Escape from Tarkov 시즌 1 "KORD BREACH"의 특성(모디파이어) 포인트 시뮬레이터. 앱 내부 이름은 `kord-breach`. Project Zomboid처럼 긍정 특성은 포인트를 소모하고 부정 특성은 포인트를 획득해, 원하는 빌드를 짜 본다.

## 주요 기능

- 특성 3분류(글로벌 6 / 긍정 17 / 부정 13종) 카드 토글 선택
- 긍정·부정·순 합계 포인트 실시간 계산
- 같은 스탯을 정반대로 미는 특성 쌍은 상호 배타 처리(충돌 7쌍, 비공식 추정)
- 초기화

## 동작 방식

단일 페이지 클라이언트 컴포넌트. 특성 데이터는 코드(`src/data/traits.ts`)에 하드코딩되어 있고 외부 API·DB를 쓰지 않는다. 카드를 클릭하면 상단 점수판이 갱신된다. 데이터 출처는 `docs/KORDBREACH.md`.

## 기술 스택

Next.js 16, React 19, TypeScript, Tailwind 4. Vercel 배포.
