"use client";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Avatar from "@mui/material/Avatar";
import SearchButton from "./SearchButton";

import {
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SORT_BY_MAP = {
  r: "Default",
  rv: "By Review",
  p: "By price (low to high)",
  pd: "By Price (high to low)",
};

function Header() {
  const [pages, setPages] = useState("");
  const [sortBy, setSortBy] = useState("r");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();
  return (
    <header className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 px-2 pt-10 pb-5 md:pb-5">
      <Link href="/">
        <Image
          src="https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw"
          width={150}
          height={150}
          alt="google-logo"
          className="object-contain mr-10"
        />
      </Link>

      <div className="w-full md:max-2xl:">
        {/* Form */}
        <form
          action={(formData) => {
            const searchTerm = formData.get("searchTerm");
            if (!formData.get("searchTerm")) return;
            const params = new URLSearchParams();
            if (pages) params.set("pages", pages.toString());
            if (sortBy) params.set("sort_by", pages.toString());
            if (minPrice) params.set("min_price", pages.toString());
            if (maxPrice) params.set("max_price", pages.toString());
            router.push(`/search/${searchTerm}?${params.toString()}`);
          }}
        >
          <div className="flex items-center gap-2 w-full px-4">
            <div className="flex items-center space-x-2 bg-white shadow-xl rounded-full border-0 px-6 py-4 md:max-w-5xl flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="searchTerm"
                placeholder="Search..."
                className="outline-none flex-1"
              />
            </div>
            {/* Seach Button */}
            <SearchButton />
          </div>
          {/* Dropdown */}
          <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-4 max-w-lg md:max-w-none mx-auto">
            <SearchSelect
              onValueChange={(value) => setPages(value)}
              className="min-w-4"
              placeholder="# of pages"
            >
              {[...Array(100)].map((_, i) => (
                <SearchSelectItem key={i} value={(i + 1).toString()}>
                  {i + 1} pages
                </SearchSelectItem>
              ))}
            </SearchSelect>
            <Select onValueChange={(value) => setSortBy(value)}>
              {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {value}
                </SelectItem>
              ))}
            </Select>

            <SearchSelect
              onValueChange={(value) => setMinPrice(value)}
              placeholder="Min Price..."
              className="min-w-4"
            >
              {["", "100", "250", "500", "750", "900", "1000"].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? "No Minimum" : `₹${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>

            <SearchSelect
              onValueChange={(value) => setMaxPrice(value)}
              placeholder="Max Price..."
              className="min-w-4"
            >
              {["", "100", "250", "500", "750", "900", "+1000"].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i === 0 ? "No Maximum" : `₹${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>
          </div>
        </form>
      </div>

      <div>
        <div className="hidden lg:flex flex-1 justify-end">
          <Avatar alt="avatar_logo" src="/" sx={{ bgcolor: deepOrange[500] }}>
            AR
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default Header;