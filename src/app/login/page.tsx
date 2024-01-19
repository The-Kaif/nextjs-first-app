"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password:""
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2"
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
        className="p-2"
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
      <button className="bg-purple-700 text-yellow-200 p-3 mt-2">
        Login Here
      </button>
      <hr />
      <Link href={"signup"}>Visit Signup Page</Link>
    </div>
  );
}

export default Login;
