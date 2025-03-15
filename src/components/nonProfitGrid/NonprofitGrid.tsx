"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "../search/Search";
import { mapCharityToNonProfit, Nonprofit } from "@/app/types";

interface NonprofitGridProps {
  selectedCategory: string;
}

const NonprofitGrid: React.FC<NonprofitGridProps> = ({ selectedCategory }) => {
  const [nonprofits, setNonprofits] = useState<Nonprofit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const nonprofitsPerPage = 6;

  const updateSelectedCharity = (charity: Nonprofit) => {
    // Reorder the fundraisers array: selected charity first, followed by related ones
    const reorderedFundraisers = [
      charity,
      ...nonprofits.filter((f) => f.name !== charity.name), // Add the rest
    ];
    setNonprofits(reorderedFundraisers);
  };

  useEffect(() => {
    const fetchNonprofits = async () => {
      try {
        setLoading(true);

        //const searchTerm = activeCategory === "all" ? "" : activeCategory;

        const searchTerm = selectedCategory === "all" ? "" : selectedCategory;
        const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : "";

        const response = await fetch(`/api/nonprofits${queryParam}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch nonprofits: ${response.status}`);
        }

        const data = await response.json();
        setNonprofits(data.nonprofits || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        console.error("Error fetching nonprofits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNonprofits();
  }, [selectedCategory]);

  const totalPages = Math.ceil(nonprofits.length / nonprofitsPerPage);
  const startIndex = currentPage * nonprofitsPerPage;
  const endIndex = startIndex + nonprofitsPerPage;
  const currentNonprofits = nonprofits.slice(startIndex, endIndex);

  const changePage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    window.scrollTo({
      top: document.getElementById("nonprofit-grid")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error loading nonprofits: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-button-color text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div id="nonprofit-grid" className="w-full">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-border-color"></div>
        </div>
      ) : (
        <>
          <Search
            onSelectCharity={(charity) => {
              const fundraiser = mapCharityToNonProfit(charity);
              updateSelectedCharity(fundraiser);
            }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentNonprofits.length > 0 ? (
              currentNonprofits.map((nonprofit) => (
                <div
                  key={`${nonprofit.ein}-${nonprofit.name}`}
                  className="bg-white rounded-xl overflow-hidden hover:scale-102 transition-transform duration-200 relative"
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
                            <span className="text-gray-900 text-lg font-bold">
                              {nonprofit.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {nonprofit.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 line-clamp-3 mb-4 h-18 text-sm">
                      {nonprofit.description || "No description available"}
                    </p>

                    <div className="flex justify-between mt-4">
                      <Link
                        href={nonprofit.profileUrl as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-button-color text-white text-sm rounded-lg hover:bg-button-color2 transition-colors"
                      >
                        Donate
                      </Link>

                      {nonprofit.websiteUrl && (
                        <Link
                          href={nonprofit.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 border border-[#d9d9d9] text-gray-700 text-sm rounded-lg hover:bg-button-color hover:text-white transition-colors"
                        >
                          Learn More
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 py-12 text-center text-gray-500">
                No nonprofits found for this category.
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => changePage(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentPage === index
                      ? "bg-button-color"
                      : "bg-gray-300 hover:bg-button-color2"
                  }`}
                  aria-label={`Page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NonprofitGrid;
