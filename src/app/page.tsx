"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface Charity {
  name: string;
  description?: string;
  spending?: { programs: number; admin: number; fundraising: number };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function Page() {
  const [charityName, setCharityName] = useState("");
  const [charity, setCharity] = useState<Charity | null>(null);
  const [error, setError] = useState("");

  const fetchCharity = async () => {
    setError("");
    setCharity(null);
    try {
      const res = await fetch(
        `/api/charities?name=${encodeURIComponent(charityName)}`
      );
      const data = await res.json();
      console.log("API Response:", data);
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setCharity(data);
    } catch (err) {
      setError("Charity not found or failed to load");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Charity Spending Tracker</h1>
      <input
        type="text"
        value={charityName}
        onChange={(e) => setCharityName(e.target.value)}
        placeholder="Enter charity name"
        className="border p-2 rounded mb-4"
      />
      <button
        onClick={fetchCharity}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {charity && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">{charity.name}</h2>
          <p className="text-gray-600">{charity.description}</p>
          {charity.spending && (
            <PieChart width={300} height={300}>
              <Pie
                data={Object.entries(charity.spending).map(
                  ([key, value], index) => ({
                    name: key,
                    value,
                    color: COLORS[index % COLORS.length],
                  })
                )}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(charity.spending).map(([key], index) => (
                  <Cell key={key} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </div>
      )}
    </div>
  );
}
