import { useState } from "react";
import SearchBar from "../../components/page/home/SearchBar";
import AllMemberList from "./AllMemberList";
import { MemberListAPI } from "../../utils/repository";

export default function MemberListWrapper() {
  const [searchQuery, setSearchQuery] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMembers, setTotalMembers] = useState(0);

  const handleSearch = async (query) => {
    if (query === undefined) query = "";
    console.log("[handleSearch] 검색어 전송: ", query);
    await MemberListAPI.getMemberList(1, 8, query)
      .then((response) => {
        if (response.memberList && response.memberList.length > 0) {
          setSearchQuery(response.query);
          setMemberList(response.memberList);
          setCurrentPage(response.currentPage);
          setTotalMembers(response.totalCount);
        } else {
          alert("검색 결과가 없습니다.");
          setSearchQuery("");
          setMemberList([]);
          setCurrentPage(1);
          setTotalMembers(0);
        }
      })
      .catch((error) => {
        console.error("검색어 전송 중 오류 발생", error);
      });
  };
  
  const goToPreviousPage = () => {
    window.history.back();
  }

  return (
    <div className="flex flex-col w-[65em] justify-between pt-12 pb-5">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPreviousPage}
            className="mb-6 text-lg font-bold text-[#526688] mt-10"
          >
            &lt;
          </button>
          <div className="mb-6 text-lg font-bold text-[#526688] mt-10">유저 리스트</div>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <AllMemberList
        searchQuery={searchQuery}
        memberList={memberList}
        currentPage={currentPage}
        totalMembers={totalMembers}
        setSearchQuery={setSearchQuery}
        setMemberList={setMemberList}
        setCurrentPage={setCurrentPage}
        setTotalMembers={setTotalMembers}
      />
    </div>
  );
}
