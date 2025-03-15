"use client";

import React from "react";
import Image from "next/image";
import handHeart from "./../../../public/hand-heart.svg";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="hidden md:flex justify-center w-[95%] bg-filter py-6">
      <div className="w-full max-w-[1240px] mx-auto">
        {/* Title Aligned with First Button */}
        <h2 className="text-md font-light mb-4 text-left ml-[15px]">
          Browse by category
        </h2>

        {/* Category Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full ml-[15px]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full max-w-[400px] h-[105px] rounded-[16px] text-sm font-medium transition-colors relative flex flex-col justify-between px-6 py-4 pr-12
                ${
                  selectedCategory === category
                    ? "bg-button-color text-white"
                    : "bg-custom-light text-gray-900 hover:bg-button-color hover:text-white"
                }`}
            >
              {/* Category Title and Subtext */}
              <div className="text-left flex flex-col flex-grow space-y-2">
                {/* Category Title */}
                <span className="font-semibold text-base md:text-lg">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>

                {/* "Support for" Text */}
                <p className="text-xs md:text-sm font-normal mt-1">
                  Support for{" "}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </p>
              </div>

              {/* Hand Heart Icon Positioned on the Right */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <Image
                  src={handHeart}
                  alt="Hand Heart Icon"
                  width={32}
                  height={32}
                  className="transition-all duration-300 ease-in-out filter invert-0 hover:invert"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
