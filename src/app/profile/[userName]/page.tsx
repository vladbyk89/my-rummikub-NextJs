"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/user/userSlice";
import { resetUser } from "@/redux/features/user/userSlice";
import axios from "axios";

export function generateMetadata({ params }: { params: { userName: string } }) {
  const { userName } = params;

  return {
    title: `${userName} Profile Page`,
  };
}

export default function UserProfile({
  params,
}: {
  params: { userName: string };
}) {
  const { userName } = params;
  const storeUser = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await axios.delete("/api/users/logout");

    dispatch(resetUser());
  };

  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-2">
      <div>UserID: {userName}</div>
      <Link href={"/"}>
        <button onClick={handleLogout}>Logout</button>
      </Link>
    </main>
  );
}
