"use client";

/*
------
non profits display
------
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CharityPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/nonprofits", {
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
          setCategories(data.categories.data.nonprofit); //for the charity basics nonprofits --- for the categories nonprofitTags
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Charities</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Ensure charities is an array before mapping */ /* }
      <ul className="mt-4">
        {Array.isArray(charities) && charities.length > 0 ? (
          charities.map((charity: any) => (
            <li key={charity.ein} className="border p-2 rounded mb-2">
              <h2 className="font-semibold">{charity.charityName}</h2>
              <p>{charity.category}</p>
            </li>
          ))
        ) : (
          <p>No charities available</p> // If there are no charities
        )}
      </ul>
    </div>
  );
}
 */
