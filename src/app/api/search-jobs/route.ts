import { NextRequest, NextResponse } from 'next/server';
import { LinkedInJobScraper } from '@/lib/job-scraper';
import { validateApiKey, trackApiUsage } from '@/lib/api-keys';

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'API key is required',
          message: 'Please provide your API key in the x-api-key header or Authorization header as Bearer token'
        },
        { status: 401 }
      );
    }

    const { isValid, user, apiKeyData } = await validateApiKey(apiKey);
    
    if (!isValid || !user || !apiKeyData) {
      return NextResponse.json(
        { 
          error: 'Invalid API key',
          message: 'The provided API key is invalid or has been deactivated'
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { keywords, location, numJobs } = body;

    if (!keywords || typeof keywords !== 'string' || !keywords.trim()) {
      return NextResponse.json(
        { error: 'Keywords are required' },
        { status: 400 }
      );
    }

    if (!location || typeof location !== 'string') {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    const jobCount = parseInt(numJobs) || 25;
    if (jobCount < 1 || jobCount > 250) {
      return NextResponse.json(
        { error: 'Number of jobs must be between 1 and 250' },
        { status: 400 }
      );
    }

    const scraper = new LinkedInJobScraper();
    const availableLocations = scraper.getAvailableLocations();
    
    if (!availableLocations.includes(location)) {
      return NextResponse.json(
        { 
          error: 'Invalid location', 
          availableLocations 
        },
        { status: 400 }
      );
    }

    await trackApiUsage(apiKeyData.id, '/api/search-jobs');

    console.log(`Starting job search: ${keywords} in ${location} (${jobCount} jobs) for user: ${user.email}`);
    const jobs = await scraper.scrapeJobs(keywords.trim(), location, jobCount);

    return NextResponse.json({
      success: true,
      jobs,
      searchParams: {
        keywords: keywords.trim(),
        location,
        numJobs: jobCount
      },
      totalFound: jobs.length,
      user: {
        email: user.email
      }
    });

  } catch (error: unknown) {
    console.error('Error in job search API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to search for jobs',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const scraper = new LinkedInJobScraper();
  const availableLocations = scraper.getAvailableLocations();

  return NextResponse.json({
    message: 'Job search API endpoint',
    method: 'POST',
    authentication: {
      required: true,
      method: 'API Key',
      header: 'x-api-key or Authorization: Bearer <api-key>'
    },
    availableLocations,
    parameters: {
      keywords: 'string (required) - Job search keywords',
      location: 'string (required) - Location from available list',
      numJobs: 'number (optional) - Number of jobs to return (1-250, default: 25)'
    },
    example: {
      keywords: 'Software Developer',
      location: 'Bengaluru',
      numJobs: 25
    }
  });
} 