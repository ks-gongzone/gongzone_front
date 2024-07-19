import { useEffect, useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import { MemberListAPI } from "../../utils/repository";
import MemberListCard from "./MemberListCard";
import { useNavigate } from "react-router-dom";

export default function AllMemberList({
  searchQuery,
  memberList,
  currentPage,
  totalMembers,
  setSearchQuery,
  setMemberList,
  setCurrentPage,
  setTotalMembers,
}) {
  const { userInfo } = AuthStore();
  const currentUserNo = userInfo?.memberNo;
  const [size] = useState(8);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUserNo) {
      navigate("/");
    }
  }, [currentUserNo, navigate]);

  useEffect(() => {
    const changeMembersList = async () => {
      console.log("[changeMembersList] - page:", currentPage, " size:", size, " query:", searchQuery);
      MemberListAPI.getMemberList(currentPage, size, searchQuery)
        .then((data) => {
          if (!data.memberList || data.memberList.length === 0) {
            setMemberList([]);
            setTotalMembers(0);
            setCurrentPage(1);
            alert("검색 결과가 없습니다.");
            navigate("/member/list");
          } else {
            const processedData = data.memberList.map(member => ({
              ...member,
              isPopular: member.popular,
              isWarning: member.warning,
              isFollowing: member.following,
              isBlocked: member.blocked
            }));
            setMemberList(processedData);
            setCurrentPage(data.currentPage);
            setTotalMembers(data.totalCount);
            navigate(`/member/list?query=${searchQuery}&page=${currentPage}`);
          }
        })
        .catch((error) => {
          console.error("[페이지] 유저 데이터 로드 중 오류", error);
        });
    };
    changeMembersList();
  }, [currentPage, searchQuery, setMemberList, setCurrentPage, setTotalMembers, size, navigate]);

  const renderMemberCards = (members) => {
    return members.map((member) => (
      <div key={member.memberNo} className="w-full md:w-1/2 lg:w-1/3 p-4">
        <MemberListCard currentUserNo={currentUserNo} member={member} />
      </div>
    ));
  };

  const totalPages = Math.ceil(totalMembers / size);

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="flex flex-wrap gap-4 justify-center">
        {renderMemberCards(memberList)}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>페이지 {currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
