"use client";
<<<<<<< HEAD

/*
------
non profits display
------
=======
>>>>>>> 3b9da476de215bc676a8bae47cdbcba419b08963
import { useEffect, useState } from "react";
import Navbar from "../components/navBar/NavBar";
import Image from "next/image";
import CharityGrid from "@/components/charityGrid/CharityGrid";

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

export default function Page() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFundraisers = async () => {
      setIsLoading(true);
      try {
<<<<<<< HEAD
        const response = await fetch("/api/nonprofits", {
=======
        const response = await fetch("/api/fundraisers?take=50", {
>>>>>>> 3b9da476de215bc676a8bae47cdbcba419b08963
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error fetching fundraisers");
        }
        const data = await response.json();
        console.log("Fetched Fundraisers Data:", data);

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
            .filter((fundraiser) => fundraiser.coverImageUrl);

          setFundraisers(fundraiserData);
        } else {
<<<<<<< HEAD
          setCategories(data.categories.data.nonprofit); //for the charity basics nonprofits --- for the categories nonprofitTags
=======
          setError("No fundraisers found");
>>>>>>> 3b9da476de215bc676a8bae47cdbcba419b08963
        }
      } catch (err) {
        setError("Error fetching data");
        console.error("Error in fetch:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFundraisers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

<<<<<<< HEAD
  return (
    <div className="p-10 m-10">
      <h1 className="text-2xl font-bold">Charities Categories</h1>
      {categories && categories.length > 0 ? (
        <ul className="mt-4">
          {categories.map((category, index) => (
            <li key={index} className="mb-10">
              <p>
                <strong>Name:</strong>{" "}
                {category.title || "No details available."}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {category.descriptionLong || "No description available."}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {category.id || "No details available."}
              </p>

              <Image
                src={category.coverImageUrl || "/images/charity.jpg"}
                alt="Img or fallback img"
                width={100}
                height={100}
              />

              {/* Add more fields as needed */ /* }
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}
*/

/* -----CATEGORIES
import { useState, useEffect } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unknown error");
        setCategories(data.categories); // Assuming 'categories' is the array in the response
      } catch (err) {
        setError("Failed to load categories");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {error && <p>{error}</p>}
      <ul>
        {categories.map((category, index) => (
          // Assuming category has categoryId and categoryDesc properties
          <li key={index}>
            <strong>{category.categoryId}</strong>: {category.categoryDesc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
 */

/* ----- The charity names
import { useEffect, useState } from "react";

export default function Page() {
  const [charities, setCharities] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await fetch("/api/charities");
        const data = await res.json();
        console.log("Charities API Response:", data);

        if (!res.ok) throw new Error(data.error || "Unknown error");
        setCharities(data.charities); // Update with the correct data format
      } catch (err) {
        setError("Failed to load charities");
        console.error(err);
      }
    };

    fetchCharities();
  }, []);
=======
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
>>>>>>> 3b9da476de215bc676a8bae47cdbcba419b08963

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
      <CharityGrid fundraisers={fundraisers} />
    </div>
  );
}
