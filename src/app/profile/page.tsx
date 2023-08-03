"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  
  React.useEffect(() => {
    router.replace("/signUp");
  }, []);

  return <div>page</div>;
}
