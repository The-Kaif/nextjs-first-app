"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const loginHanlder = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Login"}</h1>
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
      <button
        onClick={loginHanlder}
        className="bg-purple-700 text-yellow-200 p-3 mt-2"
      >
        {buttonDisable ? "Fill all details for Login" : "Login"}
      </button>
      <hr />
      <Link href={"signup"}>Visit Signup Page</Link>

      <br/>
      <p>Forget Password Click here: <Link className="bg-blue-500 text-white p-2" href={"/forgotpassword"}>Forgot Password</Link></p>
    </div>
  );
}

export default Login;
