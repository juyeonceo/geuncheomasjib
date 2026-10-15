import { NextResponse } from 'next/server';


export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const { search } = new URL(request.url);
  const path = slug.join('/');
  const targetUrl = `https://dapi.kakao.com/v2/local/${path}${search}`;

  const KAKAO_KEY =
    process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || 'e30478df18a03cf2bafd4226d420d4ad';

  try {
    const res = await fetch(targetUrl, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_KEY}`,
        KA: 'sdk/4.5.29 os/javascript origin/http://localhost:3000',
        Referer: 'http://localhost:3000/',
      },
    });

    const data = await res.text();
    return new NextResponse(data, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    console.error('Kakao local proxy error:', err);
    return NextResponse.json({ error: 'Proxy request failed' }, { status: 500 });
  }
}
