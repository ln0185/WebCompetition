"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white py-3 px-8 flex items-center z-50">
      <h1 className="text-xl font-bold text-gray-800">Charity Finder</h1>
      <div className="ml-auto flex items-center space-x-6">
        <ul className="flex space-x-6">
          <li>
            <a
              href="#nonprofits-section"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Discover Non Profits
            </a>
          </li>
          <li>
            <a
              href="#fundraisers-section"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Discover Fundraisers
            </a>
          </li>
        </ul>
        <a href="#donate-section">
          <button className="bg-button-color text-white px-4 py-2 rounded-lg">
            Donate Now
          </button>
        </a>
      </div>
    </nav>
  );
}
