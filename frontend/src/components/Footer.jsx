import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#d7d7d7] text-gray-700 py-6 mt-8 border-t-2 border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[#52cc99]">Mental Health Awareness</h3>
          <p className="text-sm text-gray-600 mt-2">
            Promoting mental well-being and offering support.
          </p>
        </div>
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="/about"
            className="text-[#52cc99] hover:text-[#3aa87b] transition-colors"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-[#52cc99] hover:text-[#3aa87b] transition-colors"
          >
            Contact
          </a>
          <a
            href="/privacy-policy"
            className="text-[#52cc99] hover:text-[#3aa87b] transition-colors"
          >
            Privacy Policy
          </a>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Mental Health Awareness. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
