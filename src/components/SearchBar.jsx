import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState();
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    console.log(query);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <input
          type="text"
          value={query || ""}
          onChange={handleInputChange}
          className="w-60 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="검색어를 입력하세요."
        />
        <button
          onClick={handleSearch}
          className="right-2 top-2 bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          검색
        </button>
      </div>
    </div>
  );
}
