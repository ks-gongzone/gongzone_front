import { useState } from "react";
import { MemberListAPI } from "../../../utils/repository";

/**
 * @수정일 2024-07-16
 * @수정내용: 검색 쿼리 부모에게 전달할 수 있게 onSearch props 추가
 */
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState();
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    onSearch(query);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center">
        <input
          type="text"
          value={query || ""}
          onChange={handleInputChange}
          className="w-60 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="검색어를 입력하세요."
        />
        <button
          onClick={handleSearch}
          className="text-center bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          검색
        </button>
      </div>
    </div>
  );
}
