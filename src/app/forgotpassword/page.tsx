"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function page() {
  const [email, setEmail] = useState("");

  const emailSendHandler = async () => {
    try {
      const res = await axios.post("/api/users/forgotpassword", { email });
      console.log(res.data);
      toast.success("Email sent successfully");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div>
        <h1>Forgot Password</h1>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          placeholder="Please enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 m-2 text-black"
        />
        <br />
        <button
          onClick={emailSendHandler}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default page;
