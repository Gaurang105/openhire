import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { LinkedInJobScraper } from '@/lib/job-scraper';
import { createOrGetUser, getUserApiKeys, trackApiUsage } from '@/lib/api-keys';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          message: 'Please sign in to search for jobs'
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

    const user = await createOrGetUser(userId, '');
    if (!user) {
      return NextResponse.json(
        { error: 'User setup failed' },
        { status: 500 }
      );
    }

    const apiKeys = await getUserApiKeys(user.id);
    const activeApiKey = apiKeys.find(key => key.is_active);

    if (!activeApiKey) {
      return NextResponse.json(
        { 
          error: 'No active API key found',
          message: 'Please create an API key in your account settings to use the job search feature'
        },
        { status: 403 }
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

    await trackApiUsage(activeApiKey.id, '/api/internal/search-jobs');

    console.log(`Starting internal job search: ${keywords} in ${location} (${jobCount} jobs) for user: ${user.email}`);
    const jobs = await scraper.scrapeJobs(keywords.trim(), location, jobCount);

    return NextResponse.json({
      success: true,
      jobs,
      searchParams: {
        keywords: keywords.trim(),
        location,
        numJobs: jobCount
      },
      totalFound: jobs.length
    });

  } catch (error: unknown) {
    console.error('Error in internal job search API:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to search for jobs',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    );
  }
} 