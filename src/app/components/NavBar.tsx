import React from "react";
import Image from "next/image";
import NavSearch from "./NavSearch";
import { Playwrite_RO } from "next/font/google";
import CreateEventBtn from "./CreateEventBtn";

const playwrite = Playwrite_RO({ weight: "400" });

function NavBar() {
  return (
    <div className="border-b-1 w-full h-14 flex flex-row gap-9 pl-2">
      <h2
        className={`${playwrite.className} text-2xl font-extrabold text-lightViolet my-auto`}
      >
        {" "}
        Gather
      </h2>
      <NavSearch />

      <ul className="flex flex-row gap-4 items-center text-black ml-auto pr-24 my-auto">
        <li>
          <button className="text-white bg-lightViolet p-2 text-sm  rounded-2xl">
            Create an event
          </button>
        </li>
        <li>Your events</li>
        <li>Profile</li>
      </ul>
    </div>
  );
}

export default NavBar;
