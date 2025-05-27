import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - Create Your OpenHire Account',
  description: 'Create your free OpenHire account to access thousands of LinkedIn job listings through our powerful job search platform and API.',
  keywords: [
    'sign up',
    'create account',
    'register',
    'job search account',
    'linkedin jobs',
    'free registration',
    'job search platform'
  ],
  openGraph: {
    title: 'Sign Up for OpenHire - Access LinkedIn Job Search API',
    description: 'Create your free account to access thousands of job listings and our powerful API.',
    type: 'website',
    url: 'https://openhire.work/sign-up',
  },
  twitter: {
    title: 'Sign Up for OpenHire - Access LinkedIn Job Search API',
    description: 'Create your free account to access thousands of job listings and our powerful API.',
  },
  alternates: {
    canonical: 'https://openhire.work/sign-up',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 