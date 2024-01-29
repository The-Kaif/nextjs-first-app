"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailAddress() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h2 className="p-2 text-black">
            {verified && (
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-xl p-4 bg-green-600 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
                  Now Your Email is Verified
                </h1>
                <Link
                  className="mt-5 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  href={"/login"}
                >
                  Login
                </Link>
              </div>
            )}

            {error && (
              <div>
                <h2 className="bg-red-600 text-white p-4 mb-5">
                  Error :/ OR You are already verified, Please Login To Check
                </h2>
                <Link
                  className="mt-5 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  href={"/login"}
                >
                  Login
                </Link>
              </div>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}
