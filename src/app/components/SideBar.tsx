// components/SideBar.tsx
"use client"; // Assuming you're using the `client` module
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Define the SideBar component
const SideBar: React.FC = () => {
  // Extract user ID from the URL
  const userId = window.location.pathname.split("/")[2];

  // State to track the active route in the sidebar
  const [activeRoute, setActiveRoute] = useState(
    window.location.pathname.split("/")[3]
  );

  // Effect to update the active route when the URL changes
  useEffect(() => {
    const path = window.location.pathname.split("/")[3];
    setActiveRoute(path);
  }, [() => window.location.pathname]);

  // Render the sidebar with links and logout button
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-10 md:w-64 lg:w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      {/* Sidebar content for larger screens */}
      <div>
        {/* Home link */}
        <Link
          className={`block p-2 text-center ${
            activeRoute === "home" ? "bg-gray-100 text-black rounded-xl" : ""
          }`}
          href={`/profile/${userId}/home`}
          passHref
        >
          <span className="hidden sm:block">Home</span>
          <span className="sm:hidden">H</span>
        </Link>

        {/* About link */}
        <Link
          className={`block p-2 text-center ${
            activeRoute === "about" ? "bg-gray-100 text-black rounded-xl" : ""
          }`}
          href={`/profile/${userId}/about`}
          passHref
        >
          <span className="hidden sm:block">About</span>
          <span className="sm:hidden">A</span>
        </Link>

        {/* Separator */}
        <br />
        <hr />
      </div>
    </aside>
  );
};

// Export the SideBar component
export default SideBar;
