import React, { useState } from "react";
import Image from "next/image";

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

interface CharityGridProps {
  fundraisers: Fundraiser[];
  onCharityClick: (charity: Fundraiser) => void;
}

const categories = [
  "All",
  "education",
  "animals",
  "health",
  "environment",
  "poverty",
  "oceans",
  "refugees",
];

const CharityGrid: React.FC<CharityGridProps> = ({ fundraisers }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(0);
  const fundraisersPerPage = 6;

  // Filter fundraisers based on the selected category
  const filteredFundraisers =
    selectedCategory === "All"
      ? fundraisers
      : fundraisers.filter((fundraiser) =>
          fundraiser.tags.includes(selectedCategory.toLowerCase()),
        );

  const totalPages = Math.ceil(filteredFundraisers.length / fundraisersPerPage);
  const startIndex = currentPage * fundraisersPerPage;
  const endIndex = startIndex + fundraisersPerPage;
  const currentFundraisers = filteredFundraisers.slice(startIndex, endIndex);

  const changePage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    window.scrollTo({
      top: document.getElementById("charity-grid")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0); // Reset pagination when category changes
  };

  return (
    <div id="charity-grid" className="py-20 px-6 bg-slate-200">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Fundraisers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {currentFundraisers.map((fundraiser, index) => {
          const progressPercentage = Math.min(
            100,
            (fundraiser.raised / fundraiser.goalAmount) * 100,
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
                  key={index}
                  src={fundraiser.coverImageUrl}
                  alt={`${fundraiser.title} cover`}
                  fill
                  className="object-cover"
                />
                {fundraiser.logoUrl && (
                  <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                    <Image
                      key={index}
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
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: Math.min(totalPages, 4) }).map((_, index) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default CharityGrid;
