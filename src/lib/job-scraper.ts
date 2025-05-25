import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

export interface JobData {
  title: string;
  company: string;
  location: string;
  postedDate: string;
  url: string;
  status: string;
}

export interface LocationData {
  urlParam: string;
  geoId: string;
}

export class LinkedInJobScraper {
  private baseUrl: string;
  private client: AxiosInstance;
  public locations: Record<string, LocationData>;

  constructor() {
    this.baseUrl = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search";
    this.client = axios.create({
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      timeout: 10000
    });
    
    this.locations = {
      "Bengaluru": {
        urlParam: "Bengaluru%2C%2BKarnataka%2C%2BIndia",
        geoId: "105214831"
      },
      "New Delhi": {
        urlParam: "New%2BDelhi",
        geoId: "115918471"
      },
      "Chennai": {
        urlParam: "Chennai%2C%2BTamil%2BNadu%2C%2BIndia",
        geoId: "106888327"
      },
      "Pune": {
        urlParam: "Pune%2C%2BMaharashtra%2C%2BIndia",
        geoId: "114806696"
      },
      "Hyderabad": {
        urlParam: "Hyderabad%2C%2BTelangana%2C%2BIndia",
        geoId: "105556991"
      },
      "Mumbai": {
        urlParam: "Mumbai%2C%2BMaharashtra%2C%2BIndia",
        geoId: "106164952"
      },
      "Gurugram": {
        urlParam: "Gurugram%2C%2BHaryana%2C%2BIndia",
        geoId: "115884833"
      }
    };
  }

  buildUrl(keywords: string, location: string, start: number = 0): string {
    const encodedKeywords = encodeURIComponent(keywords);
    
    const locationData = this.locations[location];
    if (!locationData) {
      throw new Error(`Location "${location}" not found`);
    }
    
    const locationParam = locationData.urlParam;
    const geoId = locationData.geoId;
    const url = `${this.baseUrl}?keywords=${encodedKeywords}&location=${locationParam}&geoId=${geoId}&trk=public_jobs_jobs-search-bar_search-submit&start=${start}`;
    
    return url;
  }

  extractJobData(jobElement: cheerio.Element, $: cheerio.Root): JobData | null {
    try {
      const jobData: Partial<JobData> = {};
      
      const titleElement = $(jobElement).find('h3.base-search-card__title');
      jobData.title = titleElement.text().trim() || "N/A";
      
      const companyElement = $(jobElement).find('h4.base-search-card__subtitle');
      const companyLink = companyElement.find('a');
      jobData.company = companyLink.length ? companyLink.text().trim() : "N/A";
      
      const locationElement = $(jobElement).find('span.job-search-card__location');
      jobData.location = locationElement.text().trim() || "N/A";
      
      const timeElement = $(jobElement).find('time.job-search-card__listdate');
      jobData.postedDate = timeElement.text().trim() || "N/A";
      
      const linkElement = $(jobElement).find('a.base-card__full-link');
      jobData.url = linkElement.attr('href') || "N/A";
      
      const benefitsElement = $(jobElement).find('span.job-posting-benefits__text');
      jobData.status = benefitsElement.text().trim() || "N/A";
      
      return jobData as JobData;
      
    } catch (error) {
      console.log(`Error extracting job data: ${error}`);
      return null;
    }
  }

  async scrapeJobsPage(url: string): Promise<JobData[]> {
    try {
      console.log(`Fetching: ${url}`);
      const response = await this.client.get(url);
      
      const $ = cheerio.load(response.data);
      
      const jobElements = $('li');
      
      const jobs: JobData[] = [];
      jobElements.each((index, element) => {
        if ($(element).find('div.base-search-card__info').length > 0) {
          const jobData = this.extractJobData(element, $);
          if (jobData) {
            jobs.push(jobData);
          }
        }
      });
      
      console.log(`Found ${jobs.length} jobs on this page`);
      return jobs;
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(`Error fetching page: ${error.response.status} ${error.response.statusText}`);
      } else {
        console.log(`Error fetching page: ${(error as Error).message}`);
      }
      return [];
    }
  }

  async scrapeJobs(keywords: string, location: string, numJobs: number): Promise<JobData[]> {
    const allJobs: JobData[] = [];
    let start = 0;
    const jobsPerPage = 10;
    
    console.log(`Scraping ${numJobs} jobs for '${keywords}' in ${location}...`);
    
    while (allJobs.length < numJobs) {
      const url = this.buildUrl(keywords, location, start);
      const jobs = await this.scrapeJobsPage(url);
      
      if (jobs.length === 0) {
        console.log("No more jobs found or error occurred.");
        break;
      }
      
      allJobs.push(...jobs);
      
      if (allJobs.length >= numJobs) {
        allJobs.splice(numJobs);
        break;
      }
      
      start += jobsPerPage;
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`Total jobs scraped: ${allJobs.length}`);
    return allJobs;
  }

  getAvailableLocations(): string[] {
    return Object.keys(this.locations);
  }
} 