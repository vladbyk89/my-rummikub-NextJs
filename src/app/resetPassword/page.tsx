"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const sendResetPasswordEmail = async (e: FormEvent) => {
    e.preventDefault();
    console.log("sendEmail");
    const { data } = await axios.post("/api/users/resetPassword/sendEmail", {
      email,
    });
    if (!data.ok) {
      setEmailError(true);
    } else {
      setEmailSent(true);
    }
  };

  return (
    <main className="antialiased bg-slate-200 h-full flex justify-center items-center">
      <div className="max-w-lg mx-auto  bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-4xl font-medium">Reset password</h1>
        <p className="text-slate-500">
          Fill in your email to reset the password
        </p>

        <form onSubmit={sendResetPasswordEmail} className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <button
              disabled={email.length < 8 && true}
              className={`w-full py-3 font-medium text-white bg-indigo-600  rounded-lg border-indigo-500 ${
                email.length > 8 && "hover:shadow hover:bg-indigo-500"
              } inline-flex space-x-2 items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>

              <span>Reset password</span>
            </button>
            <p className="text-center">
              Not registered yet?{" "}
              <Link
                href="/register"
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center hover:underline"
              >
                <span>Register now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </Link>
            </p>
            {emailError && <h6>Email does not exist in system</h6>}
            {emailSent && <h6>Check your email!</h6>}
          </div>
        </form>
      </div>
    </main>
  );
}
