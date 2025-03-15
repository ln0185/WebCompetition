"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-custom-light py-3 px-8 flex items-center z-50">
      <h1 className="text-xl font-bold text-gray-900">Charity Finder</h1>
      <div className="ml-auto flex items-center space-x-6">
        <ul className="flex space-x-6">
          <li>
            <a
              href="#donate-section"
              className="text-gray-900 hover:text-[#12b76a] transition"
            >
              Discover Non Profits
            </a>
          </li>
          <li>
            <a
              href="#donate-section"
              className="text-gray-900 hover:text-[#12b76a]  transition"
            >
              Discover Fundraisers
            </a>
          </li>
        </ul>
        <a href="#donate-section">
          <button className="bg-button-color text-white hover:bg-[#139357] px-4 py-2 rounded-lg">
            Donate Now
          </button>
        </a>
      </div>
    </nav>
  );
}
