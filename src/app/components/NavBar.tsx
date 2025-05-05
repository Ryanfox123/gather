"use client";
import React, { useEffect } from "react";
import NavSearch from "./NavSearch";
import { Playwrite_RO } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const playwrite = Playwrite_RO({ weight: "400" });

function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const isAdmin = session?.user?.admin === true;

  return (
    <div className="fixed top-0 z-20 bg-white border-b-1 w-full h-14 flex flex-row gap-9 pl-8">
      <h2
        className={`${playwrite.className} text-2xl font-extrabold text-lightViolet my-auto`}
      >
        Gather
      </h2>
      <NavSearch />

      <ul className="flex flex-row gap-4 items-center text-black ml-auto pr-4 my-auto">
        {isAdmin && (
          <li>
            <button
              className="text-white bg-lightViolet p-2 text-sm rounded-2xl hover:bg-darkViolet cursor-pointer"
              onClick={() => {
                router.push("/createEvent");
              }}
            >
              Create an event
            </button>
          </li>
        )}
        <li className="hover:text-lightViolet cursor-pointer">Your events</li>
        <li className="hover:text-lightViolet cursor-pointer">Profile</li>
      </ul>

      <p
        className="text-red-500 my-auto pr-4 cursor-pointer"
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </p>
    </div>
  );
}

export default NavBar;
