import React, { useEffect, useState } from 'react';

interface Props {}

const ThemeToggler = (props: Props) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={toggleTheme}
        className={`w-12 h-6 rounded-full p-1 flex items-center transition-all duration-500 ${
          theme === "light"
            ? "bg-indigo-300 dark:bg-purple-300"
            : "bg-gray-700 dark:bg-gray-600"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full transform transition-transform duration-500 ${
            theme === "light"
              ? "bg-yellow-400 translate-x-0"
              : "bg-white translate-x-6"
          }`}
        />
        <div
          className={`w-4 h-4 rounded-full transform transition-transform duration-500 ${
            theme === "light"
              ? "bg-white translate-x-2"
              : "bg-yellow-400 translate-x-[-1rem]"
          }`}
        />
      </button>
    </div>
  );
};

export default ThemeToggler;