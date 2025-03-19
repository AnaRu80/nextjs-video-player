import { NextResponse } from 'next/server';

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const API_KEY = process.env.PEXELS_API_KEY;
	const API_URL = `https://api.pexels.com/videos/videos/${params.id}`;

	if (!API_KEY) {
		return NextResponse.json({ error: 'API Key not found' }, { status: 500 });
	}

	const response = await fetch(API_URL, {
		headers: { Authorization: API_KEY },
	});

	if (!response.ok) {
		console.error('❌ Error fetching video:', response.status);
		return NextResponse.json({ error: 'Video not found' }, { status: 404 });
	}

	const data = await response.json();

	return NextResponse.json(data);
}
