"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function page() {
    const router =useRouter()
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const { confirmPassword, password } = state;

  const savePasswordHandler = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Password is not match");
      }
      const res = await axios.post("/api/users/confirmpassword", {
        token,
        newPassword: password,
      });
      console.log("Password updated successfully", res.data);
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Reset Your Password</h1>
      <label htmlFor="password">Password</label>
      <input
        className="p-2 m-2 text-black"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => {
          setState({
            ...state,
            password: e.target.value,
          });
        }}
      />
      <br></br>
      <label htmlFor="password">Confrim Password</label>
      <input
        className="p-2 m-2 text-black"
        type="password"
        placeholder="Enter your confirm password"
        value={confirmPassword}
        onChange={(e) => {
          setState({
            ...state,
            confirmPassword: e.target.value,
          });
        }}
      />

      <button
        onClick={savePasswordHandler}
        className="bg-blue-500 text-white p-2 mt-4"
      >
        Save Password
      </button>
    </div>
  );
}

export default page;
