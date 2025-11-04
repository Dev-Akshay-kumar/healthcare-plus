import React, { useState } from "react";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white shadow-md rounded-full overflow-hidden max-w-md mx-auto"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 outline-none text-gray-700"
      />
      <button
        type="submit"
        className="bg-primary text-white px-5 py-2 font-medium hover:bg-teal-500 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
