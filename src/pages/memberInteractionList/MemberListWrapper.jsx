import { useState } from "react";
import SearchBar from "../../components/page/home/SearchBar";
import AllMemberList from "./AllMemberList";

export default function MemberListWrapper() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col w-[1150px] justify-between pt-12 pb-5">
      <div className="flex w-[1150px] justify-between pt-12 pb-5">
        <div className="text-[2vw]">유저 리스트</div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <AllMemberList searchQuery={searchQuery}/>
    </div>
  );
}
