"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingPageHeader from '@/components/LandingPageHeader';
import { InfiniteMovingLogos } from '@/components/InfiniteMovingLogos';
import Footer from '@/components/Footer';

const defaultLogos = [
  { src: import.meta.env.BASE_URL + "teams.png", alt: "Microsoft Teams Logo", label: "Microsoft Teams" },
  { src: import.meta.env.BASE_URL + "webex.png", alt: "Webex Logo", label: "Webex" },
  { src: import.meta.env.BASE_URL + "slack.png", alt: "Slack Logo", label: "Slack" },
  { src: import.meta.env.BASE_URL + "zoomm.png", alt: "Zoom Logo", label: "Zoom" },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <LandingPageHeader />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 text-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white font-display">
              AI assistant for meetings - past or present.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Get instant answers, automate note-taking, and streamline your workflow. Teacheat keeps you organized, calm, and moving forward.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/waitlist">
                <Button className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 rounded-md px-8 py-3 text-lg font-medium">
                  Join the Waitlist
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-8 py-3 text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          {/* Placeholder for some visual element, e.g., a screenshot or illustration */}
          <div className="mt-16 max-w-6xl mx-auto px-4">
            <img
              src={import.meta.env.BASE_URL + "mockup-placeholder.png"} // Placeholder image
              alt="Product Mockup"
              className="w-full h-auto rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
            />
          </div>
        </section>

        {/* Logos Section */}
        <section className="w-full py-16 bg-white dark:bg-gray-900 text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
            Trusted by people working at
          </p>
          <InfiniteMovingLogos items={defaultLogos} speed="normal" />
        </section>

        {/* Features Section (Placeholder) */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white font-display">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Feature One</h3>
                <p className="text-gray-600 dark:text-gray-400">Brief description of an amazing feature that helps users.</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Feature Two</h3>
                <p className="text-gray-600 dark:text-gray-400">Another compelling feature that solves a common problem.</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Feature Three</h3>
                <p className="text-gray-600 dark:text-gray-400">A third feature highlighting the product's unique selling points.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section (Placeholder) */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white font-display">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <p className="italic text-gray-700 dark:text-gray-300 mb-4">"This product has transformed my workflow!"</p>
                <p className="font-semibold text-gray-900 dark:text-white">- Jane Doe</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <p className="italic text-gray-700 dark:text-gray-300 mb-4">"Absolutely essential for anyone in my field."</p>
                <p className="font-semibold text-gray-900 dark:text-white">- John Smith</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section (Placeholder) */}
        <section className="py-20 bg-gray-900 dark:bg-gray-700 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6 font-display">Ready to Get Started?</h2>
            <p className="text-xl mb-8">Join our waitlist today and experience the future of meeting productivity.</p>
            <Link to="/waitlist">
              <Button className="bg-white text-gray-900 hover:bg-gray-200 rounded-md px-8 py-3 text-lg font-medium">
                Join the Waitlist
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;