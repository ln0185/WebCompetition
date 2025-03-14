"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navBar/NavBar";
import Image from "next/image";
import Search from "@/components/search/Search";
import CharityGrid from "../components/charityGrid/CharityGrid";
import NonprofitGrid from "../components/nonProfitGrid/NonprofitGrid";

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

interface Charity {
  ein: string;
  name: string;
  description?: string;
  coverImageCloudinaryId?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  profileUrl?: string;
  websiteUrl?: string;
  location?: string;
  tags?: string[];
}

export default function Page() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateSelectedCharity = (charity: Fundraiser) => {
    // Reorder the fundraisers array: selected charity first, followed by related ones
    const reorderedFundraisers = [
      charity,
      ...fundraisers.filter((f) => f.title !== charity.title), // Add the rest
    ];
    setFundraisers(reorderedFundraisers);
  };

  useEffect(() => {
    const fetchFundraisers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/fundraisers?take=50", {
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
            .filter((fundraiser: Fundraiser) => fundraiser.coverImageUrl);

          setFundraisers(fundraiserData);
        } else {
          setError("No fundraisers found");
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

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

      {/* Added Nonprofit Grid Section */}
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
          <NonprofitGrid />
        </div>
      </div>
      <div className="relative bg-slate-200">
        <Search
          onSelectCharity={(charity) => {
            const fundraiser = mapCharityToFundraiser(charity);
            updateSelectedCharity(fundraiser);
          }}
        />
      </div>
      {/* Existing Charity Grid */}
      <CharityGrid
        fundraisers={fundraisers}
        onCharityClick={updateSelectedCharity}
      />
    </div>
  );
}

/*
<div className="relative bg-slate-200">
  <Search
    onSelectCharity={(charity) => {
      const fundraiser = mapCharityToFundraiser(charity);
      updateSelectedCharity(fundraiser);
    }}
  />
</div>

<CharityGrid
  fundraisers={fundraisers}
  onCharityClick={updateSelectedCharity}
/>

*/
