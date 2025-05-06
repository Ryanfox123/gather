"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q")?.toString() || "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputSearchValue = formData.get("inputSearchValue") as string;

    const params = new URLSearchParams();

    if (inputSearchValue.trim()) {
      params.set("q", inputSearchValue.trim());
    } else {
      params.delete("q");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4"
    >
      <div className="relative flex-grow h-10 border border-gray-300 rounded-l-md flex items-center transition-colors duration-200 hover:border-black focus-within:border-black">
        <FaMagnifyingGlass className="absolute left-3 text-gray-500" />
        <input
          type="text"
          name="inputSearchValue"
          defaultValue={initialQuery}
          placeholder="Search events"
          className="w-full h-full pl-10 pr-4 text-sm text-black outline-none rounded-l-md  focus:text-black transition-all duration-200"
        />
      </div>
      <button
        type="submit"
        className="w-16 h-10 bg-lightViolet text-white text-sm rounded-r-md border border-lightViolet hover:border-black hover:bg-darkViolet transition-colors duration-200"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
