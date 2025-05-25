"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy, Play, Code, Globe, Key, Book, CheckCircle } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function ApiDocs() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(label);
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const codeExamples = {
    curl: `curl -X POST https://your-domain.com/api/search-jobs \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: oh_your_api_key_here" \\
  -d '{
    "keywords": "Software Developer",
    "location": "Bengaluru",
    "numJobs": 25
  }'`,
    javascript: `fetch('https://your-domain.com/api/search-jobs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'oh_your_api_key_here'
  },
  body: JSON.stringify({
    keywords: 'Software Developer',
    location: 'Bengaluru',
    numJobs: 25
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

url = "https://your-domain.com/api/search-jobs"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "oh_your_api_key_here"
}
payload = {
    "keywords": "Software Developer",
    "location": "Bengaluru", 
    "numJobs": 25
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(data)`,
    node: `const axios = require('axios');

const searchJobs = async () => {
  try {
    const response = await axios.post('https://your-domain.com/api/search-jobs', {
      keywords: 'Software Developer',
      location: 'Bengaluru',
      numJobs: 25
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'oh_your_api_key_here'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
};

searchJobs();`
  };

  const tabs = [
    { id: "overview", label: "OVERVIEW", icon: Book },
    { id: "authentication", label: "AUTH", icon: Key },
    { id: "endpoints", label: "ENDPOINTS", icon: Globe },
    { id: "examples", label: "CODE", icon: Code },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <SignedOut>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-accent border-4 border-black p-8 shadow-[16px_16px_0px_black] transform rotate-2 inline-block mb-8">
              <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-wider">
                🔒 ACCESS DENIED
              </h1>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_black] transform -rotate-1 mb-8">
              <p className="text-xl font-bold text-black uppercase tracking-wide">
                YOU NEED TO SIGN UP TO ACCESS THE API DOCUMENTATION!
              </p>
            </div>
            <div className="bg-primary border-4 border-black p-6 shadow-[8px_8px_0px_black] transform rotate-1 mb-8">
              <p className="text-black font-bold uppercase tracking-wide">
                CREATE AN ACCOUNT TO GET FULL ACCESS TO OUR POWERFUL JOB SEARCH API!
              </p>
            </div>
            <Link href="/sign-in" className="bg-secondary text-black border-4 border-black px-8 py-4 font-black uppercase tracking-wider shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75 text-lg">
              🚀 SIGN UP NOW!
            </Link>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="bg-primary border-4 border-black p-8 shadow-[16px_16px_0px_black] transform rotate-2 inline-block mb-8">
                <h1 className="text-3xl md:text-6xl font-black text-black uppercase tracking-wider">
                  API DOCS
                </h1>
              </div>
              <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_black] transform -rotate-1 max-w-4xl mx-auto">
                <p className="text-xl font-bold text-black uppercase tracking-wide">
                  POWERFUL REST API TO INTEGRATE LINKEDIN JOB SCRAPING INTO YOUR APPLICATIONS! 
                  SEARCH THOUSANDS OF JOB POSTINGS PROGRAMMATICALLY!
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="neo-card bg-secondary mb-8 p-2">
              <div className="flex overflow-x-auto gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 font-black uppercase tracking-wider border-4 border-black transition-all duration-75 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-accent text-white shadow-[4px_4px_0px_black] transform rotate-1"
                          : "bg-white text-black hover:bg-primary hover:text-black shadow-[2px_2px_0px_black]"
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="neo-card bg-white p-8">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div>
                  <div className="bg-accent border-4 border-black p-4 shadow-[8px_8px_0px_black] transform -rotate-1 inline-block mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">API OVERVIEW</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-secondary border-4 border-black p-6 shadow-[4px_4px_0px_black]">
                      <h3 className="text-lg font-black text-black mb-4 uppercase tracking-wide">BASE URL</h3>
                      <div className="bg-white border-2 border-black p-4 font-mono text-sm font-bold text-black">
                        https://your-domain.com/api
                      </div>
                    </div>
                    <div className="bg-primary border-4 border-black p-6 shadow-[4px_4px_0px_black]">
                      <h3 className="text-lg font-black text-black mb-4 uppercase tracking-wide">DATA FORMAT</h3>
                      <div className="bg-white border-2 border-black p-4 font-mono text-sm font-bold text-black">
                        JSON
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary border-4 border-black p-4 shadow-[8px_8px_0px_black] transform rotate-1 inline-block mb-6">
                    <h3 className="text-lg font-black text-black uppercase tracking-wide">FEATURES</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start bg-white border-4 border-black p-4 shadow-[4px_4px_0px_black]">
                      <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-black text-black uppercase tracking-wide">REAL-TIME JOB SCRAPING</h4>
                        <p className="text-black font-bold text-sm uppercase">GET FRESH JOB POSTINGS DIRECTLY FROM LINKEDIN</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white border-4 border-black p-4 shadow-[4px_4px_0px_black]">
                      <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-black text-black uppercase tracking-wide">LOCATION FILTERING</h4>
                        <p className="text-black font-bold text-sm uppercase">SEARCH BY SPECIFIC CITIES ACROSS INDIA</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white border-4 border-black p-4 shadow-[4px_4px_0px_black]">
                      <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-black text-black uppercase tracking-wide">KEYWORD SEARCH</h4>
                        <p className="text-black font-bold text-sm uppercase">FIND JOBS MATCHING SPECIFIC SKILLS AND ROLES</p>
                      </div>
                    </div>
                    <div className="flex items-start bg-white border-4 border-black p-4 shadow-[4px_4px_0px_black]">
                      <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-black text-black uppercase tracking-wide">FLEXIBLE RESULTS</h4>
                        <p className="text-black font-bold text-sm uppercase">CONTROL THE NUMBER OF RESULTS (1-100)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent border-4 border-black p-4 shadow-[8px_8px_0px_black] transform -rotate-1 inline-block mb-6">
                    <h3 className="text-lg font-black text-white uppercase tracking-wide">AVAILABLE LOCATIONS</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {["Bengaluru", "New Delhi", "Chennai", "Pune", "Hyderabad", "Mumbai", "Gurugram"].map((location) => (
                      <div key={location} className="bg-primary border-2 border-black px-4 py-3 text-black text-sm text-center font-black uppercase tracking-wide shadow-[2px_2px_0px_black]">
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Authentication Tab */}
              {activeTab === "authentication" && (
                <div>
                  <div className="bg-accent border-4 border-black p-4 shadow-[8px_8px_0px_black] transform -rotate-1 inline-block mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">AUTHENTICATION</h2>
                  </div>
                  
                  <div className="bg-primary border-4 border-black p-6 shadow-[8px_8px_0px_black] mb-8 transform rotate-1">
                    <p className="text-black font-black uppercase tracking-wide">
                      🔐 API KEY AUTHENTICATION IS NOW REQUIRED FOR ALL API REQUESTS!
                    </p>
                  </div>

                  <div className="bg-secondary border-4 border-black p-4 shadow-[8px_8px_0px_black] inline-block mb-6">
                    <h3 className="text-lg font-black text-black uppercase tracking-wide">HOW TO GET YOUR API KEY</h3>
                  </div>
                  
                  <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_black] mb-8">
                    <ol className="space-y-4 text-black font-bold uppercase tracking-wide">
                      <li className="flex items-start">
                        <span className="bg-accent text-white px-3 py-1 border-2 border-black mr-4 font-black">1</span>
                        <span>SIGN UP OR SIGN IN TO YOUR ACCOUNT</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-accent text-white px-3 py-1 border-2 border-black mr-4 font-black">2</span>
                        <span>GO TO THE <Link href="/api-keys" className="text-primary underline">API KEYS</Link> PAGE</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-accent text-white px-3 py-1 border-2 border-black mr-4 font-black">3</span>
                        <span>CREATE A NEW API KEY WITH A DESCRIPTIVE NAME</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-accent text-white px-3 py-1 border-2 border-black mr-4 font-black">4</span>
                        <span>COPY AND SAVE YOUR API KEY SECURELY</span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-accent border-4 border-black p-4 shadow-[8px_8px_0px_black] inline-block mb-6">
                    <h3 className="text-lg font-black text-white uppercase tracking-wide">AUTHENTICATION METHODS</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_black]">
                      <h4 className="font-black text-black uppercase tracking-wide mb-4">METHOD 1: X-API-KEY HEADER</h4>
                      <div className="bg-muted border-2 border-black p-4">
                        <pre className="text-sm font-bold text-black">x-api-key: oh_your_api_key_here</pre>
                      </div>
                    </div>
                    <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_black]">
                      <h4 className="font-black text-black uppercase tracking-wide mb-4">METHOD 2: AUTHORIZATION HEADER</h4>
                      <div className="bg-muted border-2 border-black p-4">
                        <pre className="text-sm font-bold text-black">Authorization: Bearer oh_your_api_key_here</pre>
                      </div>
                    </div>
                  </div>

                  <div className="bg-destructive border-4 border-black p-6 shadow-[8px_8px_0px_black] mb-8 transform -rotate-1">
                    <p className="text-white font-black uppercase tracking-wide">
                      ⚠️ IMPORTANT: KEEP YOUR API KEY SECURE! NEVER SHARE IT PUBLICLY OR COMMIT IT TO VERSION CONTROL.
                    </p>
                  </div>

                  <div className="bg-primary border-4 border-black p-4 shadow-[8px_8px_0px_black] inline-block mb-6">
                    <h3 className="text-lg font-black text-black uppercase tracking-wide">RATE LIMITING & USAGE</h3>
                  </div>
                  
                  <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_black]">
                    <p className="text-black font-bold uppercase tracking-wide mb-4">
                      TO ENSURE FAIR USAGE AND MAINTAIN SERVICE QUALITY:
                    </p>
                    <ul className="space-y-2 text-black font-bold uppercase tracking-wide">
                      <li>• MAXIMUM 100 JOBS PER REQUEST</li>
                      <li>• 2-SECOND DELAY BETWEEN PAGINATION REQUESTS</li>
                      <li>• RECOMMENDED: 1 REQUEST PER 5 SECONDS</li>
                      <li>• API USAGE IS TRACKED PER API KEY</li>
                      <li>• DEACTIVATED KEYS CANNOT BE USED</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Endpoints Tab */}
              {activeTab === "endpoints" && (
                <div>
                  <div className="bg-accent border-4 border-black p-4 shadow-[8px_8px_0px_black] transform -rotate-1 inline-block mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">API ENDPOINTS</h2>
                  </div>
                  
                  {/* Job Search Endpoint */}
                  <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_black] mb-8">
                    <div className="flex items-center mb-6">
                      <span className="bg-primary text-black text-sm px-4 py-2 border-2 border-black mr-4 font-black uppercase">POST</span>
                      <code className="text-xl font-mono font-black text-black">/api/search-jobs</code>
                    </div>
                    <div className="bg-secondary border-2 border-black p-4 mb-6">
                      <p className="text-black font-bold uppercase tracking-wide">SEARCH FOR JOB POSTINGS WITH SPECIFIED CRITERIA.</p>
                    </div>
                    
                    <div className="bg-accent border-4 border-black p-3 inline-block mb-4">
                      <h4 className="font-black text-white uppercase tracking-wide">REQUEST BODY</h4>
                    </div>
                    <div className="bg-muted border-4 border-black p-6 mb-6">
                      <pre className="text-sm font-bold text-black">{`{
    "keywords": "string (required)",
    "location": "string (required)",
    "numJobs": "number (optional, 1-100, default: 25)"
  }`}</pre>
                    </div>

                    <div className="bg-primary border-4 border-black p-3 inline-block mb-4">
                      <h4 className="font-black text-black uppercase tracking-wide">RESPONSE</h4>
                    </div>
                    <div className="bg-muted border-4 border-black p-6">
                      <pre className="text-sm font-bold text-black">{`{
    "success": true,
    "jobs": [
      {
        "title": "Software Developer",
        "company": "Tech Company",
        "location": "Bengaluru, Karnataka, India",
        "postedDate": "2 days ago",
        "url": "https://linkedin.com/jobs/...",
        "status": "Actively recruiting"
      }
    ],
    "searchParams": {
      "keywords": "Software Developer",
      "location": "Bengaluru",
      "numJobs": 25
    },
    "totalFound": 25
  }`}</pre>
                    </div>
                  </div>

                  {/* Info Endpoint */}
                  <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_black]">
                    <div className="flex items-center mb-6">
                      <span className="bg-secondary text-black text-sm px-4 py-2 border-2 border-black mr-4 font-black uppercase">GET</span>
                      <code className="text-xl font-mono font-black text-black">/api/search-jobs</code>
                    </div>
                    <div className="bg-accent border-2 border-black p-4 mb-6">
                      <p className="text-white font-bold uppercase tracking-wide">GET API INFORMATION AND AVAILABLE LOCATIONS.</p>
                    </div>
                    
                    <div className="bg-primary border-4 border-black p-3 inline-block mb-4">
                      <h4 className="font-black text-black uppercase tracking-wide">RESPONSE</h4>
                    </div>
                    <div className="bg-muted border-4 border-black p-6">
                      <pre className="text-sm font-bold text-black">{`{
    "message": "Job search API endpoint",
    "method": "POST",
    "availableLocations": ["Bengaluru", "New Delhi", ...],
    "parameters": {
      "keywords": "string (required) - Job search keywords",
      "location": "string (required) - Location from available list",
      "numJobs": "number (optional) - Number of jobs to return (1-100, default: 25)"
    },
    "example": {
      "keywords": "Software Developer",
      "location": "Bengaluru",
      "numJobs": 25
    }
  }`}</pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Code Examples Tab */}
              {activeTab === "examples" && (
                <div>
                  <div className="bg-accent border-4 border-black p-4 shadow-[8px_8px_0px_black] transform -rotate-1 inline-block mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">CODE EXAMPLES</h2>
                  </div>
                  
                  <div className="space-y-12">
                    {/* cURL Example */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary border-4 border-black p-3 shadow-[4px_4px_0px_black]">
                          <h3 className="text-lg font-black text-black uppercase tracking-wide">cURL</h3>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(codeExamples.curl, "cURL")}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {copySuccess === "cURL" ? "COPIED!" : "COPY"}
                        </Button>
                      </div>
                      <div className="bg-black border-4 border-black text-green-400 p-6 overflow-x-auto shadow-[8px_8px_0px_black]">
                        <pre className="text-sm font-mono">{codeExamples.curl}</pre>
                      </div>
                    </div>

                    {/* JavaScript Example */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-secondary border-4 border-black p-3 shadow-[4px_4px_0px_black]">
                          <h3 className="text-lg font-black text-black uppercase tracking-wide">JAVASCRIPT (FETCH)</h3>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(codeExamples.javascript, "JavaScript")}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {copySuccess === "JavaScript" ? "COPIED!" : "COPY"}
                        </Button>
                      </div>
                      <div className="bg-black border-4 border-black text-green-400 p-6 overflow-x-auto shadow-[8px_8px_0px_black]">
                        <pre className="text-sm font-mono">{codeExamples.javascript}</pre>
                      </div>
                    </div>

                    {/* Python Example */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-accent border-4 border-black p-3 shadow-[4px_4px_0px_black]">
                          <h3 className="text-lg font-black text-white uppercase tracking-wide">PYTHON</h3>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(codeExamples.python, "Python")}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {copySuccess === "Python" ? "COPIED!" : "COPY"}
                        </Button>
                      </div>
                      <div className="bg-black border-4 border-black text-green-400 p-6 overflow-x-auto shadow-[8px_8px_0px_black]">
                        <pre className="text-sm font-mono">{codeExamples.python}</pre>
                      </div>
                    </div>

                    {/* Node.js Example */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-primary border-4 border-black p-3 shadow-[4px_4px_0px_black]">
                          <h3 className="text-lg font-black text-black uppercase tracking-wide">NODE.JS (AXIOS)</h3>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(codeExamples.node, "Node.js")}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          {copySuccess === "Node.js" ? "COPIED!" : "COPY"}
                        </Button>
                      </div>
                      <div className="bg-black border-4 border-black text-green-400 p-6 overflow-x-auto shadow-[8px_8px_0px_black]">
                        <pre className="text-sm font-mono">{codeExamples.node}</pre>
                      </div>
                    </div>
                  </div>

                  {/* Try It Out Section */}
                  <div className="mt-16 bg-primary border-4 border-black p-8 shadow-[12px_12px_0px_black] transform rotate-1">
                    <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_black] transform -rotate-2 inline-block mb-6">
                      <h3 className="text-lg font-black text-black uppercase tracking-wide">TRY IT OUT</h3>
                    </div>
                    <p className="text-black font-bold uppercase tracking-wide mb-6">
                      TEST THE API DIRECTLY FROM OUR WEBSITE BY GOING TO THE SEARCH SECTION!
                    </p>
                    <Button variant="outline" onClick={() => window.location.href = "/#search-section"}>
                      <Play className="h-4 w-4 mr-2" />
                      TRY LIVE SEARCH
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
} 