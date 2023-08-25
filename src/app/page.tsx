"use client";

import "./styles/Buttons.scss";
import ProfileLink from "@/components/Home/ProfileLink";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full flex justify-center items-center bg-center bg-no-repeat bg-cover bg-main">
      <ProfileLink />
      <button className="buttonStyleOne">
        <Link href="/game">Play Now</Link>
      </button>
    </main>
  );
}
