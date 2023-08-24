"use client";

import React from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/user/userSlice";
import { resetUser } from "@/redux/features/user/userSlice";
import axios from "axios";

export default function Logout() {
  const storeUser = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await axios.delete("/api/users/logout");

    dispatch(resetUser());
  };

  return (
    <Link href={"/"}>
      <button onClick={handleLogout}>Logout</button>
    </Link>
  );
}
