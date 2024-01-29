// Import necessary modules and libraries
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

// Define the functional component named 'Login'
function Login() {
  // State variables for managing user email, password, button disable state, and loading state
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  // Router instance for programmatic navigation
  const router = useRouter();

  // Effect to enable/disable the login button based on user inputs
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  // Function to handle the login process
  const loginHanlder = async () => {
    if (buttonDisable) {
      toast.error("Please enter your email address and password!!");
    } else {
      try {
        // Set loading state to true before making the API request
        setLoading(true);

        // Make a POST request to the '/api/users/login' endpoint with user data
        const response = await axios.post("/api/users/login", user);
        const userId = response.data?.data?.id;

        // Display a success message using toast
        toast.success("Login successful");

        // Redirect to the user's profile page
        router.push(`/profile/${userId}/home`);
      } catch (error: any) {
        // Log and display an error message if the login fails
        console.log("Login failed: ", error.response.data.error);
        toast.error(error.response.data.error);
      } finally {
        // Set loading state to false after the API request completes (whether success or failure)
        setLoading(false);
      }
    }
  };

  // JSX structure for the component's UI
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {loading ? "Processing..." : "Login"}
          </h1>
          <div className="space-y-4 md:space-y-6">
            {/* Email input */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="email"
                placeholder="Enter your email address"
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
                value={user.email}
              />
            </div>

            {/* Password input */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value,
                  });
                }}
                value={user.password}
              />
            </div>

            {/* Login button */}
            <button
              onClick={loginHanlder}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Login
            </button>

            {/* Additional links for new user signup and password reset */}
            <div className="flex justify-between">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                New User ?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Signup
                </Link>
              </p>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Forgot Password ?{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href={"/forgotpassword"}
                >
                  Reset
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the component as the default export
export default Login;
