import React from 'react';

interface ProductHuntBadgeProps {
  className?: string;
}

export function ProductHuntBadge({ className = "" }: ProductHuntBadgeProps) {
  return (
    <div className={`inline-block ${className}`}>
      <a 
        href="https://www.producthunt.com/posts/openhire?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-openhire" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-105"
      >
        <img 
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=970038&theme=light&t=1748245432070" 
          alt="OpenHire - Find Your Dream Job | Product Hunt" 
          style={{ width: '250px', height: '54px' }} 
          width="250" 
          height="54"
          className="border-2 border-black shadow-[4px_4px_0px_black] bg-white"
        />
      </a>
    </div>
  );
} 