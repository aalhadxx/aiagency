/**
 * Viral Content Engine Integration
 * Fetches trending tech topics and generates blog post ideas
 * Bridges with Python viral_engine.py for paywall bypass
 */

export type TrendingSource = 
  | 'hacker_news' 
  | 'github' 
  | 'dev_to' 
  | 'reddit' 
  | 'product_hunt' 
  | 'arxiv' 
  | 'techcrunch'
  | 'the_verge';

export interface TrendingItem {
  title: string;
  url: string;
  score: number;
  source: TrendingSource;
  excerpt?: string;
}

export interface ViralContentIdea {
  topic: string;
  keywords: string[];
  targetAudience: string;
  contentType: 'tutorial' | 'analysis' | 'case-study' | 'comparison' | 'listicle';
  angle: string;
  trendingSource: TrendingSource;
  originalUrl: string;
  viralHook: string;
}

// ============================================================
// MODULE 1: Tech News Fetchers (TypeScript port)
// ============================================================

export async function fetchHackerNews(limit = 5): Promise<TrendingItem[]> {
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const storyIds = await response.json();
    
    const stories = await Promise.all(
      storyIds.slice(0, limit).map(async (id: number) => {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const story = await res.json();
        return {
          title: story?.title || 'Untitled',
          url: story?.url || `https://news.ycombinator.com/item?id=${id}`,
          score: story?.score || 0,
          source: 'hacker_news' as TrendingSource,
        };
      })
    );
    return stories;
  } catch (error) {
    console.error('Hacker News fetch failed:', error);
    return [];
  }
}

export async function fetchGitHubTrending(limit = 5): Promise<TrendingItem[]> {
  try {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const dateStr = date.toISOString().split('T')[0];
    
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>${dateStr}&sort=stars&order=desc`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'viral-content-engine'
        }
      }
    );
    const data = await response.json();
    
    return (data.items || []).slice(0, limit).map((repo: any) => ({
      title: `${repo.full_name}: ${repo.description || 'No description'}`,
      url: repo.html_url,
      score: repo.stargazers_count,
      source: 'github' as TrendingSource,
    }));
  } catch (error) {
    console.error('GitHub fetch failed:', error);
    return [];
  }
}

export async function fetchDevTo(limit = 5): Promise<TrendingItem[]> {
  try {
    const response = await fetch('https://dev.to/api/articles?top=1&per_page=' + limit);
    const articles = await response.json();
    
    return articles.map((article: any) => ({
      title: article.title,
      url: article.url,
      score: article.public_reactions_count || 0,
      source: 'dev_to' as TrendingSource,
    }));
  } catch (error) {
    console.error('Dev.to fetch failed:', error);
    return [];
  }
}

export async function fetchReddit(subreddit = 'technology', limit = 5): Promise<TrendingItem[]> {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      }
    );
    const data = await response.json();
    
    return data.data.children.map((post: any) => ({
      title: post.data.title,
      url: `https://reddit.com${post.data.permalink}`,
      score: post.data.score,
      source: 'reddit' as TrendingSource,
    }));
  } catch (error) {
    console.error('Reddit fetch failed:', error);
    return [];
  }
}

export async function fetchProductHunt(limit = 5): Promise<TrendingItem[]> {
  try {
    // Product Hunt requires authentication - fallback to web scraping via Python bridge
    const response = await fetch('/api/viral/fetch-source?source=product_hunt&limit=' + limit);
    if (!response.ok) throw new Error('Product Hunt fetch failed');
    return await response.json();
  } catch (error) {
    console.error('Product Hunt fetch failed:', error);
    return [];
  }
}

export async function fetchArxivAI(limit = 5): Promise<TrendingItem[]> {
  try {
    const response = await fetch(
      'http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=' + limit
    );
    const xmlText = await response.text();
    
    // Simple XML parsing
    const entries = xmlText.split('<entry>').slice(1);
    return entries.map((entry: string) => {
      const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
      const idMatch = entry.match(/<id>([^<]+)<\/id>/);
      return {
        title: `arXiv: ${titleMatch ? titleMatch[1].trim() : 'Unknown'}`,
        url: idMatch ? idMatch[1] : '',
        score: 0,
        source: 'arxiv' as TrendingSource,
      };
    }).filter(item => item.url);
  } catch (error) {
    console.error('arXiv fetch failed:', error);
    return [];
  }
}

// ============================================================
// MODULE 2: Aggregate All Sources
// ============================================================

export async function fetchAllTrending(
  sources: TrendingSource[] = ['hacker_news', 'github', 'dev_to', 'reddit', 'arxiv'],
  limitPerSource = 5
): Promise<TrendingItem[]> {
  const fetchers: Record<TrendingSource, () => Promise<TrendingItem[]>> = {
    hacker_news: () => fetchHackerNews(limitPerSource),
    github: () => fetchGitHubTrending(limitPerSource),
    dev_to: () => fetchDevTo(limitPerSource),
    reddit: () => fetchReddit('technology', limitPerSource),
    arxiv: () => fetchArxivAI(limitPerSource),
    product_hunt: () => fetchProductHunt(limitPerSource),
    techcrunch: async () => [], // Requires Python bridge for scraping
    the_verge: async () => [], // Requires Python bridge for scraping
  };

  const results = await Promise.all(
    sources.map(async (source) => {
      try {
        const items = await fetchers[source]();
        return items.map(item => ({ ...item, source }));
      } catch (error) {
        console.error(`Failed to fetch from ${source}:`, error);
        return [];
      }
    })
  );

  return results.flat().sort((a, b) => b.score - a.score);
}

// ============================================================
// MODULE 3: Generate Viral Content Ideas
// ============================================================

export function generateContentIdea(item: TrendingItem): ViralContentIdea {
  // Determine best content type based on source and title
  const title = item.title.toLowerCase();
  let contentType: ViralContentIdea['contentType'] = 'analysis';
  
  if (title.includes('how to') || title.includes('guide') || title.includes('tutorial')) {
    contentType = 'tutorial';
  } else if (title.includes('vs') || title.includes('comparison') || title.includes('alternative')) {
    contentType = 'comparison';
  } else if (title.includes('case study') || title.includes('how') && title.includes('saved') || title.includes('increased')) {
    contentType = 'case-study';
  } else if (title.includes('top') || title.includes('best') || title.includes('list')) {
    contentType = 'listicle';
  }

  // Generate keywords from title
  const keywords = title
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .filter(w => w.length > 3 && !['with', 'from', 'this', 'that', 'your', '2024', '2025', '2026'].includes(w))
    .slice(0, 5);

  // Generate viral hook based on content type
  const hooks: Record<ViralContentIdea['contentType'], string> = {
    tutorial: `What ${keywords[0] || 'tech teams'} don't tell you about ${keywords.slice(1, 3).join(' ')}`,
    analysis: `The real reason behind the ${keywords[0] || 'trend'} everyone's talking about`,
    'case-study': `How ${keywords[0] || 'one company'} achieved ${keywords[1] || 'massive results'} with ${keywords[2] || 'AI'}`,
    comparison: `${keywords[0] || 'Option A'} vs ${keywords[1] || 'Option B'}: What actually works in 2026`,
    listicle: `5 ${keywords[0] || 'things'} that will change how you think about ${keywords[1] || 'AI'}`,
  };

  return {
    topic: item.title,
    keywords: keywords.length > 0 ? keywords : ['AI', 'tech', '2026'],
    targetAudience: determineAudience(item.source, title),
    contentType,
    angle: hooks[contentType],
    trendingSource: item.source,
    originalUrl: item.url,
    viralHook: hooks[contentType],
  };
}

function determineAudience(source: TrendingSource, title: string): string {
  if (source === 'github' || title.includes('code') || title.includes('developer')) {
    return 'software engineers and technical leads';
  }
  if (source === 'arxiv' || title.includes('research') || title.includes('paper')) {
    return 'AI researchers and data scientists';
  }
  if (source === 'product_hunt' || title.includes('startup') || title.includes('launch')) {
    return 'startup founders and product managers';
  }
  return 'tech professionals and CTOs';
}

// ============================================================
// MODULE 4: Integration with Content Generator
// ============================================================

export async function getViralContentIdeas(
  count = 5,
  sources?: TrendingSource[]
): Promise<ViralContentIdea[]> {
  const trending = await fetchAllTrending(sources, count * 2);
  const ideas = trending.map(generateContentIdea);
  
  // Return top ideas by uniqueness (simple deduplication)
  const seen = new Set<string>();
  return ideas.filter(idea => {
    const key = idea.topic.toLowerCase().slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, count);
}

export async function generateBlogPostFromTrending(
  idea: ViralContentIdea,
  generateContentFn: (request: {
    topic: string;
    keywords: string[];
    targetAudience: string;
    contentType: ViralContentIdea['contentType'];
  }) => Promise<any>
): Promise<any> {
  return generateContentFn({
    topic: `${idea.viralHook}: ${idea.topic}`,
    keywords: idea.keywords,
    targetAudience: idea.targetAudience,
    contentType: idea.contentType,
  });
}

// ============================================================
// MODULE 5: Python Bridge (for paywall bypass and advanced scraping)
// ============================================================

export interface PaywallBypassResult {
  title: string;
  content: string;
  url: string;
  success: boolean;
  method?: string;
}

export async function bypassPaywall(url: string): Promise<PaywallBypassResult> {
  // Calls Python viral_engine.py via API endpoint
  try {
    const response = await fetch('/api/viral/bypass-paywall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    
    if (!response.ok) throw new Error('Paywall bypass failed');
    return await response.json();
  } catch (error) {
    console.error('Paywall bypass error:', error);
    return {
      title: '',
      content: '',
      url,
      success: false,
      method: 'failed',
    };
  }
}
