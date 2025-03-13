import React from "react";
import Image from "next/image";

type Category = {
  causeCategory: string;
  title: string;
  tagName: string;
  tagUrl: string;
  tagImageUrl: string;
};

type CharityGridProps = {
  categories: Category[];
};

const CharityGrid: React.FC<CharityGridProps> = ({ categories }) => {
  return (
    <div className="relative w-full h-auto bg-white">
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl px-4">
          {categories && categories.length > 0 ? (
            categories.map((category, index) => (
              <div
                key={index}
                className="bg-slate-300 rounded-lg flex flex-col justify-between items-center p-6 w-full h-auto shadow-lg"
              >
                <Image
                  src={category.tagImageUrl || "/fallback"}
                  alt="Category Image"
                  width={100}
                  height={100}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {category.title || "No title available"}
                </h3>
                <p className="text-sm mb-2">
                  <strong>Cause:</strong>{" "}
                  {category.causeCategory || "No details available."}
                </p>
                <p className="text-sm mb-2">
                  <strong>Details:</strong>{" "}
                  {category.tagName || "No details available."}
                </p>
                <p className="text-sm mb-2">
                  <strong>Tag URL:</strong>{" "}
                  {category.tagUrl || "No details available."}
                </p>
              </div>
            ))
          ) : (
            <div>No categories found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharityGrid;
