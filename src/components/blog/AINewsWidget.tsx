'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/scroll-reveal';

type NewsArticle = {
  title: string;
  url: string;
  category: string;
  source: string;
  publishedAt: string;
  body: string;
};

type NewsData = {
  updatedAt: string;
  totalArticles: number;
  articles: NewsArticle[];
};

const CATEGORY_MAP: Record<string, string> = {
  customer: 'Customer Support',
  marketing: 'Marketing',
  sales: 'Sales',
  operations: 'Operations',
  productivity: 'Productivity',
  finance: 'Finance',
  hr: 'HR',
};

export function AINewsWidget() {
  const [news, setNews] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = selectedCategory === 'all' ? '/api/news' : `/api/news?category=${selectedCategory}`;
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.error || !data.articles) {
          console.error('Invalid data:', data);
          setNews({ updatedAt: new Date().toISOString(), totalArticles: 0, articles: [] });
        } else {
          setNews(data);
        }
      } catch (err) {
        console.error('Failed to load news:', err);
        setNews({ updatedAt: new Date().toISOString(), totalArticles: 0, articles: [] });
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-1/3"></div>
          <div className="h-4 bg-white/10 rounded w-2/3"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!news || news.articles.length === 0) {
    return null;
  }

  return (
    <ScrollReveal>
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-oc-cream mb-2">
              Latest AI News
            </h2>
            <p className="text-sm text-oc-cream-muted">
              Live feed from 15+ sources · Updated {new Date(news.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-oc-cyan text-oc-bg'
                : 'bg-white/5 text-oc-cream-muted hover:bg-white/10'
            }`}
          >
            All
          </button>
          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-oc-cyan text-oc-bg'
                  : 'bg-white/5 text-oc-cream-muted hover:bg-white/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news.articles.slice(0, 12).map((article, i) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:border-oc-cyan/30 hover:shadow-[0_0_20px_-5px_rgba(0,255,204,0.15)]"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded-lg bg-oc-cyan/10 text-oc-cyan border border-oc-cyan/20">
                  {CATEGORY_MAP[article.category] || article.category}
                </span>
                <span className="text-xs text-oc-cream-muted">
                  {article.source}
                </span>
              </div>
              <h3 className="text-base font-semibold text-oc-cream mb-2 line-clamp-2 group-hover:text-oc-cyan transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-oc-cream-muted line-clamp-2 mb-3">
                {article.body}
              </p>
              <time className="text-xs text-oc-cream-muted">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-oc-cream-muted">
            {news.totalArticles} total articles from TechCrunch, VentureBeat, Hacker News, GitHub, and more
          </p>
        </div>
      </section>
    </ScrollReveal>
  );
}
