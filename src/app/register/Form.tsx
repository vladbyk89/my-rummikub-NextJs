"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, SetStateAction, useEffect, useState } from "react";

export default function Form() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Use State
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSignIn = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      await axios.post("/api/users/register", newUser);

      router.push("/login");
    } catch (error: any) {
      console.log("Register failed", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      newUser.email.length > 5 &&
      newUser.username.length > 5 &&
      newUser.password.length > 5
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [newUser]);

  return (
    <>
      {isLoading ? (
        <h1 className="text-black text-center text-2xl">Processing...</h1>
      ) : (
        <>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign-In
            </Link>
          </p>
        </>
      )}
      <form onSubmit={handleSignIn} className="mt-8">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="userName"
              className="text-base font-medium text-gray-900"
            >
              {" "}
              UserName{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                type="text"
                placeholder="JohnDoe123"
                id="userName"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-base font-medium text-gray-900"
            >
              {" "}
              Email address{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                type="email"
                placeholder="john_doe@gmail.com"
                id="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Password{" "}
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                type="password"
                placeholder="***********"
                id="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
          </div>
          <button
            disabled={buttonDisabled}
            className={`inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white ${
              !buttonDisabled && "hover:bg-black/80"
            }`}
          >
            Create Account <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </form>
    </>
  );
}
