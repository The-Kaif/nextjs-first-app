"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter();
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  useEffect(() => {
    if (state.password.length > 0 && state.confirmPassword.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [state]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const { confirmPassword, password } = state;

  const savePasswordHandler = async () => {
    if (buttonDisable) {
      toast.error("Please enter your password and confirm password");
    } else {
      try {
        if (password !== confirmPassword) {
          toast.error("Password is not match");
        } else {
          setLoading(true);
          const res = await axios.post("/api/users/confirmpassword", {
            token,
            newPassword: password,
          });
          console.log("Password updated successfully", res.data);
          toast.success("Password updated successfully");
          router.push("/login");
        }
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
            {loading ? "Processing..." : "Reset Your Password"}
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => {
                  setState({
                    ...state,
                    password: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="password"
              >
                Confrim Password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => {
                  setState({
                    ...state,
                    confirmPassword: e.target.value,
                  });
                }}
              />
            </div>

            <button
              onClick={savePasswordHandler}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save New Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
