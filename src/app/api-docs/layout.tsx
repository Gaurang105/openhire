import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Documentation - LinkedIn Job Search API',
  description: 'Complete API documentation for OpenHire\'s LinkedIn job scraping API. Learn how to integrate job search functionality into your applications with our REST API.',
  keywords: [
    'api documentation',
    'linkedin api',
    'job search api',
    'rest api',
    'job scraping api',
    'developer tools',
    'api integration',
    'job listings api'
  ],
  openGraph: {
    title: 'OpenHire API Documentation - LinkedIn Job Search API',
    description: 'Complete API documentation for integrating LinkedIn job search into your applications.',
    type: 'website',
    url: 'https://openhire.work/api-docs',
  },
  twitter: {
    title: 'OpenHire API Documentation - LinkedIn Job Search API',
    description: 'Complete API documentation for integrating LinkedIn job search into your applications.',
  },
  alternates: {
    canonical: 'https://openhire.work/api-docs',
  },
}

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "OpenHire API Documentation",
            "description": "Complete API documentation for LinkedIn job scraping and search functionality",
            "author": {
              "@type": "Organization",
              "name": "OpenHire"
            },
            "publisher": {
              "@type": "Organization",
              "name": "OpenHire",
              "logo": {
                "@type": "ImageObject",
                "url": "https://openhire.work/openhire.png"
              }
            },
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://openhire.work/api-docs"
            }
          })
        }}
      />
      {children}
    </>
  )
} 