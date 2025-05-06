"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function NavSearch() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputSearchValue = formData.get("inputSearchValue") as string;

    if (inputSearchValue.trim()) {
      const params = new URLSearchParams({ q: inputSearchValue.trim() });
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-auto flex flex-row gap-2">
      <div className="relative w-60 h-10 border border-gray-300 rounded-l-sm flex items-center transition-colors duration-200 hover:border-black ">
        <FaMagnifyingGlass className="absolute left-2 text-gray-600" />
        <input
          type="text"
          name="inputSearchValue"
          placeholder="Search for events"
          className="w-full h-full pl-10 pr-4 text-black outline-none rounded-l-sm  transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-14 h-10 bg-lightViolet text-white text-xs rounded-r-sm border border-lightViolet hover:border-black hover:bg-darkViolet flex items-center justify-center transition-colors duration-200"
      >
        Search
      </button>
    </form>
  );
}

export default NavSearch;
