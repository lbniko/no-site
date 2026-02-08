import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text, target_language } = await req.json();

  const tRes = await fetch('https://translateapi.ai/api/v1/translate/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.TRANSLATE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, target_language })
  });

  const data = await tRes.json();
  return NextResponse.json(data);
}