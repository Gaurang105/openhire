"use client";

import { Hero } from "@/components/ui/animated-hero";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, MapPin, Users, ExternalLink, Calendar, Building } from "lucide-react";

interface JobData {
  title: string;
  company: string;
  location: string;
  postedDate: string;
  url: string;
  status: string;
}

export default function Home() {
  const [searchParams, setSearchParams] = useState({
    keywords: "",
    location: "",
    numJobs: 25
  });
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const locations = [
    "Bengaluru", "New Delhi", "Chennai", "Pune", "Hyderabad", "Mumbai", "Gurugram"
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.keywords.trim()) {
      setError("Please enter job keywords");
      return;
    }
    if (!searchParams.location) {
      setError("Please select a location");
      return;
    }

    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const response = await fetch('/api/internal/search-jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("Please sign in to search for jobs");
        } else if (response.status === 403) {
          setError("Please create an API key in your account settings to use the job search feature");
        } else {
          throw new Error(data.error || 'Failed to search jobs');
        }
        return;
      }

      setJobs(data.jobs || []);
    } catch (err: unknown) {
      setError((err as Error).message || 'An error occurred while searching for jobs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Job Search Section */}
      <section id="search-section" className="py-20 bg-muted relative">
        <div className="neo-zigzag"></div>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="bg-accent border-4 border-black p-4 shadow-[12px_12px_0px_black] inline-block mb-6">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wider">
                  SEARCH JOBS
                </h2>
              </div>
              <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_black] max-w-2xl mx-auto">
                <p className="text-lg font-bold text-black uppercase tracking-wide">
                  FIND YOUR NEXT OPPORTUNITY FROM THOUSANDS OF LINKEDIN JOB POSTINGS!
                </p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="neo-card p-8 bg-white mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <label htmlFor="keywords" className="block text-sm font-black text-black mb-3 uppercase tracking-wide">
                    JOB KEYWORDS
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-black" />
                    <input
                      id="keywords"
                      type="text"
                      placeholder="SOFTWARE DEVELOPER, DATA SCIENTIST"
                      className="neo-input w-full pl-12 pr-4 py-4 text-black placeholder:text-gray-600 uppercase"
                      value={searchParams.keywords}
                      onChange={(e) => setSearchParams({...searchParams, keywords: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-black text-black mb-3 uppercase tracking-wide">
                    LOCATION
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-black" />
                    <select
                      id="location"
                      className="neo-input w-full pl-12 pr-4 py-4 text-black uppercase"
                      value={searchParams.location}
                      onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                    >
                      <option value="">SELECT LOCATION</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="numJobs" className="block text-sm font-black text-black mb-3 uppercase tracking-wide">
                    NUMBER OF JOBS
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-4 h-5 w-5 text-black" />
                    <input
                      id="numJobs"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="25"
                      className="neo-input w-full pl-12 pr-4 py-4 text-black placeholder:text-gray-600"
                      value={searchParams.numJobs}
                      onChange={(e) => setSearchParams({...searchParams, numJobs: parseInt(e.target.value) || 25})}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 text-lg" 
                disabled={loading}
              >
                {loading ? "SEARCHING..." : "🔍 SEARCH JOBS NOW!"}
              </Button>
            </form>

            {error && (
              <div className="bg-destructive border-4 border-black p-6 shadow-[8px_8px_0px_black] mb-8">
                <p className="text-white font-black uppercase tracking-wide">❌ {error}</p>
              </div>
            )}

            {/* Results Section */}
            {jobs.length > 0 && (
              <div className="mt-12">
                <div className="bg-secondary border-4 border-black p-4 shadow-[8px_8px_0px_black] inline-block mb-8">
                  <h3 className="text-2xl font-black text-black uppercase tracking-wider">
                    🎉 FOUND {jobs.length} JOBS!
                  </h3>
                </div>
                
                <div className="grid gap-8">
                  {jobs.map((job, index) => (
                    <div key={index} className="neo-card p-8 bg-white hover:bg-primary/10 transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-xl font-black text-black mb-4 uppercase tracking-wide">
                            {job.title}
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center text-black font-bold">
                              <Building className="h-5 w-5 mr-3" />
                              <span className="uppercase">{job.company}</span>
                            </div>
                            <div className="flex items-center text-black font-bold">
                              <MapPin className="h-5 w-5 mr-3" />
                              <span className="uppercase">{job.location}</span>
                            </div>
                            <div className="flex items-center text-black font-bold">
                              <Calendar className="h-5 w-5 mr-3" />
                              <span className="uppercase">{job.postedDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-4">
                          {job.status !== "N/A" && (
                            <div className="bg-accent border-2 border-black px-3 py-1 shadow-[2px_2px_0px_black]">
                              <span className="text-white font-black text-xs uppercase tracking-wide">
                                ✨ {job.status}
                              </span>
                            </div>
                          )}
                          {job.url !== "N/A" && (
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-primary text-black border-2 border-black px-4 py-2 font-black uppercase tracking-wide shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75 inline-flex items-center"
                            >
                              VIEW JOB <ExternalLink className="h-4 w-4 ml-2" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="neo-zigzag"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="bg-primary border-4 border-black p-6 shadow-[16px_16px_0px_black] inline-block mb-8">
              <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-wider">
                WHY OPENHIRE?
              </h2>
            </div>
            <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_black] max-w-2xl mx-auto">
              <p className="text-lg font-bold text-black uppercase tracking-wide">
                POWERFUL FEATURES TO ACCELERATE YOUR JOB SEARCH!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 text-center bg-white border-4 border-black shadow-[8px_8px_0px_black] transition-all duration-200 hover:scale-105 hover:shadow-[12px_12px_0px_black]">
              <div className="w-20 h-20 bg-primary border-4 border-black shadow-[4px_4px_0px_black] flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-4 uppercase tracking-wider">
                REAL-TIME SEARCH
              </h3>
              <p className="text-black font-bold uppercase tracking-wide">
                SEARCH THOUSANDS OF FRESH JOB POSTINGS FROM LINKEDIN IN REAL-TIME!
              </p>
            </div>

            <div className="p-8 text-center bg-white border-4 border-black shadow-[8px_8px_0px_black] transition-all duration-200 hover:scale-105 hover:shadow-[12px_12px_0px_black]">
              <div className="w-20 h-20 bg-secondary border-4 border-black shadow-[4px_4px_0px_black] flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-4 uppercase tracking-wider">
                LOCATION-BASED
              </h3>
              <p className="text-black font-bold uppercase tracking-wide">
                FILTER JOBS BY SPECIFIC CITIES ACROSS INDIA TO FIND OPPORTUNITIES NEAR YOU!
              </p>
            </div>

            <div className="p-8 text-center bg-white border-4 border-black shadow-[8px_8px_0px_black] transition-all duration-200 hover:scale-105 hover:shadow-[12px_12px_0px_black]">
              <div className="w-20 h-20 bg-accent border-4 border-black shadow-[4px_4px_0px_black] flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-xl font-black text-black mb-4 uppercase tracking-wider">
                API ACCESS
              </h3>
              <p className="text-black font-bold uppercase tracking-wide">
                INTEGRATE OUR POWERFUL JOB SEARCH API INTO YOUR OWN APPLICATIONS!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
