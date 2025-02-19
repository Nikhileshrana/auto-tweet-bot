"use client";
import axios from "axios";
import React from "react";

const Page = () => {
  const start = async () => {
    try {
      const response = await axios.post("/api/cron");
      console.log(response.data);
    } catch (error) {
      console.error("❌ Error fetching tour packages:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6">
      {/* Heading Section */}
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">
        Welcome to <span className="text-yellow-500">Indian Travel Tour Automated Bot Panel</span>
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mb-6">
        This is a frontend panel to test the automated bots for posting tweets and LinkedIn posts.
        <a href="https://x.com/indiantravltour" target="_blank" className="font-semibold text-blue-500 underline ml-1">X (Twitter)</a>
        and <a href="https://www.linkedin.com/in/dunirana/" target="_blank" className="font-semibold text-blue-500 underline ml-1">LinkedIn</a> seamlessly.
      </p>

      {/* Test Cron Button */}
      <button
        onClick={start}
        className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-all duration-300"
      >
        🔄 Test New Cron
      </button>

      {/* Documentation Section */}
      <div className="mt-14 w-full max-w-5xl bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 border-b pb-3 mb-6">
          📖 Project Documentation - 
          <a href="https://www.indiantraveltour.com/" target="_blank" className="text-blue-500 underline ml-1">www.indiantraveltour.com</a>
        </h2>

        {/* Do's Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-green-600 mb-3">✅ Do's</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            <li>Use them wisely specified a gap of 2 hours to not get caught for being a bot.</li>
            <li>If not working/Errors contact : <strong> realnikhileshrana@gmail.com </strong></li>
            <li>Cron Jobs will automatically hit in a day at a specific interval.</li>
            <li>
              If the LinkedIn Bot is not working, it might be due to an expired token.
              <br />➡ Get a new ACCESS TOKEN from <a href="https://developer.linkedin.com/" className="text-blue-500 underline">LinkedIn Developer</a>.
            </li>
          </ul>
        </div>

        {/* Don'ts Section */}
        <div>
          <h3 className="text-2xl font-semibold text-red-600 mb-3">❌ Don'ts</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            <li>Avoid trying again and again this might lead to exaustion of Tokens</li>
            <li>Don’t ignore failed API responses or errors.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
