// Import necessary modules and libraries
"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

// Define the functional component named 'page'
function ForgotPassword() {
  // State variables for managing the email input, loading state, and handling email sending
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle the email sending process
  const emailSendHandler = async () => {
    // Validate if the email is not empty
    if (email === "") {
      toast.error("Please enter a valid email");
    } else {
      try {
        // Set loading state to true before making the API request
        setLoading(true);

        // Make a POST request to the '/api/users/forgotpassword' endpoint with the email data
        const res = await axios.post("/api/users/forgotpassword", { email });

        // Display a success message using toast
        toast.success("Email sent successfully");
      } catch (error: any) {
        // Log and display an error message if the API request fails
        console.log(error.message);
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
            {loading ? "Processing..." : "Forgot Password"}
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
                type="email"
                value={email}
                placeholder="Please enter your email address"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            {/* Button to send email */}
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

// Export the component as the default export
export default ForgotPassword;
