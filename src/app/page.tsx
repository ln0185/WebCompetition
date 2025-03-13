"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CharityPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          method: "GET",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data.categories.data.nonprofitTags); //for the charity basics nonprofits --- for the categories nonprofitTags
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
    <div className="p-4">
      <h1 className="text-2xl font-bold">Charities Categories</h1>
      {categories && categories.length > 0 ? (
        <ul className="mt-4">
          {categories.map((category, index) => (
            <li key={index} className="mb-2">
              <p>
                <strong>Cause:</strong>{" "}
                {category.causeCategory || "No details available."}
              </p>
              <p>
                <strong>title:</strong>{" "}
                {category.title || "No description available."}
              </p>
              <p>
                <strong>Details:</strong>{" "}
                {category.tagName || "No details available."}
              </p>
              <p>
                <strong>tagUrl:</strong>{" "}
                {category.tagUrl || "No details available."}
              </p>
              <Image
                src={category.tagImageUrl || "/fallback"}
                alt="Img"
                width={100}
                height={100}
              />

              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}
