"use client";
import { useState } from "react";
import Navbar from "../components/navBar/NavBar";
import Image from "next/image";
import FundraiserGrid from "../components/fundraiserGrid/FundraiserGrid";
import NonprofitGrid from "../components/nonProfitGrid/NonprofitGrid";
import FilterBar from "../components/filterBar/FilterBar";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Define shared categories
  const categories = [
    "all",
    "animals",
    "environment",
    "oceans",
    "health",
    "education",
    "poverty",
    "refugees",
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-screen flex items-center justify-center bg-white">
        <Navbar />
        <div className="absolute flex justify-center bottom-6 z-1">
          <Image
            src="/background.jpg"
            alt="Background"
            width={0}
            height={0}
            sizes="98vw"
            className="w-[98vw] h-[90vh] rounded-2xl object-cover"
          />
        </div>
        <div className="relative w-full h-full flex justify-end items-center p-10 z-10">
          <div className="absolute left-20 top-70 z-10 text-white">
            <h1 className="text-5xl font-bold mb-4">Donate with Confidence</h1>
            <h2 className="text-xl font-light max-w-lg">
              Giving should be simple and transparent. Discover where to donate
              and track how your contribution makes a difference.
            </h2>
          </div>
        </div>
      </div>
      <div className="relative w-full h-100 bg-slate-200">
        <div className="absolute top-12 left-20 z-10 text-gray-800">
          <h2 className="text-3xl font-semibold mb-4">
            Giving help to those who need it
          </h2>
          <h3 className="text-xl font-light max-w-lg mb-16">
            Discover organizations dedicated to positive change. Choose a cause
            that matters to you and see exactly where your donation goes.
          </h3>
        </div>
      </div>

      {/* Shared Filter Bar for both components */}
      <div className="w-full bg-slate-100 py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Browse by Category
          </h2>
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Nonprofit Grid Section */}
      <div className="w-full bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Featured Nonprofits
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Explore nonprofit organizations making a difference in various
            causes around the world. Support their missions by donating directly
            through their profiles.
          </p>
          <NonprofitGrid selectedCategory={selectedCategory} />
        </div>
      </div>

      {/* Fundraiser Grid - now only needs selectedCategory */}
      <FundraiserGrid selectedCategory={selectedCategory} />
    </div>
  );
}
