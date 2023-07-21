import Image from "next/image";
import Link from "next/link";
const SEARCHES = [
  {
    id: 1,
    term: "Macbook pro",
    url: "/search/macbook",
    color: "bg-yellow-500",
  },
  {
    id: 2,
    term: "Monitor over 1000₹",
    url: "/search/monitors?sort_by=r&min_price=1000",
    color: "bg-blue-500",
  },
  {
    id: 3,
    term: "Shoes",
    url: "/search/shoes",
    color: "bg-green-500",
  },
  {
    id: 4,
    term: "iphone",
    url: "/search/iphone",
    color: "bg-purple-500",
  },
];
export default function Home() {
  return (
    <div className="p-10 pt-0 text-center md:text-left">
      <h1 className="text-3xl font-extralight mb-5">
        Welcome to Google Shopping
      </h1>
      <h2 className="mb-5">
        Get started by clicking on one of the example search items or typing in
        an item yourself above!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center gap-5 mt-5">
        {SEARCHES.map((search) => (
          <Link
            prefetch={false}
            key={search.id}
            href={search.url}
            className={`${search.color} w-full h-36 hover:opacity-50 text-white font-bold py-2 px-4 rounded`}
          >
            {search.term}
          </Link>
        ))}
      </div>
    </div>
  );
}
