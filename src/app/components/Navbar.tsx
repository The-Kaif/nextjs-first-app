// components/NavBar.tsx
"use client"; // Assuming you're using the `client` module
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define the NavBar component
const NavBar: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Logout handler function
  const logoutHandler = async () => {
    try {
      setLoading(true);
      // Make a request to the server to logout
      const response = await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      // Redirect to the login page after successful logout
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            {/* Sidebar toggle button */}
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              {/* You should include an SVG or an icon for the sidebar button */}
              {/* Example: <svg className="w-6 h-6" ... ></svg> */}
            </button>

            {/* Logo */}
            <div className="flex ms-5">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                LOGO
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div
              onClick={logoutHandler}
              className="block cursor-pointer p-2 bg-red-600 text-white rounded-xl text-center"
            >
              {loading ? "Logout..." : "Logout"}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export the NavBar component
export default NavBar;
