import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { MobileNav } from "./mobile-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenHire - Find Your Dream Job",
  description: "Search thousands of job openings from LinkedIn with powerful scraping technology. Get instant results through our beautiful interface or REST API.",
  keywords: ["jobs", "linkedin", "job search", "api", "scraping", "careers", "employment", "hiring"],
  authors: [{ name: "OpenHire Team" }],
  creator: "OpenHire",
  publisher: "OpenHire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/openhire.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/openhire.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      url: "/openhire.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://openhire.vercel.app",
    title: "OpenHire - Find Your Dream Job",
    description: "Search thousands of job openings from LinkedIn with powerful scraping technology. Get instant results through our beautiful interface or REST API.",
    siteName: "OpenHire",
    images: [
      {
        url: "/openhire.png",
        width: 1200,
        height: 630,
        alt: "OpenHire - Job Search Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenHire - Find Your Dream Job",
    description: "Search thousands of job openings from LinkedIn with powerful scraping technology.",
    images: ["/openhire.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
          <header className="bg-secondary border-b-4 border-black relative">
            <div className="neo-zigzag"></div>
            <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
                <div className="relative">
                  <Image
                    src="/openhire.png"
                    alt="OpenHire Logo"
                    width={32}
                    height={32}
                    className="md:w-10 md:h-10 border-2 border-black shadow-[2px_2px_0px_black] group-hover:shadow-[4px_4px_0px_black] transition-all duration-75"
                  />
                </div>
                <div className="font-black text-lg md:text-2xl text-black neo-text-shadow-white uppercase tracking-wider group-hover:text-primary transition-colors">
                  OPENHIRE
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">HOME</Link>
                <Link href="/#search-section" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">JOBS</Link>
                <Link href="/api-docs" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">API</Link>
                <SignedIn>
                  <Link href="/api-keys" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">API KEYS</Link>
                </SignedIn>
              </nav>
              
              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <SignedOut>
                  <Link href="/sign-in" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">SIGN IN</Link>
                  <Link href="/sign-in" className="bg-accent text-white border-4 border-black px-4 py-2 font-black uppercase tracking-wider shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75">
                    SIGN UP
                  </Link>
                </SignedOut>
                <SignedIn>
                  <div className="border-4 border-black bg-white p-1 shadow-[4px_4px_0px_black]">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>

              {/* Mobile Navigation */}
              <MobileNav />
            </div>
            <div className="neo-zigzag"></div>
          </header>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider
  );
}
