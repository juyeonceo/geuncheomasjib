import { NextResponse } from 'next/server';


export async function GET() {
  const upstreamUrl = 'https://t1.kakaocdn.net/mapjsapi/js/libs/services/1.1.5/services.js';

  try {
    const res = await fetch(upstreamUrl, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return new NextResponse(`console.error("Kakao services upstream error: ${res.status}");`, {
        status: 200,
        headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
      });
    }

    let code = await res.text();

    // DOMAIN을 동일 오리진("")으로 변경하여 내부 프록시(/v2/local/...)로 요청되도록 설정
    code = code.replace('DOMAIN=PROTOCOL+"//dapi.kakao.com"', 'DOMAIN=""');

    return new NextResponse(code, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (err) {
    console.error('Failed to proxy Kakao services:', err);
    return new NextResponse(`console.error("Kakao services proxy error");`, {
      status: 200,
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
    });
  }
}
