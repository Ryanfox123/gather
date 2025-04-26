"use client";
import React, { useEffect } from "react";
import NavSearch from "./NavSearch";
import { Playwrite_RO } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const playwrite = Playwrite_RO({ weight: "400" });

function NavBar() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div className="fixed top-0 bg-white border-b-1 w-full h-14 flex flex-row gap-9 pl-8 ">
      <h2
        className={`${playwrite.className} text-2xl font-extrabold text-lightViolet my-auto`}
      >
        {" "}
        Gather
      </h2>
      <NavSearch />

      <ul className="flex flex-row gap-4 items-center text-black ml-auto pr-4 my-auto">
        <li>
          <button className="text-white bg-lightViolet p-2 text-sm rounded-2xl hover:bg-darkViolet cursor-pointer">
            Create an event
          </button>
        </li>
        <li className="hover:text-lightViolet cursor-pointer">Your events</li>
        <li className="hover:text-lightViolet cursor-pointer">Profile</li>
      </ul>
      <p
        className="text-red-500 my-auto pr-4 cursor-pointer"
        onClick={() => {
          signOut();
        }}
      >
        Sign out{" "}
      </p>
    </div>
  );
}

export default NavBar;
