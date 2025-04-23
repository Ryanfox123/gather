"use client";
import React from "react";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function NavSearch() {
  const [search, setSearch] = useState("");
  return (
    <div className="my-auto flex flex-row gap-1">
      <div className="text-black border-1  my-auto w-60 h-9 rounded-l-sm border-gray-300 flex flex-row hover:border-black focus:bg-black transition-colors duration-200">
        <FaMagnifyingGlass className="m-2 mt-[10px]" />
        <input
          type="text"
          placeholder="Search for events"
          className="outline-none h-4 my-auto"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <button className="text-white bg-lightViolet border-1 rounded-r-sm text-xs w-14 h-9 my-auto border-lightViolet hover:border-black hover:bg-darkViolet">
        Search
      </button>
    </div>
  );
}

export default NavSearch;
