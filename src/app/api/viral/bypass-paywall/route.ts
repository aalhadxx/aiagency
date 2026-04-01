import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

// ============================================================
// POST /api/viral/bypass-paywall - Bridge to Python paywall bypass
// ============================================================
export async function POST(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey || apiKey !== process.env.CONTENT_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid API key' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { url, method = 'all' } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    console.log(`🔓 Attempting paywall bypass for: ${url}`);

    // Path to Python bridge script
    const scriptPath = path.join(process.cwd(), 'scripts', 'viral_bridge.py');

    // Call Python bridge script
    const command = `python "${scriptPath}" --bypass-url "${url}" --method "${method}"`;
    
    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: 60000, // 60 second timeout
        maxBuffer: 1024 * 1024 * 5, // 5MB buffer
      });

      if (stderr) {
        console.warn('Python script stderr:', stderr);
      }

      // Parse Python output (should be JSON)
      try {
        const result = JSON.parse(stdout);
        return NextResponse.json(result);
      } catch {
        // If not JSON, return as text content
        return NextResponse.json({
          success: true,
          content: stdout,
          url,
          method: 'python_bridge',
        });
      }
    } catch (execError: any) {
      console.error('Python execution failed:', execError);
      
      // Fallback: return error but allow partial content
      return NextResponse.json({
        success: false,
        error: 'Paywall bypass failed - Python script error',
        details: execError.message,
        url,
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Paywall bypass endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// ============================================================
// GET /api/viral/bypass-paywall - Status check
// ============================================================
export async function GET() {
  return NextResponse.json({
    message: 'Paywall Bypass Bridge API',
    endpoint: 'POST /api/viral/bypass-paywall',
    authentication: 'Header: x-api-key',
    body: {
      url: 'https://example.com/paywalled-article',
      method: 'all', // 'all', 'scrapling', 'archive', 'removepaywalls', '12ft'
    },
    pythonScript: 'scripts/viral_bridge.py (wrapper for viral_engine.py)',
    requirements: [
      'Python 3.8+',
      'Scrapling library',
      'OpenRouter API key (for viral content generation)',
    ],
  });
}
