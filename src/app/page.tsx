"use client";

import { useEffect, useState } from "react";
import CharityGrid from "@/components/charityGrid/CharityGrid";
import Navbar from "./../components/navBar/NavBar";
import Image from "next/image";

interface Category {
  causeCategory: string;
  title: string;
  tagName: string;
  tagUrl: string;
  tagImageUrl: string;
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data.categories.data.nonprofitTags);
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      {/* First Section - Charity Finder */}
      <div className="relative w-full h-screen flex items-center justify-center bg-white">
        <Navbar />

        {/* Background Image */}
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

        {/* Title Section */}
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

      {/* Filter Section */}
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

      {/* Grid Section */}
      <CharityGrid categories={categories} />
    </div>
  );
}
