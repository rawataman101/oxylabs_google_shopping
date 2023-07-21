import { redirect } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { PageResult, SearchParams } from "@/typings";
import { getFetchUrl } from "@/lib/getFetchUrl";
import ResultsList from "@/components/ResultsList";
export const revalidate = 300;

type Props = {
  searchParams: SearchParams;
  params: {
    term: string;
  };
};

async function SearchPage({ searchParams, params: { term } }: Props) {
  if (!term) {
    redirect("/");
  }

  // fetch from API
  // const reponse = await fetch("http://localhost:3000/api/search", {
  //   method: "POST",
  //   body: JSON.stringify({ searchTerm: term, ...searchParams }),
  // });
  // for vercel
  const reponse = await fetch(`https://${process.env.VERCEL_URL}/api/search`, {
    method: "POST",
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  });

  const results = (await reponse.json()) as PageResult[];
  console.log("results->", results);
  return (
    <div>
      {/* Results list */}
      <ResultsList results={results} term={term} />
    </div>
  );
}

export default SearchPage;
