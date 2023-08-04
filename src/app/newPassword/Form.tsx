"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";

export default function Form() {
  const [password, setPassword] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });

  const [noMatch, setNoMatch] = useState(false);

  const handleChangePassword = (e: FormEvent) => {
    try {
      e.preventDefault();
      console.log(password);
      if (password.newPassword !== password.repeatNewPassword) {
        return setNoMatch(true);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={handleChangePassword}
      className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
    >
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          New Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={password.newPassword}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={password.repeatNewPassword}
          onChange={(e) =>
            setPassword({ ...password, repeatNewPassword: e.target.value })
          }
        />
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="newsletter"
            aria-describedby="newsletter"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="newsletter"
            className="font-light text-gray-500 dark:text-gray-300"
          >
            I accept the{" "}
            <Link
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="/termsAndConditions"
            >
              Terms and Conditions
            </Link>
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Reset passwod
      </button>
      {noMatch && <h4 className="text-red-600">Passwords do not match.</h4>}
    </form>
  );
}
