#!/usr/bin/env python3
"""
Viral Content Engine - API Bridge
Wrapper for viral_engine.py to support API calls from Next.js
Usage: python viral_bridge.py --bypass-url <url> --method <method>
"""

import argparse
import json
import sys
import subprocess
import os

# Path to the main viral_engine.py script
VIRAL_ENGINE_PATH = os.path.join(os.path.dirname(__file__), 'viral_engine.py')

def bypass_paywall(url: str, method: str = 'all'):
    """Bridge to viral_engine.py paywall bypass functions"""
    
    # Create a temporary Python script to execute the bypass
    temp_script = f'''
import sys
sys.path.insert(0, '{os.path.dirname(VIRAL_ENGINE_PATH)}')

from viral_engine import bypass_all_methods, bypass_paywall_advanced, bypass_via_archive, bypass_via_removepaywalls, bypass_via_12ft
import json

url = """{url}"""
method = """{method}"""

result = None
if method == 'all':
    result = bypass_all_methods(url)
elif method == 'scrapling':
    result = bypass_paywall_advanced(url, use_real_chrome=True, scroll=True, wait_time=5)
elif method == 'archive':
    result = bypass_via_archive(url)
elif method == 'removepaywalls':
    result = bypass_via_removepaywalls(url)
elif method == '12ft':
    result = bypass_via_12ft(url)
else:
    result = bypass_all_methods(url)

print(json.dumps(result))
'''
    
    try:
        # Execute the temp script
        result = subprocess.run(
            [sys.executable, '-c', temp_script],
            capture_output=True,
            text=True,
            timeout=120
        )
        
        if result.returncode != 0:
            return {
                'success': False,
                'error': 'Python execution failed',
                'stderr': result.stderr,
                'url': url,
            }
        
        # Parse the JSON output
        try:
            output = json.loads(result.stdout.strip().split('\n')[-1])
            return output
        except json.JSONDecodeError:
            # Return raw output if not valid JSON
            return {
                'success': True,
                'content': result.stdout,
                'url': url,
                'method': method,
            }
            
    except subprocess.TimeoutExpired:
        return {
            'success': False,
            'error': 'Timeout - paywall bypass took too long',
            'url': url,
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'url': url,
        }

def fetch_trending(source: str, limit: int = 5):
    """Fetch trending topics from a specific source"""
    
    temp_script = f'''
import sys
sys.path.insert(0, '{os.path.dirname(VIRAL_ENGINE_PATH)}')

from viral_engine import (
    fetch_hn_top, fetch_github_trending, fetch_dev_to,
    fetch_reddit, fetch_arxiv_ai, fetch_product_hunt,
    fetch_techcrunch, fetch_the_verge, fetch_google_trends,
    fetch_papers_with_code
)
import json

source = """{source}"""
limit = {limit}

fetchers = {{
    'hacker_news': fetch_hn_top,
    'github': fetch_github_trending,
    'dev_to': fetch_dev_to,
    'reddit': lambda l: fetch_reddit('technology', l),
    'arxiv': fetch_arxiv_ai,
    'product_hunt': fetch_product_hunt,
    'techcrunch': fetch_techcrunch,
    'the_verge': fetch_the_verge,
    'google_trends': fetch_google_trends,
    'papers_with_code': fetch_papers_with_code,
}}

if source in fetchers:
    result = fetchers[source](limit)
    print(json.dumps(result))
else:
    print(json.dumps({{"error": f"Unknown source: {{source}}"}}))
'''
    
    try:
        result = subprocess.run(
            [sys.executable, '-c', temp_script],
            capture_output=True,
            text=True,
            timeout=60
        )
        
        try:
            return json.loads(result.stdout.strip().split('\n')[-1])
        except:
            return {'error': 'Failed to parse response', 'raw': result.stdout}
            
    except Exception as e:
        return {'error': str(e)}

def generate_viral_post(title: str, url: str, source: str):
    """Generate viral post using OpenRouter"""
    
    temp_script = f'''
import sys
sys.path.insert(0, '{os.path.dirname(VIRAL_ENGINE_PATH)}')

from viral_engine import generate_viral_post
import json

title = """{title}"""
url = """{url}"""
source = """{source}"""

result = generate_viral_post(title, url, source)
print(json.dumps({{"post": result}}))
'''
    
    try:
        result = subprocess.run(
            [sys.executable, '-c', temp_script],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        try:
            return json.loads(result.stdout.strip().split('\n')[-1])
        except:
            return {'post': result.stdout}
            
    except Exception as e:
        return {'error': str(e)}

def main():
    parser = argparse.ArgumentParser(description='Viral Content Engine API Bridge')
    parser.add_argument('--bypass-url', help='URL to bypass paywall for')
    parser.add_argument('--method', default='all', 
                       choices=['all', 'scrapling', 'archive', 'removepaywalls', '12ft'],
                       help='Bypass method to use')
    parser.add_argument('--fetch-source', help='Fetch trending from source')
    parser.add_argument('--limit', type=int, default=5, help='Number of items to fetch')
    parser.add_argument('--generate-viral', action='store_true', help='Generate viral post')
    parser.add_argument('--title', help='Title for viral post generation')
    parser.add_argument('--source', help='Source for viral post generation')
    
    args = parser.parse_args()
    
    if args.bypass_url:
        result = bypass_paywall(args.bypass_url, args.method)
        print(json.dumps(result))
        
    elif args.fetch_source:
        result = fetch_trending(args.fetch_source, args.limit)
        print(json.dumps(result))
        
    elif args.generate_viral and args.title:
        result = generate_viral_post(args.title, args.bypass_url or '', args.source or 'unknown')
        print(json.dumps(result))
        
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == '__main__':
    main()
