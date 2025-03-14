"use client";

import { useState, useEffect } from "react";

const API_URL = "https://partners.every.org/v0.2/search";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type Charity = {
  ein: string;
  name: string;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    //getting the data from the charitySearch api
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/${query}?apiKey=${API_KEY}&take=20`,
        );
        const data = await res.json();
        setResults(data.nonprofits as Charity[]); // Type assertion
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setLoading(false);
    };

    // a little wait for the fetching(500ms)
    const debounce = setTimeout(fetchData, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      console.log("Selected:", results[selectedIndex]);
      setQuery(results[selectedIndex].name); // Set input to selected result
      setResults([]); // Hide dropdown
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search charities..."
        className="w-full p-2 border rounded"
      />

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}

      {results.length > 0 && (
        <ul className="absolute w-full bg-white border rounded shadow mt-1">
          {results.map((charity, index) => (
            <li
              key={charity.ein}
              className={`p-2 cursor-pointer ${
                index === selectedIndex ? "bg-gray-200" : ""
              }`}
              onMouseDown={() => {
                setQuery(charity.name);
                setResults([]);
              }}
            >
              {charity.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
