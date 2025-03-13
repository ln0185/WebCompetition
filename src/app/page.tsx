"use client";
import Navbar from "./../components/navBar/NavBar";

import Image from "next/image";

export default function Page() {
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
        {" "}
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
      <div className="relative w-full h-screen bg-slate-200">
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="grid grid-cols-3 gap-4 w-full max-w-7xl">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg flex justify-center items-center w-[380px] h-[400px]"
              >
                <div className="flex justify-center items-center text-gray-800 font-semibold text-xl">
                  Tile {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
