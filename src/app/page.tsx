"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navBar/NavBar";
import Image from "next/image";
import FundraiserGrid from "../components/fundraiserGrid/FundraiserGrid";
import NonprofitGrid from "../components/nonProfitGrid/NonprofitGrid";
import FilterBar from "../components/filterBar/FilterBar";
import ArrowLogo from "./../../public/Arrow logo.svg";
import ArrowLogoFooter from "./../../public/Arrow Logo Footer.svg";
import Footer from "../components/footer/Footer";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGrid, setSelectedGrid] = useState<string>("nonprofits");

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
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleToggleGrid = (gridType: string) => {
    setSelectedGrid(gridType);
  };

  const scrollToSection = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      <div className="relative w-full h-screen flex items-center justify-center bg-custom-light">
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
        <div className="relative w-full h-full flex justify-center md:justify-end items-center p-10 z-10">
          <div className="absolute left-15 top-60 md:top-80 z-10 text-white">
            <h1 className="text-5xl md:text-7xl font-semibold mb-4 max-w-xl">
              Donate with Confidence
            </h1>
            <h2 className="text-lg md:text-2xl font-normal max-w-2xl">
              Giving should be simple and transparent. Discover where to donate
              and track how your contribution makes a difference.
            </h2>
            <div className="cursor-pointer mt-10" onClick={scrollToSection}>
              <Image
                src={ArrowLogo}
                alt="Arrow Logo"
                width={50}
                height={50}
                className="animate-bounce"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        id="next-section"
        className="relative w-full h-40 md:h-100 bg-custom-light"
      >
        <div className="absolute top-5 md:top-20 left-2 md:left-15 z-10 text-gray-900">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4 max-w-lg md:max-w-md">
            Giving help to those who need it
          </h2>
        </div>

        <div className="absolute top-20 md:top-50 px-2 md:right-15 z-10 text-gray-900">
          <h3 className="text-lg md:text-2xl font-normal max-w-3xl">
            Discover a network of impact driven initiatives. Your selected cause
            connects you to organizations and efforts working toward meaningful
            change.
          </h3>
        </div>
      </div>

      <div className="md:mt-0 w-full bg-filter py-6">
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div id="donate-section" className="w-full bg-custom-light py-6">
        <div className="container flex  md:justify-start justify-center md:ml-15 mb-12 space-x-6">
          {/* Text links for Non Profits and Fundraisers */}
          <span
            onClick={() => handleToggleGrid("nonprofits")}
            className={`text-xl sm:text-lg md:text-xl font-semibold cursor-pointer ${
              selectedGrid === "nonprofits" ? "underline" : ""
            }`}
          >
            Non Profits
          </span>
          <span
            onClick={() => handleToggleGrid("fundraisers")}
            className={`text-xl sm:text-lg md:text-xl font-semibold cursor-pointer ${
              selectedGrid === "fundraisers" ? "underline" : ""
            }`}
          >
            Fundraisers
          </span>
        </div>

        {selectedGrid === "nonprofits" && (
          <div className="w-full bg-custom-light">
            <div className="container mx-auto px-4">
              <NonprofitGrid selectedCategory={selectedCategory} />
            </div>
          </div>
        )}

        {selectedGrid === "fundraisers" && (
          <div className="w-full bg-custom-light">
            <div className="container mx-auto px-4">
              <FundraiserGrid
                fundraisers={fundraisers}
                selectedCategory={selectedCategory}
                setFundraisers={setFundraisers}
              />
            </div>
          </div>
        )}
        {/* Back to Top Button - Hidden on Mobile */}
        <div className="w-full md:flex justify-end my-6 hidden md:px-8">
          <button
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className="p-2 transition-colors"
          >
            <Image
              src={ArrowLogoFooter}
              alt="Back to Top"
              width={50}
              height={50}
              className="cursor-pointer transition transform hover:scale-110"
            />
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
