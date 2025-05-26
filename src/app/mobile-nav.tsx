"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center space-x-3">
        <SignedIn>
          <div className="border-4 border-black bg-white p-1 shadow-[4px_4px_0px_black]">
            <UserButton />
          </div>
        </SignedIn>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-primary border-4 border-black p-2 shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-black" />
          ) : (
            <Menu className="h-6 w-6 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-white border-t-4 border-black z-50">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <Link 
              href="/" 
              className="block text-black font-bold uppercase tracking-wide hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link 
              href="/#search-section" 
              className="block text-black font-bold uppercase tracking-wide hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              JOBS
            </Link>
            <Link 
              href="/api-docs" 
              className="block text-black font-bold uppercase tracking-wide hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              API
            </Link>
            <SignedIn>
              <Link 
                href="/api-keys" 
                className="block text-black font-bold uppercase tracking-wide hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                API KEYS
              </Link>
            </SignedIn>
            <SignedOut>
              <div className="pt-4 border-t-2 border-black space-y-3">
                <Link 
                  href="/sign-in" 
                  className="block text-black font-bold uppercase tracking-wide hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SIGN IN
                </Link>
                <Link 
                  href="/sign-in" 
                  className="block bg-accent text-white border-4 border-black px-4 py-3 font-black uppercase tracking-wider shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  SIGN UP
                </Link>
              </div>
            </SignedOut>
          </nav>
        </div>
      )}
    </>
  );
} 