import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In - Access Your OpenHire Account',
  description: 'Sign in to your OpenHire account to access LinkedIn job search, manage your API keys, and find your next career opportunity.',
  keywords: [
    'sign in',
    'login',
    'account access',
    'job search login',
    'api access',
    'user portal'
  ],
  openGraph: {
    title: 'Sign In to OpenHire - Access Your Job Search Dashboard',
    description: 'Sign in to access your job search dashboard and API management tools.',
    type: 'website',
    url: 'https://openhire.work/sign-in',
  },
  twitter: {
    title: 'Sign In to OpenHire - Access Your Job Search Dashboard',
    description: 'Sign in to access your job search dashboard and API management tools.',
  },
  alternates: {
    canonical: 'https://openhire.work/sign-in',
  },
  robots: {
    index: false, // Don't index login pages
    follow: true,
  },
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 