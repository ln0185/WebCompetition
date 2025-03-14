import { useState, useEffect } from "react";

const API_URL = "https://partners.every.org/v0.2/search";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

type Charity = {
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
};

export default function Search({
  onSelectCharity,
}: {
  onSelectCharity: (charity: Charity) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  // Fetch data after query change
  useEffect(() => {
    if (!query) {
      setResults([]); // Clear results if query is empty
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/${query}?apiKey=${API_KEY}&take=6`);
        const data = await res.json();
        setResults(data.nonprofits as Charity[]); // Set results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setLoading(false);
    };

    // Debounce the fetch to avoid too many API calls
    if (debounceTimeout) clearTimeout(debounceTimeout);
    const timeout = setTimeout(fetchData, 500);
    setDebounceTimeout(timeout);

    // Clean up timeout on component unmount
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1)); // Move selection down
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0)); // Move selection up
    } else if (e.key === "Enter" && results[selectedIndex]) {
      onSelectCharity(results[selectedIndex]); // Select charity on Enter
      setQuery(""); // Clear query
      setResults([]); // Hide dropdown
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="absolute w-full max-w-md mx-auto right-1">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query on input change
        onKeyDown={handleKeyDown} // Handle keyboard events
        placeholder="Search charities..."
        className="w-4/6 p-4 border border-gray-400 rounded-[100px] bg-gray-50"
      />

      {/* Show loading spinner */}
      {loading && query && results.length === 0 && (
        <p className="text-gray-500 text-sm">Loading...</p>
      )}

      {/* Show dropdown with results */}
      {results.length > 0 && (
        <ul className="absolute w-4/6 bg-white border rounded-lg  mt-1 z-30 overflow-hidden">
          {results.map((charity, index) => (
            <li
              key={charity.ein || index}
              className={`p-2 cursor-pointer ${
                index === selectedIndex ? "bg-gray-200 " : ""
              }`}
              onMouseDown={() => {
                onSelectCharity(charity); // Select charity on click
                setQuery(""); // Clear query
                setResults([]); // Hide dropdown
                setLoading(false); // Stop loading
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
