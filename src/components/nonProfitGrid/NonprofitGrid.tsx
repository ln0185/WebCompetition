'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Nonprofit {
  name: string;
  description: string;
  profileUrl: string;
  logoUrl: string;
  websiteUrl?: string;
  ein: string;
  matchedTerms?: string[];
}

const NonprofitGrid: React.FC = () => {
  const [nonprofits, setNonprofits] = useState<Nonprofit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    'all',
    'animals',
    'environment',
    'health',
    'education',
    'poverty',
    'arts'
  ];

  useEffect(() => {
    const fetchNonprofits = async () => {
      try {
        setLoading(true);
        const searchTerm = activeCategory === 'all' ? '' : activeCategory;
        const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
        
        const response = await fetch(`/api/nonprofits${queryParam}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch nonprofits: ${response.status}`);
        }
        
        const data = await response.json();
        setNonprofits(data.nonprofits || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching nonprofits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNonprofits();
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error loading nonprofits: {error}</p>
        <button 
          onClick={() => setActiveCategory('all')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Category Filters */}
      <div className="flex justify-center mb-8 overflow-x-auto py-2">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nonprofits.map((nonprofit) => (
            <div 
              key={nonprofit.ein} 
              className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4 flex-shrink-0">
                    {nonprofit.logoUrl ? (
                      <Image 
                        src={nonprofit.logoUrl} 
                        alt={`${nonprofit.name} logo`} 
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-lg font-bold">
                          {nonprofit.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg line-clamp-2">{nonprofit.name}</h3>
                </div>
                
                <p className="text-gray-600 line-clamp-3 mb-4 h-18 text-sm">
                  {nonprofit.description || "No description available"}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {nonprofit.matchedTerms?.map((term) => (
                    <span key={term} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {term}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4">
                  <Link 
                    href={nonprofit.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Donate
                  </Link>
                  
                  {nonprofit.websiteUrl && (
                    <Link 
                      href={nonprofit.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Learn More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NonprofitGrid;