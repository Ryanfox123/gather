"use client";
import React from "react";
import { useSession } from "next-auth/react";

function Welcome() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session)
    return (
      <p className="mx-auto w-fit mt-20 text-black ">
        Please sign in to view your events
      </p>
    );

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
