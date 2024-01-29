"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const emailSendHandler = async () => {
    if (email === "") {
      toast.error("Please enter a valid email");
    } else {
      try {
        setLoading(true);
        const res = await axios.post("/api/users/forgotpassword", { email });
        console.log(res.data);
        toast.success("Email sent successfully");
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {loading ? "Processing..." : "Forgot Password"}
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                placeholder="Please enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button
              onClick={emailSendHandler}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
