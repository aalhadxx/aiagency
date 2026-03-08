import { NextResponse } from 'next/server';

// GitHub Pages static JSON (updated every 6 hours by GitHub Actions)
const NEWS_API_URL = process.env.NEWS_API_URL || 'https://aispiringcoder4302.github.io/ai-news-scraper/news.json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const response = await fetch(NEWS_API_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    let data = await response.json();
    
    // Filter by category if provided
    if (category && category !== 'all') {
      data = {
        ...data,
        articles: data.articles.filter((a: any) => a.category === category),
        totalArticles: data.articles.filter((a: any) => a.category === category).length
      };
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', articles: [], totalArticles: 0 },
      { status: 500 }
    );
  }
}
