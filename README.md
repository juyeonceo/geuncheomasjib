# 우리 동네 맛집 (geuncheomasjib) 🍽️

내 주변 500m, 1km, 3km 반경의 동네 음식점 정보를 실시간 지도와 함께 탐색하는 반응형 웹 서비스입니다.

---

## 🌟 주요 기능

### 1. 카카오 지도 실시간 연동 & 반응형 뷰
- **공식 카카오 지도 SDK 연동**: 정식 지도 타일, 부드러운 확대/축소/기준점 이동 컨트롤 탑재.
- **반응형 화면 전환**: 모바일에서는 하단 플로팅 탭(목록 ⇄ 지도)으로 한 손 조작 가능, 데스크톱에서는 2열 분할 뷰(목록 + 지도) 지원.
- **인터랙티브 핀 & 오버레이**: 매장 클릭 시 상세 정보 미니 카드 및 바텀시트/모달 지원.

### 2. 대한민국 전국 전철역 700+ 검색 & 자동완성
- **전국 모든 전철역 탐색**: 수도권 1~9호선, 신분당선, 수인분당선, 경의중앙선, 공항철도, 부산 1~4호선, 대구 1~3호선, 대전 1호선, 광주 1호선, KTX 주요 역사 지원.
- **실시간 드롭다운 자동완성**: 검색어 입력 시 해당 역명, 소속 노선, 지역이 즉시 추천되고 선택 시 지도가 해당 역으로 즉시 이동.
- **카카오 Places API 실시간 매장 보강**: 전국 어느 역을 검색하든 카카오의 실시간 음식점 데이터베이스에서 주변 맛집 자동 로드.

### 3. 내 주변 반경 필터 & 거리순 정렬
- **온디맨드 GPS 위치 권한**: 버튼 클릭 시에만 브라우저 위치 권한을 안전하게 요청.
- **개인정보 보호**: 사용자 실시간 위치는 브라우저 메모리에만 사용되며 서버 DB에 영구 저장하지 않음.
- **반경 필터**: `500m 이내`, `1km 이내`, `3km 이내`, `전체 거리` 원클릭 필터링.
- **하버사인(Haversine) 직선거리 계산**: 기준 위치로부터 실제 직선거리를 계산하여 가까운 순 오름차순 정렬.

### 4. 카테고리 및 키워드 검색
- **업종 카테고리 필터**: 전체, 한식, 일식, 중식, 양식, 분식, 카페·디저트, 아시안/패스트푸드.
- **다차원 키워드 검색**: 상호명, 대표 메뉴(예: 김치찜, 파스타, 도가니탕), 전철역명, 도로명/지번 주소 검색 지원.

---

## 🛠️ 기술 스택

- **Framework**: Next.js 16.4 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Map SDK**: Kakao Maps JavaScript SDK (`services.Places`)
- **Backend / Database**: Supabase (`@supabase/supabase-js`), Next.js Route Handlers
- **Open Data**: 공공데이터포털(소상공인시장진흥공단 상가정보) 규격 연동

---

## 🚀 시작하기

### 1. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 아래 키를 입력합니다 (`.env.example` 참고):

```env
# 카카오 지도 JavaScript 키
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_javascript_key_here

# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> **카카오 개발자 콘솔 설정 안내**:  
> [카카오 디벨로퍼스](https://developers.kakao.com) > [앱 설정] > [플랫폼] > [Web]에 `http://localhost:3000`을 등록해야 지도가 정상 작동합니다.

### 2. 패키지 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm run start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 서비스를 확인할 수 있습니다.
