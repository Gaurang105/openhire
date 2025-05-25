import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
              <div className="font-black text-2xl text-black neo-text-shadow-white uppercase tracking-wider">
                OPENHIRE
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">HOME</a>
                <a href="/#search-section" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">JOBS</a>
                <a href="/api-docs" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">API</a>
                <SignedIn>
                  <a href="/api-keys" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">API KEYS</a>
                </SignedIn>
              </nav>
              <div className="flex items-center space-x-4">
                <SignedOut>
                  <a href="/sign-in" className="text-black font-bold uppercase tracking-wide hover:text-primary transition-colors">SIGN IN</a>
                  <a href="/sign-in" className="bg-accent text-white border-4 border-black px-4 py-2 font-black uppercase tracking-wider shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75">
                    SIGN UP
                  </a>
                </SignedOut>
                <SignedIn>
                  <div className="border-4 border-black bg-white p-1 shadow-[4px_4px_0px_black]">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </div>
            <div className="neo-zigzag"></div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
