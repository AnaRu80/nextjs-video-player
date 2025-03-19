import { NextResponse } from 'next/server';

export async function GET() {
	const API_KEY = process.env.PEXELS_API_KEY;
	const API_URL = 'https://api.pexels.com/videos/popular?per_page=5';

	if (!API_KEY) {
		return NextResponse.json({ error: 'API Key not found' }, { status: 500 });
	}

	const response = await fetch(API_URL, {
		headers: { Authorization: API_KEY },
	});

	const data = await response.json();

	return NextResponse.json(data.videos);
}
