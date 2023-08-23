"use client";

import "./styles/Buttons.scss";
import ProfileLink from "@/components/Home/ProfileLink";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="w-full h-full flex justify-center items-center bg-center bg-no-repeat bg-cover bg-main">
      <ProfileLink />
      <button
        onClick={() => router.replace("/game")}
        className="buttonStyleOne"
      >
        Play Now
      </button>
    </main>
  );
}
