"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";

function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const signupHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup successful", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Signup in process..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        className="p-2 text-black"
        type="text"
        placeholder="type username"
        onChange={(e) => {
          setUser({
            ...user,
            username: e.target.value,
          });
        }}
        value={user.username}
      />
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 text-black"
        type="text"
        placeholder="type email"
        onChange={(e) => {
          setUser({
            ...user,
            email: e.target.value,
          });
        }}
        value={user.email}
      />
      <hr />
      <label htmlFor="password">password</label>
      <input
        className="p-2 text-black"
        type="password"
        placeholder="type password"
        onChange={(e) => {
          setUser({
            ...user,
            password: e.target.value,
          });
        }}
        value={user.password}
      />
      <br />

      <button
        className="bg-purple-700 text-yellow-200 p-3 mt-2"
        onClick={signupHandler}
      >
        {buttonDisable ? "Fill all details for Signup" : "Signup"}
      </button>
      <hr />
      <br />
      <Link href={"login"}>Visit Login Page</Link>
    </div>
  );
}

export default Signup;
