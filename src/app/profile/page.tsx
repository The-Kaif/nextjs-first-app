"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getUserDetails();
  // }, []);

  // const getUserDetails = async () => {
  //   const res = await axios.get("/api/users/me");
  //   console.log("user id", res.data.data._id);
  //   router.push(`/profile/${res.data.data._id}`);
  // };

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <br />
      <button
        onClick={logoutHanlder}
        className="bg-purple-700 text-yellow-200 p-3 mt-2"
      >
        {loading ? "Logout..." : "Logout"}
      </button>
    </div>
  );
}

export default Profile;
