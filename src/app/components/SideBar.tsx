"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
const SideBar: React.FC = () => {
  const userId = window.location.pathname.split("/")[2];
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logoutHanlder = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [activeRoute, setActiveRoute] = useState(
    window.location.pathname.split("/")[3]
  );

  useEffect(() => {
    const path = window.location.pathname.split("/")[3];
    setActiveRoute(path);
  }, [window.location.pathname]);

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <Link
        className={`block p-2 text-center ${
          activeRoute === "home"
            ? "bg-gray-100 text-black rounded-xl"
            : ""
        }`}
        href={`/profile/${userId}/home`}
        passHref
      >
        Home
      </Link>
      <Link
        className={`block p-2 text-center ${
          activeRoute === "about"
            ? "bg-gray-100 text-black rounded-xl"
            : ""
        }`}
        href={`/profile/${userId}/about`}
        passHref
      >
        About
      </Link>
      <br />

      <hr />
      <br />
      <br />
      <br />
      <br />

      <div
        onClick={logoutHanlder}
        className="block cursor-pointer p-2 bg-red-600 text-white rounded-xl text-center"
      >
        {loading ? "Logout..." : "Logout"}
      </div>
    </aside>
  );
};

export default SideBar;
