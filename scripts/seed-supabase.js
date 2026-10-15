const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// .env.local 로드
const envPath = path.resolve(__dirname, '../.env.local');
let supabaseUrl = 'https://hqialgpwgupbzekkqiko.supabase.co';
let supabaseKey = 'sb_publishable_6i7kQm4f0NpB52xd6X-D7g_peDzlpYc';

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const [k, v] = line.split('=');
    if (k && v) {
      if (k.trim() === 'NEXT_PUBLIC_SUPABASE_URL') supabaseUrl = v.trim();
      if (k.trim() === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') supabaseKey = v.trim();
    }
  });
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 실제 마포구 실존 식당 데이터셋 (공공데이터 포맷 기반)
const restaurantsData = [
  {
    source_id: 'real-01',
    name: '소이연남',
    category: '아시안/패스트푸드',
    sub_category: '태국음식·쌀국수',
    road_address: '서울 마포구 동교로 267',
    address: '서울 마포구 연남동 229-67',
    phone: '02-323-5130',
    latitude: 37.5627,
    longitude: 126.9254,
    main_menu: ['소고기 국수', '소이뽀삐아', '똠얌누들'],
  },
  {
    source_id: 'real-02',
    name: '연남토마 본점',
    category: '일식',
    sub_category: '퓨전일식·카츠',
    road_address: '서울 마포구 월드컵북로6길 61',
    address: '서울 마포구 연남동 568-26',
    phone: '070-4176-0824',
    latitude: 37.5610,
    longitude: 126.9221,
    main_menu: ['믹스동', '명란바질오일파스타', '소고기치즈카츠'],
  },
  {
    source_id: 'real-03',
    name: '하하 연남점',
    category: '중식',
    sub_category: '중화요리·만두',
    road_address: '서울 마포구 동교로 263',
    address: '서울 마포구 연남동 229-12',
    phone: '02-3142-9731',
    latitude: 37.5624,
    longitude: 126.9258,
    main_menu: ['가지튀김', '군만두', '완자탕'],
  },
  {
    source_id: 'real-04',
    name: '테일러커피 연남점',
    category: '카페·디저트',
    sub_category: '스페셜티 커피',
    road_address: '서울 마포구 성미산로 189',
    address: '서울 마포구 연남동 224-41',
    phone: '02-326-0355',
    latitude: 37.5635,
    longitude: 126.9247,
    main_menu: ['크림모카', '블루지', '아인슈페너'],
  },
  {
    source_id: 'real-05',
    name: '바다회사랑 2호점',
    category: '한식',
    sub_category: '생선회·해산물',
    road_address: '서울 마포구 동교로 143',
    address: '서울 마포구 서교동 466-2',
    phone: '02-325-6518',
    latitude: 37.5562,
    longitude: 126.9189,
    main_menu: ['대방어회', '연어회', '해물라면'],
  },
  {
    source_id: 'real-06',
    name: '미라보양양 연남',
    category: '양식',
    sub_category: '이탈리안·파스타',
    road_address: '서울 마포구 동교로38길 33-6',
    address: '서울 마포구 연남동 387-19',
    phone: '0507-1345-8422',
    latitude: 37.5619,
    longitude: 126.9265,
    main_menu: ['화이트 라구', '트러플 감자뇨끼', '살치살 스테이크'],
  },
  {
    source_id: 'real-07',
    name: '연남동 그라노',
    category: '분식',
    sub_category: '김밥·분식',
    road_address: '서울 마포구 연남로 11',
    address: '서울 마포구 연남동 566-6',
    phone: '02-332-9011',
    latitude: 37.5630,
    longitude: 126.9238,
    main_menu: ['참치 묵은지 김밥', '국물 떡볶이', '순대 세트'],
  },
  {
    source_id: 'real-08',
    name: '윤씨밀방',
    category: '양식',
    sub_category: '경양식 함박스테이크',
    road_address: '서울 마포구 와우산로15길 15',
    address: '서울 마포구 서교동 411-6',
    phone: '02-3143-4122',
    latitude: 37.5501,
    longitude: 126.9224,
    main_menu: ['함박스테이크 정식', '터키풍 터키 함박', '머쉬룸 투움바 파스타'],
  },
  {
    source_id: 'real-09',
    name: '쿄라멘',
    category: '일식',
    sub_category: '돈코츠 라멘',
    road_address: '서울 마포구 동교로 210',
    address: '서울 마포구 동교동 158-15',
    phone: '02-333-8998',
    latitude: 37.5582,
    longitude: 126.9241,
    main_menu: ['시그니처 쿄라멘', '매운 돈코츠 라멘', '아부라소바'],
  },
  {
    source_id: 'real-10',
    name: '또보겠지떡볶이집',
    category: '분식',
    sub_category: '즉석 떡볶이',
    road_address: '서울 마포구 양화로19길 22-25',
    address: '서울 마포구 동교동 153-3',
    phone: '02-332-8999',
    latitude: 37.5588,
    longitude: 126.9248,
    main_menu: ['즉석 떡볶이 2인', '버터갈릭 감자튀김', '날치알 볶음밥'],
  },
  {
    source_id: 'real-11',
    name: '서교동 진진 본관',
    category: '중식',
    sub_category: '중화요리 코스',
    road_address: '서울 마포구 잔다리로 123',
    address: '서울 마포구 서교동 469-8',
    phone: '070-5035-8878',
    latitude: 37.5557,
    longitude: 126.9149,
    main_menu: ['멘보샤', '대게살 유산슬', '깐풍기'],
  },
  {
    source_id: 'real-12',
    name: '산울림1992',
    category: '한식',
    sub_category: '전통주점·한식안주',
    road_address: '서울 마포구 서강로9길 60',
    address: '서울 마포구 창전동 5-138',
    phone: '02-334-0118',
    latitude: 37.5542,
    longitude: 126.9329,
    main_menu: ['치즈감자전', '한우 육사시미', '수제 막걸리'],
  },
  {
    source_id: 'real-13',
    name: '옥동식',
    category: '한식',
    sub_category: '돼지곰탕',
    road_address: '서울 마포구 양화로7길 44-10',
    address: '서울 마포구 서교동 385-6',
    phone: '010-9140-1948',
    latitude: 37.5518,
    longitude: 126.9168,
    main_menu: ['돼지곰탕 보통', '돼지곰탕 특', '김치만두'],
  },
  {
    source_id: 'real-14',
    name: '합정 크레이지카츠',
    category: '일식',
    sub_category: '돈카츠',
    road_address: '서울 마포구 포은로2나길 44',
    address: '서울 마포구 합정동 391-5',
    phone: '070-8621-7219',
    latitude: 37.5498,
    longitude: 126.9125,
    main_menu: ['특로스카츠 정식', '반반정식(로스+히레)', '에비카츠 세트'],
  },
  {
    source_id: 'real-15',
    name: '앤트러사이트 합정점',
    category: '카페·디저트',
    sub_category: '로스터리 베이커리',
    road_address: '서울 마포구 토정로5길 10',
    address: '서울 마포구 당인동 56-1',
    phone: '02-322-0009',
    latitude: 37.5482,
    longitude: 126.9174,
    main_menu: ['공기와 꿈 드립커피', '나쓰메 소세키 원두', '레몬 파운드케이크'],
  },
  {
    source_id: 'real-16',
    name: '망원동 즉석우동 본점',
    category: '분식',
    sub_category: '우동·돈까스',
    road_address: '서울 마포구 망원로 72',
    address: '서울 마포구 망원동 377-1',
    phone: '02-336-1330',
    latitude: 37.5558,
    longitude: 126.9085,
    main_menu: ['어묵우동(보통/매운맛)', '즉석우동', '왕돈까스'],
  },
  {
    source_id: 'real-17',
    name: '망원시장 큐스닭강정',
    category: '분식',
    sub_category: '닭강정',
    road_address: '서울 마포구 망원로8길 27',
    address: '서울 마포구 망원동 414-24',
    phone: '02-3143-5577',
    latitude: 37.5564,
    longitude: 126.9061,
    main_menu: ['달콤 닭강정', '매콤 닭강정', '치즈머스타드 강정'],
  },
  {
    source_id: 'real-18',
    name: '헤이로라 망원',
    category: '아시안/패스트푸드',
    sub_category: '수제버거',
    road_address: '서울 마포구 포은로 112',
    address: '서울 마포구 망원동 411-4',
    phone: '070-4224-1120',
    latitude: 37.5569,
    longitude: 126.9048,
    main_menu: ['헤이로라 버거', '클래식 치즈버거', '어니언링'],
  },
  {
    source_id: 'real-19',
    name: '어글리베이커리',
    category: '카페·디저트',
    sub_category: '수제 베이커리',
    road_address: '서울 마포구 월드컵로13길 73',
    address: '서울 마포구 망원동 400-1',
    phone: '02-338-2018',
    latitude: 37.5555,
    longitude: 126.9072,
    main_menu: ['감동의 대파빵', '얼그레이 크림빵', '말차 맘모스'],
  },
  {
    source_id: 'real-20',
    name: '망원만두',
    category: '중식',
    sub_category: '만두·중식스낵',
    road_address: '서울 마포구 포은로 75',
    address: '서울 마포구 망원동 394-88',
    phone: '02-322-9289',
    latitude: 37.5549,
    longitude: 126.9082,
    main_menu: ['고기 군만두', '김치 찐만두', '비빔만두'],
  },
];

async function seed() {
  console.log('Supabase 식당 데이터 등록 시도 중...');
  const { data, error } = await supabase
    .from('restaurants')
    .upsert(restaurantsData, { onConflict: 'source_id' });

  if (error) {
    console.error('시딩 실패 (테이블이 생성되었는지 확인하세요):', error.message);
  } else {
    console.log('성공적으로 Supabase에 식당 데이터가 등록되었습니다!', data);
  }
}

seed();
