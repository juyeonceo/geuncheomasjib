import { Restaurant, Region } from '@/types/restaurant';

// 기본 기준 지역 (서울시 마포구 연남동)
export const DEFAULT_REGION: Region = {
  id: 'mapo-yeonnam',
  name: '서울시 마포구 연남동',
  sido: '서울특별시',
  sigungu: '마포구',
  dong: '연남동',
  coords: {
    latitude: 37.5615,
    longitude: 126.9248,
  },
};

// 위치 권한 거부 시 선택 가능한 추천 동네 목록
export const AVAILABLE_REGIONS: Region[] = [
  {
    id: 'seodaemun-station',
    name: '서울시 서대문구 충정로 (서대문역 5호선)',
    sido: '서울특별시',
    sigungu: '서대문구',
    dong: '충정로2가',
    coords: { latitude: 37.5658, longitude: 126.9667 },
  },
  {
    id: 'mapo-yeonnam',
    name: '서울시 마포구 연남동 (기본 테스트 지역)',
    sido: '서울특별시',
    sigungu: '마포구',
    dong: '연남동',
    coords: { latitude: 37.5615, longitude: 126.9248 },
  },
  {
    id: 'mapo-seogyo',
    name: '서울시 마포구 서교동 (홍대 중심)',
    sido: '서울특별시',
    sigungu: '마포구',
    dong: '서교동',
    coords: { latitude: 37.5552, longitude: 126.9214 },
  },
  {
    id: 'mapo-mangwon',
    name: '서울시 마포구 망원동 (망원시장)',
    sido: '서울특별시',
    sigungu: '마포구',
    dong: '망원동',
    coords: { latitude: 37.5568, longitude: 126.9101 },
  },
  {
    id: 'mapo-hapjeong',
    name: '서울시 마포구 합정동 (합정역)',
    sido: '서울특별시',
    sigungu: '마포구',
    dong: '합정동',
    coords: { latitude: 37.5495, longitude: 126.9137 },
  },
  {
    id: 'gangnam-yeoksam',
    name: '서울시 강남구 역삼동',
    sido: '서울특별시',
    sigungu: '강남구',
    dong: '역삼동',
    coords: { latitude: 37.5006, longitude: 127.0365 },
  },
  {
    id: 'seongdong-seongsu',
    name: '서울시 성동구 성수동',
    sido: '서울특별시',
    sigungu: '성동구',
    dong: '성수동',
    coords: { latitude: 37.5446, longitude: 127.0559 },
  },
];

const SAMPLE_NOTICE = {
  isSample: true as const,
  ratingNotice: '공식 API 연동 준비 중 (샘플 데이터 - 평점 미제공)',
  reviewNotice: '방문자 리뷰 서비스 준비 중 (샘플 데이터)',
  businessHoursNotice: '공공데이터 포털 API 연동 시 제공 예정 (샘플 데이터)',
};

/**
 * 20개 샘플 음식점 데이터
 * 기준점: 서울시 마포구 연남동 (37.5615, 126.9248)
 * 거리 필터 테스트를 위해 500m 이내, 1km 이내, 3km 이내 좌표로 정밀 분배
 */
export const SAMPLE_RESTAURANTS: Restaurant[] = [
  // === [1 ~ 7] 500m 이내 반경 (연남동 중심가) ===
  {
    id: 'sample-01',
    name: '[샘플] 연남 솥밥한상',
    category: '한식',
    subCategory: '솥밥·한정식',
    roadAddress: '서울 마포구 동교로 242 (샘플 주소)',
    address: '서울 마포구 연남동 228-4',
    phone: '02-0000-0001 (샘플)',
    coords: { latitude: 37.5618, longitude: 126.9251 }, // ~40m
    mainMenu: ['전복 솥밥', '스테이크 솥밥', '도미 솥밥'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-02',
    name: '[샘플] 숲길 파스타 라보',
    category: '양식',
    subCategory: '생면 파스타',
    roadAddress: '서울 마포구 연남로 1길 12 (샘플 주소)',
    address: '서울 마포구 연남동 257-2',
    phone: '02-0000-0002 (샘플)',
    coords: { latitude: 37.5627, longitude: 126.9240 }, // ~150m
    mainMenu: ['화이트 라구 파스타', '트러플 뇨끼', '시저 샐러드'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-03',
    name: '[샘플] 동교 라멘야',
    category: '일식',
    subCategory: '돈코츠 라멘',
    roadAddress: '서울 마포구 동교로38길 15 (샘플 주소)',
    address: '서울 마포구 연남동 383-9',
    phone: '02-0000-0003 (샘플)',
    coords: { latitude: 37.5604, longitude: 126.9259 }, // ~160m
    mainMenu: ['진한 돈코츠 라멘', '매운 카라라멘', '수제 교자'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-04',
    name: '[샘플] 연트럴 로스터리 카페',
    category: '카페·디저트',
    subCategory: '스페셜티 커피',
    roadAddress: '서울 마포구 양화로23길 30 (샘플 주소)',
    address: '서울 마포구 동교동 147-1',
    phone: '02-0000-0004 (샘플)',
    coords: { latitude: 37.5598, longitude: 126.9242 }, // ~200m
    mainMenu: ['플랫화이트', '핸드드립 커피', '바닐라 까눌레'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-05',
    name: '[샘플] 연남 홍콩반점방',
    category: '중식',
    subCategory: '딤섬·중화요리',
    roadAddress: '서울 마포구 성미산로 198 (샘플 주소)',
    address: '서울 마포구 연남동 227-15',
    phone: '02-0000-0005 (샘플)',
    coords: { latitude: 37.5638, longitude: 126.9245 }, // ~260m
    mainMenu: ['소룡포', '마파두부 덮밥', '사천 꿔바로우'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-06',
    name: '[샘플] 경의선 쌀국수',
    category: '아시안/패스트푸드',
    subCategory: '베트남 음식',
    roadAddress: '서울 마포구 연남로 25 (샘플 주소)',
    address: '서울 마포구 연남동 565-1',
    phone: '02-0000-0006 (샘플)',
    coords: { latitude: 37.5641, longitude: 126.9232 }, // ~320m
    mainMenu: ['차돌 양지 쌀국수', '분짜', '짜조'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-07',
    name: '[샘플] 할머니 쌀떡볶이',
    category: '분식',
    subCategory: '즉석 떡볶이',
    roadAddress: '서울 마포구 동교로 260 (샘플 주소)',
    address: '서울 마포구 연남동 224-3',
    phone: '02-0000-0007 (샘플)',
    coords: { latitude: 37.5632, longitude: 126.9272 }, // ~280m
    mainMenu: ['가래떡 떡볶이', '모둠 수제튀김', '어묵탕'],
    ...SAMPLE_NOTICE,
  },

  // === [8 ~ 14] 500m ~ 1km 이내 반경 (홍대입구역 및 서교동 북측) ===
  {
    id: 'sample-08',
    name: '[샘플] 서교 숯불갈비',
    category: '한식',
    subCategory: '돼지갈비·삼겹살',
    roadAddress: '서울 마포구 와우산로 112 (샘플 주소)',
    address: '서울 마포구 서교동 338-1',
    phone: '02-0000-0008 (샘플)',
    coords: { latitude: 37.5560, longitude: 126.9280 }, // ~670m
    mainMenu: ['수제 돼지갈비', '숙성 생삼겹살', '차돌 된장찌개'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-09',
    name: '[샘플] 홍대 스시 오마카세',
    category: '일식',
    subCategory: '초밥·사시미',
    roadAddress: '서울 마포구 어울마당로 65 (샘플 주소)',
    address: '서울 마포구 서교동 364-2',
    phone: '02-0000-0009 (샘플)',
    coords: { latitude: 37.5539, longitude: 126.9220 }, // ~880m
    mainMenu: ['런치 스시 코스', '디너 오마카세', '후토마키'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-10',
    name: '[샘플] 홍대 정통 화덕피자',
    category: '양식',
    subCategory: '이탈리안 피자',
    roadAddress: '서울 마포구 독막로7길 40 (샘플 주소)',
    address: '서울 마포구 서교동 404-5',
    phone: '02-0000-0010 (샘플)',
    coords: { latitude: 37.5512, longitude: 126.9205 }, // ~950m
    mainMenu: ['마르게리타 피자', '콰트로 포르마지', '부라타 샐러드'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-11',
    name: '[샘플] 마포 마라공방',
    category: '중식',
    subCategory: '마라탕·마라샹궈',
    roadAddress: '서울 마포구 홍익로 10 (샘플 주소)',
    address: '서울 마포구 서교동 486-1',
    phone: '02-0000-0011 (샘플)',
    coords: { latitude: 37.5548, longitude: 126.9238 }, // ~750m
    mainMenu: ['DIY 마라탕', '마라샹궈', '꿔바로우 소'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-12',
    name: '[샘플] 와우산 베이글 하우스',
    category: '카페·디저트',
    subCategory: '수제 베이글',
    roadAddress: '서울 마포구 와우산로29길 8 (샘플 주소)',
    address: '서울 마포구 서교동 328-12',
    phone: '02-0000-0012 (샘플)',
    coords: { latitude: 37.5562, longitude: 126.9295 }, // ~720m
    mainMenu: ['대파 크림치즈 베이글', '잠봉뵈르 베이글', '아메리카노'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-13',
    name: '[샘플] 서교 수제버거 클럽',
    category: '아시안/패스트푸드',
    subCategory: '수제버거',
    roadAddress: '서울 마포구 잔다리로 28 (샘플 주소)',
    address: '서울 마포구 서교동 370-1',
    phone: '02-0000-0013 (샘플)',
    coords: { latitude: 37.5524, longitude: 126.9192 }, // ~890m
    mainMenu: ['더블 치즈버거', '베이컨 아보카도 버거', '트러플 프라이'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-14',
    name: '[샘플] 통통 김밥천국방',
    category: '분식',
    subCategory: '김밥·라면',
    roadAddress: '서울 마포구 양화로 100 (샘플 주소)',
    address: '서울 마포구 서교동 375-10',
    phone: '02-0000-0014 (샘플)',
    coords: { latitude: 37.5535, longitude: 126.9208 }, // ~860m
    mainMenu: ['참치마요 김밥', '치즈 라볶이', '해장 콩나물라면'],
    ...SAMPLE_NOTICE,
  },

  // === [15 ~ 20] 1km ~ 3km 이내 반경 (망원동, 합정동, 신촌 경계) ===
  {
    id: 'sample-15',
    name: '[샘플] 망원시장 닭강정',
    category: '분식',
    subCategory: '닭강정·시장분식',
    roadAddress: '서울 마포구 포은로8길 14 (샘플 주소)',
    address: '서울 마포구 망원동 411-2',
    phone: '02-0000-0015 (샘플)',
    coords: { latitude: 37.5561, longitude: 126.9056 }, // ~1.8km
    mainMenu: ['매콤 달콤 닭강정', '뿌링클 닭강정', '치즈 핫도그'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-16',
    name: '[샘플] 망원동 전통 순대국',
    category: '한식',
    subCategory: '순대국·수육',
    roadAddress: '서울 마포구 망원로 70 (샘플 주소)',
    address: '서울 마포구 망원동 402-1',
    phone: '02-0000-0016 (샘플)',
    coords: { latitude: 37.5550, longitude: 126.9030 }, // ~2.0km
    mainMenu: ['토종 순대국', '머릿고기 수육', '얼큰 술국'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-17',
    name: '[샘플] 합정 카츠 공방',
    category: '일식',
    subCategory: '돈카츠 전문',
    roadAddress: '서울 마포구 독막로3길 18 (샘플 주소)',
    address: '서울 마포구 합정동 396-4',
    phone: '02-0000-0017 (샘플)',
    coords: { latitude: 37.5488, longitude: 126.9142 }, // ~1.7km
    mainMenu: ['특로스카츠 정식', '히레카츠 정식', '카레 추가'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-18',
    name: '[샘플] 합정 멕시칸 타코야',
    category: '양식',
    subCategory: '멕시칸 타코',
    roadAddress: '서울 마포구 포은로 40 (샘플 주소)',
    address: '서울 마포구 합정동 412-1',
    phone: '02-0000-0018 (샘플)',
    coords: { latitude: 37.5492, longitude: 126.9098 }, // ~1.9km
    mainMenu: ['비프 브리스킷 타코', '포크 까르니따스', '과카몰리 앤 칩스'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-19',
    name: '[샘플] 신촌 매운짜장각',
    category: '중식',
    subCategory: '중화요리',
    roadAddress: '서울 서대문구 신촌로 73 (샘플 주소)',
    address: '서울 서대문구 창천동 29-1',
    phone: '02-0000-0019 (샘플)',
    coords: { latitude: 37.5569, longitude: 126.9360 }, // ~1.1km
    mainMenu: ['불타는 쟁반짜장', '바삭 탕수육', '차돌 짬뽕'],
    ...SAMPLE_NOTICE,
  },
  {
    id: 'sample-20',
    name: '[샘플] 상수 한옥 티하우스',
    category: '카페·디저트',
    subCategory: '전통차·다과',
    roadAddress: '서울 마포구 와우산로3길 10 (샘플 주소)',
    address: '서울 마포구 상수동 315-1',
    phone: '02-0000-0020 (샘플)',
    coords: { latitude: 37.5475, longitude: 126.9228 }, // ~1.6km
    mainMenu: ['호지차 라떼', '개성주악', '모나카 아이스크림'],
    ...SAMPLE_NOTICE,
  },
];
