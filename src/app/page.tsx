"use client";

import Link from "next/link";
import "./styles/Buttons.scss";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <main className="w-full h-full flex justify-center items-center bg-center bg-no-repeat bg-cover bg-main">
      <Link href="/profile" className="absolute top-0 right-0 m-4">
        <Icon icon="ei:user" className="text-5xl"/>
      </Link>
      <button type="button" className="buttonStyleOne">
        Play Now
      </button>
    </main>
  );
}
