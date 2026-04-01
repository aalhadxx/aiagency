import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || process.env.VERCEL_REVALIDATE_TOKEN;

/**
 * GET /api/revalidate?secret=XXX&slug=post-slug
 * Manual or scraper-triggered revalidation
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (!REVALIDATE_SECRET || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }
    revalidatePath('/blog');

    return NextResponse.json({
      success: true,
      revalidated: slug ? [`/blog/${slug}`, '/blog'] : ['/blog'],
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Revalidation failed', details: error.message }, { status: 500 });
  }
}

/**
 * POST /api/revalidate
 * PocketBase webhook - called after scraper publishes a new post
 * Body: { secret: string, slug?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, slug } = body;

    if (!REVALIDATE_SECRET || secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }
    revalidatePath('/blog');

    return NextResponse.json({
      success: true,
      revalidated: slug ? [`/blog/${slug}`, '/blog'] : ['/blog'],
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Revalidation failed', details: error.message }, { status: 500 });
  }
}
