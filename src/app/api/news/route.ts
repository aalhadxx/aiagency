import { NextResponse } from 'next/server';

// In production, this would fetch from your deployed news scraper
// For now, we'll use a placeholder or local file
const NEWS_API_URL = process.env.NEWS_API_URL || 'http://localhost:3003/api/news';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const url = category ? `${NEWS_API_URL}?category=${category}` : NEWS_API_URL;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', articles: [] },
      { status: 500 }
    );
  }
}
