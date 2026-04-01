# Standalone Content Scraper Guide

Build a separate Python scraper that runs on your VPS and feeds content to PocketBase.

---

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Python Scraper │────▶│  Your VPS        │────▶│  Vercel         │
│  (Trending API)  │     │  (PocketBase)    │     │  (Next.js)      │
│                  │     │  + Scraper       │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

---

## Project Structure

```
content-scraper/
├── scraper/
│   ├── __init__.py
│   ├── fetchers/
│   │   ├── __init__.py
│   │   ├── hackernews.py
│   │   ├── github.py
│   │   ├── reddit.py
│   │   └── devto.py
│   ├── ai_generator.py
│   ├── pocketbase_client.py
│   └── config.py
├── main.py
├── requirements.txt
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Step 1: Core Files

### `requirements.txt`

```
requests>=2.31.0
pocketbase>=0.9.0
openai>=1.0.0
anthropic>=0.8.0
python-dotenv>=1.0.0
schedule>=1.2.0
loguru>=0.7.0
```

### `.env.example`

```env
# PocketBase
POCKETBASE_URL=http://localhost:8090
POCKETBASE_ADMIN_EMAIL=admin@example.com
POCKETBASE_ADMIN_PASSWORD=your-password

# AI Provider (choose one)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...

# Scraper Config
SCRAPER_INTERVAL_HOURS=6
MAX_POSTS_PER_DAY=4
CONTENT_TYPES=tutorial,analysis,case-study
TARGET_AUDIENCE=CTOs and technical leaders

# Rate Limiting
REQUESTS_PER_MINUTE=30
```

### `scraper/config.py`

```python
import os
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass
class Config:
    # PocketBase
    pocketbase_url: str = os.getenv('POCKETBASE_URL', 'http://localhost:8090')
    pb_email: str = os.getenv('POCKETBASE_ADMIN_EMAIL', '')
    pb_password: str = os.getenv('POCKETBASE_ADMIN_PASSWORD', '')
    
    # AI
    openai_key: str = os.getenv('OPENAI_API_KEY', '')
    anthropic_key: str = os.getenv('ANTHROPIC_API_KEY', '')
    google_key: str = os.getenv('GOOGLE_API_KEY', '')
    
    # Scraper
    interval_hours: int = int(os.getenv('SCRAPER_INTERVAL_HOURS', '6'))
    max_posts_per_day: int = int(os.getenv('MAX_POSTS_PER_DAY', '4'))
    content_types: list = None
    target_audience: str = os.getenv('TARGET_AUDIENCE', 'technical leaders')
    
    def __post_init__(self):
        if self.content_types is None:
            types = os.getenv('CONTENT_TYPES', 'tutorial,analysis')
            self.content_types = [t.strip() for t in types.split(',')]

CONFIG = Config()
```

### `scraper/pocketbase_client.py`

```python
from pocketbase import PocketBase
from pocketbase.errors import ClientResponseError
from loguru import logger
from .config import CONFIG

class PocketBaseClient:
    def __init__(self):
        self.client = PocketBase(CONFIG.pocketbase_url)
        self._authenticated = False
    
    def authenticate(self):
        try:
            self.client.admins.auth_with_password(
                CONFIG.pb_email, 
                CONFIG.pb_password
            )
            self._authenticated = True
            logger.info("✓ Authenticated with PocketBase")
        except Exception as e:
            logger.error(f"Authentication failed: {e}")
            raise
    
    def create_post(self, post_data: dict) -> dict:
        if not self._authenticated:
            self.authenticate()
        
        try:
            record = self.client.collection('posts').create(post_data)
            logger.info(f"✓ Created post: {record.id}")
            return record
        except ClientResponseError as e:
            logger.error(f"Failed to create post: {e}")
            raise
    
    def get_post_by_slug(self, slug: str) -> dict | None:
        if not self._authenticated:
            self.authenticate()
        
        try:
            records = self.client.collection('posts').get_list(
                1, 1, {'filter': f'slug="{slug}"'}
            )
            return records.items[0] if records.items else None
        except Exception:
            return None
    
    def slug_exists(self, slug: str) -> bool:
        return self.get_post_by_slug(slug) is not None
```

---

## Step 2: Content Fetchers

### `scraper/fetchers/hackernews.py`

```python
import requests
from loguru import logger
from typing import List, Dict

class HackerNewsFetcher:
    BASE_URL = "https://hacker-news.firebaseio.com/v0"
    
    def fetch_trending(self, limit: int = 10) -> List[Dict]:
        logger.info("Fetching Hacker News trending...")
        
        try:
            # Get top story IDs
            response = requests.get(
                f"{self.BASE_URL}/topstories.json",
                timeout=10
            )
            story_ids = response.json()[:limit]
            
            # Fetch story details
            stories = []
            for story_id in story_ids:
                try:
                    story = requests.get(
                        f"{self.BASE_URL}/item/{story_id}.json",
                        timeout=5
                    ).json()
                    
                    if story and story.get('title'):
                        stories.append({
                            'title': story['title'],
                            'url': story.get('url', f"https://news.ycombinator.com/item?id={story_id}"),
                            'score': story.get('score', 0),
                            'source': 'hackernews'
                        })
                except Exception as e:
                    logger.warning(f"Failed to fetch story {story_id}: {e}")
                    continue
            
            logger.info(f"✓ Fetched {len(stories)} HN stories")
            return stories
            
        except Exception as e:
            logger.error(f"Hacker News fetch failed: {e}")
            return []
```

### `scraper/fetchers/github.py`

```python
import requests
from loguru import logger
from typing import List, Dict

class GitHubFetcher:
    def fetch_trending(self, limit: int = 10) -> List[Dict]:
        logger.info("Fetching GitHub trending...")
        
        try:
            # GitHub trending doesn't have official API, use GitHub search
            # Trending = most starred today
            response = requests.get(
                "https://api.github.com/search/repositories",
                params={
                    'q': 'created:>2024-01-01',  # Recent repos
                    'sort': 'stars',
                    'order': 'desc',
                    'per_page': limit
                },
                headers={'Accept': 'application/vnd.github.v3+json'},
                timeout=15
            )
            
            data = response.json()
            repos = []
            
            for repo in data.get('items', []):
                repos.append({
                    'title': f"{repo['full_name']}: {repo['description'] or 'No description'}",
                    'url': repo['html_url'],
                    'score': repo['stargazers_count'],
                    'source': 'github'
                })
            
            logger.info(f"✓ Fetched {len(repos)} GitHub repos")
            return repos
            
        except Exception as e:
            logger.error(f"GitHub fetch failed: {e}")
            return []
```

### `scraper/fetchers/reddit.py`

```python
import requests
from loguru import logger
from typing import List, Dict

class RedditFetcher:
    BASE_URL = "https://www.reddit.com/r/technology/hot.json"
    
    def fetch_trending(self, limit: int = 10) -> List[Dict]:
        logger.info("Fetching Reddit r/technology...")
        
        try:
            response = requests.get(
                self.BASE_URL,
                params={'limit': limit},
                headers={'User-Agent': 'ContentScraperBot/1.0'},
                timeout=10
            )
            
            data = response.json()
            posts = []
            
            for child in data.get('data', {}).get('children', []):
                post = child['data']
                posts.append({
                    'title': post['title'],
                    'url': f"https://reddit.com{post['permalink']}",
                    'score': post['score'],
                    'source': 'reddit'
                })
            
            logger.info(f"✓ Fetched {len(posts)} Reddit posts")
            return posts
            
        except Exception as e:
            logger.error(f"Reddit fetch failed: {e}")
            return []
```

### `scraper/fetchers/devto.py`

```python
import requests
from loguru import logger
from typing import List, Dict

class DevToFetcher:
    BASE_URL = "https://dev.to/api/articles"
    
    def fetch_trending(self, limit: int = 10) -> List[Dict]:
        logger.info("Fetching Dev.to trending...")
        
        try:
            response = requests.get(
                self.BASE_URL,
                params={'top': 1, 'per_page': limit},
                timeout=10
            )
            
            articles = response.json()
            posts = []
            
            for article in articles:
                posts.append({
                    'title': article['title'],
                    'url': article['url'],
                    'score': article.get('positive_reactions_count', 0),
                    'source': 'devto'
                })
            
            logger.info(f"✓ Fetched {len(posts)} Dev.to articles")
            return posts
            
        except Exception as e:
            logger.error(f"Dev.to fetch failed: {e}")
            return []
```

---

## Step 3: AI Content Generator

### `scraper/ai_generator.py`

```python
import os
import re
from typing import Dict, List
from loguru import logger

class AIGenerator:
    def __init__(self):
        self.provider = self._detect_provider()
    
    def _detect_provider(self) -> str:
        if os.getenv('ANTHROPIC_API_KEY'):
            return 'anthropic'
        elif os.getenv('OPENAI_API_KEY'):
            return 'openai'
        elif os.getenv('GOOGLE_API_KEY'):
            return 'google'
        else:
            raise ValueError("No AI provider configured")
    
    def generate_content(self, topic: str, keywords: List[str], 
                        content_type: str, target_audience: str) -> Dict:
        logger.info(f"Generating {content_type} about: {topic}")
        
        prompts = {
            'tutorial': self._tutorial_prompt,
            'analysis': self._analysis_prompt,
            'case-study': self._casestudy_prompt,
            'comparison': self._comparison_prompt,
            'listicle': self._listicle_prompt,
        }
        
        prompt_fn = prompts.get(content_type, self._tutorial_prompt)
        prompt = prompt_fn(topic, keywords, target_audience)
        
        content = self._call_ai(prompt)
        
        # Extract title and excerpt
        title = self._extract_title(content) or topic
        excerpt = self._extract_excerpt(content)
        
        return {
            'title': title,
            'content': content,
            'excerpt': excerpt,
            'keywords': keywords,
            'tags': keywords[:3] + ['AI', 'Automation']
        }
    
    def _call_ai(self, prompt: str) -> str:
        if self.provider == 'anthropic':
            return self._call_anthropic(prompt)
        elif self.provider == 'openai':
            return self._call_openai(prompt)
        else:
            return self._call_google(prompt)
    
    def _call_anthropic(self, prompt: str) -> str:
        import anthropic
        client = anthropic.Anthropic()
        
        response = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
    
    def _call_openai(self, prompt: str) -> str:
        from openai import OpenAI
        client = OpenAI()
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=2000
        )
        return response.choices[0].message.content
    
    def _call_google(self, prompt: str) -> str:
        import google.generativeai as genai
        genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
        
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        return response.text
    
    def _tutorial_prompt(self, topic, keywords, audience):
        return f"""Write a comprehensive tutorial about "{topic}".
Target audience: {audience}
Keywords to include: {', '.join(keywords)}

Structure:
1. Introduction with problem statement
2. Prerequisites
3. Step-by-step implementation
4. Best practices
5. Common pitfalls
6. Conclusion

Use markdown formatting. Be specific and actionable."""
    
    def _analysis_prompt(self, topic, keywords, audience):
        return f"""Write an in-depth analysis of "{topic}".
Target audience: {audience}
Keywords: {', '.join(keywords)}

Structure:
1. Current state overview
2. Key trends and data
3. Technical implications
4. Business impact
5. Future outlook
6. Actionable recommendations

Use markdown. Include specific examples."""
    
    def _casestudy_prompt(self, topic, keywords, audience):
        return f"""Write a case study about "{topic}".
Target audience: {audience}
Keywords: {', '.join(keywords)}

Structure:
1. Company/Project background
2. Challenge faced
3. Solution implemented
4. Results (with metrics)
5. Lessons learned
6. Applicability to other contexts"""
    
    def _comparison_prompt(self, topic, keywords, audience):
        return f"""Write a comparison article about "{topic}".
Target audience: {audience}
Keywords: {', '.join(keywords)}

Structure:
1. Overview of options
2. Detailed comparison matrix
3. Use case recommendations
4. Performance considerations
5. Cost analysis
6. Final verdict"""
    
    def _listicle_prompt(self, topic, keywords, audience):
        return f"""Write a listicle about "{topic}".
Target audience: {audience}
Keywords: {', '.join(keywords)}

Structure:
1. Introduction to the topic
2. 5-7 numbered items with detailed explanations
3. Practical implementation tips
4. Common mistakes to avoid
5. Summary and next steps"""
    
    def _extract_title(self, content: str) -> str:
        match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        return match.group(1) if match else None
    
    def _extract_excerpt(self, content: str) -> str:
        # Get first paragraph after title
        lines = content.split('\n')
        for line in lines[1:]:
            line = line.strip()
            if line and not line.startswith('#'):
                return line[:160] + '...' if len(line) > 160 else line
        return ""
```

---

## Step 4: Main Scraper

### `main.py`

```python
#!/usr/bin/env python3
import time
import random
import re
from datetime import datetime, timedelta
from loguru import logger
import schedule

from scraper.config import CONFIG
from scraper.pocketbase_client import PocketBaseClient
from scraper.ai_generator import AIGenerator
from scraper.fetchers.hackernews import HackerNewsFetcher
from scraper.fetchers.github import GitHubFetcher
from scraper.fetchers.reddit import RedditFetcher
from scraper.fetchers.devto import DevToFetcher

class ContentScraper:
    def __init__(self):
        self.pb = PocketBaseClient()
        self.ai = AIGenerator()
        self.fetchers = [
            HackerNewsFetcher(),
            GitHubFetcher(),
            RedditFetcher(),
            DevToFetcher(),
        ]
        self.daily_count = 0
        self.last_reset = datetime.now()
    
    def generate_slug(self, title: str) -> str:
        slug = re.sub(r'[^a-z0-9\s-]', '', title.lower())
        slug = re.sub(r'\s+', '-', slug)
        slug = re.sub(r'-+', '-', slug)
        return slug[:100]
    
    def check_rate_limit(self) -> bool:
        # Reset daily count
        if datetime.now() - self.last_reset > timedelta(days=1):
            self.daily_count = 0
            self.last_reset = datetime.now()
        
        return self.daily_count < CONFIG.max_posts_per_day
    
    def process_trending_item(self, item: dict) -> bool:
        if not self.check_rate_limit():
            logger.info("Daily post limit reached, skipping")
            return False
        
        topic = item['title']
        
        # Generate unique slug
        slug = self.generate_slug(topic)
        if self.pb.slug_exists(slug):
            logger.info(f"Post already exists: {slug}")
            return False
        
        # Generate keywords from title
        keywords = self._extract_keywords(topic)
        
        # Pick content type
        content_type = random.choice(CONFIG.content_types)
        
        try:
            # Generate content with AI
            generated = self.ai.generate_content(
                topic=topic,
                keywords=keywords,
                content_type=content_type,
                target_audience=CONFIG.target_audience
            )
            
            # Create post in PocketBase
            post_data = {
                'title': generated['title'],
                'slug': slug,
                'content': generated['content'],
                'excerpt': generated['excerpt'],
                'status': 'published',
                'published_at': datetime.now().isoformat(),
                'author': 'AI Content Bot',
                'tags': generated['tags'],
                'keywords': generated['keywords'],
                'meta_title': generated['title'],
                'meta_description': generated['excerpt'][:160],
                'featured': False,
                'source_url': item.get('url', ''),
                'viral_hook': item.get('title', ''),
                'trending_source': item.get('source', 'unknown'),
            }
            
            self.pb.create_post(post_data)
            self.daily_count += 1
            
            logger.success(f"✓ Published: {generated['title']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to process item: {e}")
            return False
    
    def _extract_keywords(self, title: str) -> list:
        # Simple keyword extraction
        words = re.findall(r'\b[A-Za-z]{4,}\b', title)
        # Filter common words
        stop_words = {'with', 'from', 'this', 'that', 'your', 'will', 'have', 'more'}
        keywords = [w for w in words if w.lower() not in stop_words]
        return keywords[:5] if keywords else ['AI', 'technology']
    
    def run(self):
        logger.info("🚀 Starting content scraper run")
        
        # Fetch all trending
        all_trending = []
        for fetcher in self.fetchers:
            try:
                items = fetcher.fetch_trending(limit=5)
                all_trending.extend(items)
                time.sleep(1)  # Rate limiting
            except Exception as e:
                logger.error(f"Fetcher failed: {e}")
        
        # Sort by score
        all_trending.sort(key=lambda x: x.get('score', 0), reverse=True)
        
        # Process top items
        processed = 0
        for item in all_trending[:5]:
            if self.process_trending_item(item):
                processed += 1
                time.sleep(2)  # Rate limit AI calls
        
        logger.info(f"✓ Run complete: {processed} posts published")
    
    def schedule_run(self):
        logger.info(f"⏰ Scheduling runs every {CONFIG.interval_hours} hours")
        
        # Run immediately on start
        self.run()
        
        # Schedule future runs
        schedule.every(CONFIG.interval_hours).hours.do(self.run)
        
        while True:
            schedule.run_pending()
            time.sleep(60)

def main():
    scraper = ContentScraper()
    scraper.schedule_run()

if __name__ == "__main__":
    main()
```

---

## Step 5: Deployment

### `Dockerfile`

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy code
COPY . .

# Run
CMD ["python", "main.py"]
```

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  scraper:
    build: .
    container_name: content-scraper
    restart: unless-stopped
    environment:
      - POCKETBASE_URL=http://pocketbase:8090
      - POCKETBASE_ADMIN_EMAIL=${POCKETBASE_ADMIN_EMAIL}
      - POCKETBASE_ADMIN_PASSWORD=${POCKETBASE_ADMIN_PASSWORD}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - SCRAPER_INTERVAL_HOURS=6
      - MAX_POSTS_PER_DAY=4
    networks:
      - scraper-network
    depends_on:
      - pocketbase

  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    container_name: pocketbase
    restart: unless-stopped
    ports:
      - "8090:8090"
    volumes:
      - ./pb_data:/pb/pb_data
    networks:
      - scraper-network

networks:
  scraper-network:
    driver: bridge
```

---

## Step 6: Run on Your VPS

```bash
# 1. SSH to VPS
ssh user@your-vps-ip

# 2. Create directory
mkdir -p ~/content-scraper && cd ~/content-scraper

# 3. Copy all files above
# (Use SCP or create files manually)

# 4. Create .env file
cat > .env << 'EOF'
POCKETBASE_URL=http://localhost:8090
POCKETBASE_ADMIN_EMAIL=admin@example.com
POCKETBASE_ADMIN_PASSWORD=your-password
ANTHROPIC_API_KEY=sk-ant-...
SCRAPER_INTERVAL_HOURS=6
MAX_POSTS_PER_DAY=4
EOF

# 5. Start everything
docker-compose up -d

# 6. Check logs
docker-compose logs -f scraper
```

---

## Features

- ✅ Multi-source trending (HN, GitHub, Reddit, Dev.to)
- ✅ AI content generation (Anthropic/OpenAI/Google)
- ✅ Auto-publishes to PocketBase
- ✅ Rate limiting (respects daily limits)
- ✅ Duplicate detection
- ✅ Scheduled runs
- ✅ Docker deployment
- ✅ Logging with loguru

---

## Customization

**Add new fetcher:**
```python
# scraper/fetchers/producthunt.py
class ProductHuntFetcher:
    def fetch_trending(self, limit=10):
        # Your implementation
        pass
```

**Change AI provider:**
Set `OPENAI_API_KEY` instead of `ANTHROPIC_API_KEY` - auto-detected.

**Adjust frequency:**
Edit `SCRAPER_INTERVAL_HOURS` in `.env`

---

Send this as a zip or push to a new repo. Your VPS will auto-generate content 24/7.
