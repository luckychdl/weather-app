# 🌤 Weather App

## 🔗 배포 주소

🔗 https://weather.shindongwon.dev
(AWS Amplify 사용)

---

## 🔐 환경 변수 설정 (Amplify)

본 프로젝트는 OpenWeather API를 사용하므로
로컬 실행을 위해 API Key 설정이 필요합니다.

```
VITE_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY
```

• OpenWeather에서 발급받은 개인 API Key를 사용해야 합니다.
• 해당 값은 보안상 저장소에 포함하지 않았습니다.

---

## 🧪 실행 방법 (로컬)

```
npm install
npm run dev
```

---

## ✨ 주요 기능

1️⃣ 현재 위치 기반 날씨
• 브라우저 Geolocation API를 사용하여 사용자의 현재 위치 좌표를 획득
• 좌표 기반으로 OpenWeather API 호출
• 현재 기온 / 최저 / 최고 / 시간대별 날씨 표시

2️⃣ 장소 검색
• 대한민국 행정구역 데이터 기반 검색
• 시 / 군 / 구 / 동 단위 자유 검색
• 자동완성 리스트 제공
• 검색 결과 클릭 시 상세 페이지 이동

3️⃣ 즐겨찾기 기능
• 장소를 즐겨찾기로 등록 / 해제 가능
• 최대 6개까지 등록 제한
• 즐겨찾기 목록은 홈 화면에 카드 형태로 표시
• 모바일 환경에서는 가로 스크롤 UI 제공
• 즐겨찾기 라벨(이름) 편집 가능
• 즐겨찾기에는 좌표(lat/lon)만 저장하고
카드 렌더링 시 실시간으로 날씨 정보 요청

---

## 🧱 프로젝트 구조 (FSD 기반)

```
src/
├─ app/                # 앱 초기 설정 (라우터, 글로벌 스타일)
├─ pages/              # 페이지 단위 컴포넌트
│  ├─ home/
│  └─ detail/
├─ widgets/            # 화면을 구성하는 블록 단위 UI
│  ├─ current-weather/
│  ├─ favorite-cards/
│  └─ location-search-panel/
│  └─ location-weather/
├─ features/           # 사용자 액션/상호작용 로직
│  ├─ detect-current-location/
│  └─ favorite-location/
│  ├─ location-weather/
│  ├─ search-location/
├─ entities/           # 도메인 단위 모델
│  ├─ weather/
│  └─ location/
├─ shared/             # 공통 유틸, 설정
│  ├─ config/
│  └─ assets/
```

---

1. Feature-Sliced Design(FSD) 아키텍처 적용
   • 도메인(entity), 사용자 행동(feature), UI 조합(widget), 페이지(page)를 명확히 분리
   • 기능 단위 확장과 유지보수를 고려한 구조 설계
   • 과제 규모에서도 구조적 설계 역량을 보여줄 수 있다고 판단

2. React Query(TanStack Query) 사용
   • 서버 상태(weather API)를 클라이언트 상태와 분리하여 관리
   • API 요청 캐싱 및 중복 호출 방지
   • 좌표 기반 쿼리 키 설계를 통해 즐겨찾기 카드별 날씨 요청을 효율적으로 처리

3. 즐겨찾기 데이터 최소화 저장
   • localStorage에는 날씨 데이터가 아닌 좌표(lat, lon)만 저장
   • 저장된 날씨 정보의 stale 문제를 방지하고 항상 최신 데이터 제공
   • 저장 데이터 용량 최소화 및 구조 단순화

4. AWS Amplify를 이용한 배포
   • Git 기반 자동 배포 환경 구축
   • 환경 변수 관리가 용이하고 SPA 배포에 적합하다고 판단
   • 별도의 서버 설정 없이 프론트엔드 프로젝트 배포 가능

## React + Vite 선택 이유

1. 빠른 개발 환경과 즉각적인 피드백
   • Vite는 ES Module 기반 개발 서버를 사용하여
   초기 실행 및 Hot Module Replacement(HMR)가 매우 빠름
   • 잦은 UI 수정과 상태 확인이 필요한 과제 특성상
   빠른 피드백 루프가 생산성을 높인다고 판단

2. 설정과 구조의 단순성
   • Vite는 초기 설정이 간단하고,
   빌드/환경 변수/배포 설정이 명확함
   • 과제의 핵심인 기능 구현과 아키텍처 설계에 집중하기 위해
   도구로 인한 복잡도를 최소화
