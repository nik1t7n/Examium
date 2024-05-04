import React from "react";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-300 mb-4">
          Welcome to Exam Preparation Site
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 mb-4">
          Get ready for your exams with our comprehensive study materials and practice tests.
        </p>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          Made by <span className="text-purple-600 dark:text-purple-300">Nik1t7n</span>
        </p>
      </div>
      <Navbar />
    </div>
  );
};

export default HomePage;
