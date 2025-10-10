"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { X, Github, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-1 md:col-span-2 flex flex-col items-start">
          <Link to="/" className="relative flex items-center font-bold text-xl text-gray-900 dark:text-white mb-4">
            <img
              src={import.meta.env.BASE_URL + "bachelor-hat-icon.png"}
              alt="Teacheat Logo"
              className="absolute -top-6 right-0 h-10 w-10 transform rotate-12 dark:filter dark:invert"
            />
            <span className="mr-2">Teacheat</span>
          </Link>
          <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-4">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            All systems operational
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
          <Link to="/enterprise" className="text-sm hover:underline">Enterprise</Link>
          <Link to="/pricing" className="text-sm hover:underline">Pricing</Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resources</h3>
          <Link to="#" className="text-sm hover:underline">Blog</Link>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Legal</h3>
          <Link to="/privacy-policy" className="text-sm hover:underline">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-sm hover:underline">Terms of Service</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {currentYear} Teacheat. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="#" aria-label="X (Twitter)" className="hover:text-gray-700 dark:hover:text-gray-200">
            <X className="h-5 w-5" />
          </Link>
          <Link to="#" aria-label="Instagram" className="hover:text-gray-700 dark:hover:text-gray-200">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link to="#" aria-label="GitHub" className="hover:text-gray-700 dark:hover:text-gray-200">
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;