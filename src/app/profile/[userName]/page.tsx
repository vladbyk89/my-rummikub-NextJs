"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [loggedUser, setLoggedUser] = useState({
    id: "",
    email: "",
    password: "",
    userName: "",
  });

  const getUserData = async () => {
    const { data } = await axios.get("/api/users/userData");
    setLoggedUser(data);
  };

  useEffect(() => {
    // getUserData(); 
  }, []);

  return <div>UserID: {userName}</div>;
}
