"use client";

import {
  FaFacebookF,
  FaX,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-filter text-light py-6 mt-10 px-2 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold text-gray-900">
          Charity Finder
        </div>

        <div className="flex space-x-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-light hover:text-[#12b76a] transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-light hover:text-[#12b76a] transition"
          >
            <FaX size={20} />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-light hover:text-[#12b76a] transition"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-light hover:text-[#12b76a] transition"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="text-light hover:text-[#12b76a] transition"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      <div className="container mx-auto flex justify-start items-center mt-4 text-sm">
        <div className="flex space-x-4">
          <a href="#" className="text-light hover:text-[#12b76a] transition">
            Terms of Service
          </a>
          <a href="#" className="text-light hover:text-[#12b76a] transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
