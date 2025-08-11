// import { useState } from "react";
import { Search, X } from "lucide-react";

export const SearchBar = ( {query, setQuery} ) => {
  // const [query, setQuery] = useState("");

  return (
    <div class="relative w-full max-w-xl">
      <Search class="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500" />

      <input
        type="text"
        placeholder="Search..."
        class="w-full rounded-[5px] border border-gray-300 bg-white py-2 pr-10 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-black"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
