import React, { Suspense } from "react";
import SearchResults from "../components/SearchResults";
import SearchBar from "../components/SearchBar";

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function page({ searchParams }: HomeProps) {
  const query = (await searchParams).q as string;
  return (
    <div>
      <Suspense>
        <SearchBar />
      </Suspense>
      <Suspense
        key={query}
        fallback={<p className="text-center"> Loading events...</p>}
      >
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}

export default page;
