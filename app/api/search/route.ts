import { PageResult, SearchParams } from "@/typings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchTerm, pages, ...params } = await request.json();
  const searchParams: SearchParams = params;

  if (!searchTerm) {
    return NextResponse.next(
      new Response("Missing search term", { status: 400 })
    );
  }
  const filters: any = [];
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (key == "max_price") {
        if ((value = "1000+")) return;
      }
      filters.push({
        key,
        value: key === "sort_by" ? value : Number(value),
      });
    }
  });

  const response = await fetch("https://realtime.oxylabs.io/v1/queries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(`rawataman101:DSS2dF!efm*_*cg`).toString("base64"),
    },
    cache: "no-store", // server side render, not use caching values
    body: JSON.stringify({
      source: "google_shopping_search",
      domain: "com",
      query: searchTerm,
      pages: Number(pages) || 1,
      parse: true,
      context: filters,
    }),
  });
  const data = await response.json();
  const pageResults: PageResult[] = data.results;
  console.log("pageRes", pageResults);
  return NextResponse.json(pageResults);
}
