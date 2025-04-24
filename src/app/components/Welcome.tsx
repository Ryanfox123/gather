"use client";
import React from "react";
import { Playwrite_RO } from "next/font/google";
import { useSession } from "next-auth/react";

const playwrite = Playwrite_RO({ weight: "400" });
function Welcome() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return <p>Not signed in</p>;

  return (
    <div>
      <div className="mx-auto w-fit mt-20 text-black ">
        <h1 className="text-3xl text-center">
          Welcome, {session.user?.name || "There"} 👋{" "}
        </h1>
      </div>
    </div>
  );
}

export default Welcome;
