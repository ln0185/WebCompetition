import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Nonprofit {
  name: string;
  description: string;
  coverImageCloudinaryId?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  profileUrl?: string;
  websiteUrl?: string;
  location?: string;
  tags?: string[];
}

interface Fundraiser {
  title: string;
  description: string;
  goalAmount: number;
  raised: number;
  currency: string;
  coverImageCloudinaryId: string;
  logoUrl: string;
  coverImageUrl: string;
  profileUrl: string;
  websiteUrl: string;
  location: string;
  tags: string[];
}

interface FundraiserGridProps {
  selectedCategory: string;
}

const FundraiserGrid: React.FC<FundraiserGridProps> = ({
  selectedCategory,
}) => {
  const [filteredFundraisers, setFilteredFundraisers] = useState<Fundraiser[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fundraisersPerPage = 6;

  // Fetch fundraisers when component mounts or category changes
  useEffect(() => {
    const fetchFundraisers = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        // Fetch based on category
        const queryParam =
          selectedCategory !== "all"
            ? `?category=${selectedCategory}`
            : "?take=50";
        const response = await fetch(`/api/fundraisers${queryParam}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error fetching fundraisers");
        }

        const data = await response.json();

        if (data?.nonprofits && Array.isArray(data.nonprofits)) {
          const fundraiserData = data.nonprofits
            .map((nonprofit: Nonprofit) => ({
              title: nonprofit.name,
              description: nonprofit.description || "No description available",
              goalAmount: 100000,
              raised: Math.floor(Math.random() * 8000) + 10000,
              currency: "ISK",
              coverImageCloudinaryId: nonprofit.coverImageCloudinaryId || "",
              logoUrl: nonprofit.logoUrl || "",
              coverImageUrl: nonprofit.coverImageUrl || "",
              profileUrl: nonprofit.profileUrl || "",
              websiteUrl: nonprofit.websiteUrl || "",
              location: nonprofit.location || "",
              tags: nonprofit.tags || [],
            }))
            // Filter out fundraisers without images
            .filter((fundraiser: Fundraiser) => fundraiser.coverImageUrl);

          setFilteredFundraisers(fundraiserData);
        } else {
          setError("No fundraisers found");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error("Error in fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFundraisers();
    setCurrentPage(0); // Reset to first page when filter changes
  }, [selectedCategory]); // Ensure this runs whenever selectedCategory changes

  const totalPages = Math.ceil(filteredFundraisers.length / fundraisersPerPage);
  const startIndex = currentPage * fundraisersPerPage;
  const endIndex = startIndex + fundraisersPerPage;
  const currentFundraisers = filteredFundraisers.slice(startIndex, endIndex);

  const changePage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    window.scrollTo({
      top: document.getElementById("fundraiser-grid")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  if (error) {
    return (
      <div className="py-20 px-6 bg-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-500 py-12">
            <h2 className="text-2xl font-semibold mb-4">Error</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="fundraiser-grid" className="py-20 px-6 bg-slate-200">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Current Fundraisers
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Fundraisers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentFundraisers.length > 0 ? (
              currentFundraisers.map((fundraiser, index) => {
                const progressPercentage = Math.min(
                  100,
                  (fundraiser.raised / fundraiser.goalAmount) * 100
                );

                return (
                  <a
                    key={`${fundraiser.title}-${index}`}
                    href={fundraiser.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
                  >
                    <div className="relative w-full h-48">
                      <Image
                        src={fundraiser.coverImageUrl}
                        alt={`${fundraiser.title} cover`}
                        fill
                        className="object-cover"
                      />
                      {fundraiser.logoUrl && (
                        <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                          <Image
                            src={fundraiser.logoUrl}
                            alt={`${fundraiser.title} logo`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-semibold line-clamp-1">
                        {fundraiser.title}
                      </h3>
                      <p className="text-gray-600 mt-2 text-sm line-clamp-3 h-16">
                        {fundraiser.description}
                      </p>

                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <p className="text-sm text-gray-500">
                            Raised: {fundraiser.currency}{" "}
                            {fundraiser.raised.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Goal: {fundraiser.currency}{" "}
                            {fundraiser.goalAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full transition-colors duration-300">
                        Donate Now
                      </button>
                    </div>
                  </a>
                );
              })
            ) : (
              <div className="col-span-3 py-12 text-center text-gray-500">
                No fundraisers found for this category.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: Math.min(totalPages, 4) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => changePage(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      currentPage === index
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Page ${index + 1}`}
                  />
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FundraiserGrid;
