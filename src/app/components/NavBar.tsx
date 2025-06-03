"use client";
import React, { useState } from "react";
import NavSearch from "./NavSearch";
import { Playwrite_RO } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";

const playwrite = Playwrite_RO({ weight: "400" });

type Props = {
  setLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavBar({ setLoginPopup }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const isAdmin = session?.user?.admin === true;

  return (
    <div className="fixed top-0 z-20 bg-white border-b-1 w-full h-16 flex flex-row gap-6 pl-8 items-center justify-between">
      <h2
        className={`${playwrite.className} text-2xl font-extrabold text-lightViolet my-auto hidden sm:block`}
      >
        Gather
      </h2>

      <div className="flex items-center gap-4">
        <NavSearch />

        <button
          className="block sm:hidden text-black"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FaBars size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg border-t-2 border-gray-300 sm:hidden z-10">
          <ul className="flex flex-col gap-4 py-4 px-8 text-black">
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
            <li className="hover:text-lightViolet cursor-pointer">
              Your events
            </li>
            <li className="hover:text-lightViolet cursor-pointer">Profile</li>
            <li
              className="text-red-500 cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </li>
          </ul>
        </div>
      )}
      {session ? (
        <div className="hidden sm:flex flex-row gap-4 items-center text-black ml-auto pr-4">
          {isAdmin && (
            <li className="list-none">
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
          <li className="hover:text-lightViolet cursor-pointer list-none">
            Your events
          </li>
          <li className="hover:text-lightViolet cursor-pointer list-none">
            Profile
          </li>

          <p
            className="text-red-500 my-auto pr-4 cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </p>
        </div>
      ) : (
        <div className="hidden sm:flex flex-row gap-4 items-center text-black ml-auto pr-4">
          <button
            className="text-white bg-lightViolet p-2 text-sm rounded-2xl hover:bg-darkViolet cursor-pointer w-20 font-extrabold"
            onClick={() => router.push("/login")}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
