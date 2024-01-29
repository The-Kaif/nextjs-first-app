// components/SideBar.tsx
"use client"; // Assuming you're using the `client` module
import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define the SideBar component
const SideBar: React.FC = () => {
  // Extract user ID from the URL
  const userId = window.location.pathname.split("/")[2];
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
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      {/* Home link */}
      <Link
        className={`block p-2 text-center ${
          activeRoute === "home" ? "bg-gray-100 text-black rounded-xl" : ""
        }`}
        href={`/profile/${userId}/home`}
        passHref
      >
        Home
      </Link>

      {/* About link */}
      <Link
        className={`block p-2 text-center ${
          activeRoute === "about" ? "bg-gray-100 text-black rounded-xl" : ""
        }`}
        href={`/profile/${userId}/about`}
        passHref
      >
        About
      </Link>

      {/* Separator and Logout button */}
      <br />
      <hr />
      <br />
      <br />
      <br />
      <br />

      {/* Logout button */}
      <div
        onClick={logoutHandler}
        className="block cursor-pointer p-2 bg-red-600 text-white rounded-xl text-center"
      >
        {loading ? "Logout..." : "Logout"}
      </div>
    </aside>
  );
};

// Export the SideBar component
export default SideBar;
