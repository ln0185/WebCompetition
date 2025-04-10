import React, { useState } from "react";
import Image from "next/image";
import Search from "../search/Search";
import { mapCharityToFundraiser } from "@/app/types";

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
  setFundraisers: React.Dispatch<React.SetStateAction<Fundraiser[]>>;
  selectedCategory: string;
}

const FundraiserGrid: React.FC<CharityGridProps> = ({
  fundraisers,
  selectedCategory,
  setFundraisers,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const fundraisersPerPage = 6;

  const filteredFundraisers =
    selectedCategory === "all"
      ? fundraisers
      : fundraisers.filter((fundraiser) =>
          fundraiser.tags.some(
            (tag) => tag.toLowerCase() === selectedCategory.toLowerCase(),
          ),
        );

  const totalPages = Math.ceil(filteredFundraisers.length / fundraisersPerPage);
  const startIndex = currentPage * fundraisersPerPage;
  const endIndex = startIndex + fundraisersPerPage;
  const currentFundraisers = filteredFundraisers.slice(startIndex, endIndex);

  const updateSelectedCharity = (charity: Fundraiser) => {
    // Reorder the fundraisers array: selected charity first, followed by related ones
    const reorderedFundraisers = [
      charity,
      ...fundraisers.filter((f) => f.title !== charity.title), // Add the rest
    ];
    setFundraisers(reorderedFundraisers);
  };

  const changePage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    window.scrollTo({
      top: document.getElementById("charity-grid")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <div id="charity-grid" className="px-6 bg-custom-light">
      <div className="flex flex-wrap justify-center gap-3 ml-[15px]"></div>

      {/* Fundraisers Grid */}
      <Search
        onSelectCharity={(charity) => {
          const fundraiser = mapCharityToFundraiser(charity);
          updateSelectedCharity(fundraiser);
        }}
      />
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
              className="block border-[#d9d9d9] rounded-lg overflow-hidden hover:scale-102 transition-transform duration-200 bg-white"
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
                  <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full overflow-hidden border-2 border-color">
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
                <p className="text-gray-900 mt-2 text-sm line-clamp-3 h-16">
                  {fundraiser.description}
                </p>

                <div className="mt-4">
                  <div className="w-full bg-custom-light rounded-full h-2.5">
                    <div
                      className="bg-button-color h-2.5 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-900">
                      Raised: {fundraiser.currency}{" "}
                      {fundraiser.raised.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-900">
                      Goal: {fundraiser.currency}{" "}
                      {fundraiser.goalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button className="mt-4 bg-button-color hover:bg-button-color2 text-white font-medium  py-2 px-4 rounded-full w-full transition-colors duration-300">
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
                  ? "bg-button-color"
                  : "bg-gray-300 hover:bg-button-color2"
              }`}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FundraiserGrid;
