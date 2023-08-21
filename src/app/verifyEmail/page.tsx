"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
  // use state
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyUserEmail = async (token: string) => {
    try {
      const { data } = await axios.post("/api/users/verifyEmail", { token });

      if (data.Error) return setError(data.Error);
      setIsVerified(true);
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    verifyUserEmail(urlToken);
  }, []);

  return (
    <main className="h-full w-full flex justify-end items-center">
      <div className="p-6 ">
        <h1>Verify Email</h1>
        {isVerified && (
          <div>
            <h2>Email Verified</h2>
            <Link href="/login">Login</Link>
          </div>
        )}
        {error.length > 0 && <h2>{error}</h2>}
      </div>
    </main>
  );
}
