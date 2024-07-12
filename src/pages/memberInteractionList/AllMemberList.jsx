import { useEffect, useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import { MemberListAPI } from "../../utils/repository";
import MemberListCard from "./MemberListCard";

/**
 * @수정일: 2024-07-11
 * @내용: 유저 리스트에서 검색 및 팔로우 및 차단기능
 */
export default function MemberList({ searchQuery }) {
  const { userInfo } = AuthStore();
  const currentUserNo = userInfo?.memberNo;
  const [memberList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(15);

  // 페이지 처리
  const changeMembersList = async (page, size) => {
    try {
      const data = await MemberListAPI.getMemberList(page, size);
      const processdData = data.memberList.map(member => ({
        ...member,
        isPopular: member.popular,
        isWarning: member.warning
      }));
      console.log("Allmember 컴포넌트:", processdData); // 데이터 확인용 로그
      setMemberList(processdData);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("[페이지] 유저 데이터 로드 중 오류", error);
    }
  };

  useEffect(() => {
    changeMembersList(currentPage, size);
  }, [currentPage, size]);

  // 팔로우, 차단
  const handleFollowChange = (updatedMember) => {
    console.log("[팔로우] updateMember: ", updatedMember)
    setMemberList((prevList) => 
      prevList.map((member) => 
        member.memberNo === updatedMember.memberNo ? { 
          ...member, isFollowing: updatedMember.isFollowing } : member)
    );
  };
  const handleBlockChange = (updatedMember) => {
    setMemberList((prevList) => 
      prevList.map((member) =>
        member.memberNo === updatedMember.memberNo ? { 
          ...member, isBlocked: updatedMember.isBlocked } : member)
    );
  };

  const filteredMembers = Array.isArray(memberList) ? memberList.filter((member) => {
    if (searchQuery && !member.memberName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  }) : [];

  const renderMemberCards = (members) => {
    return members.map((member) => (
      <div key={member.memberNo} className="flex-grow min-w[45%] p-4">
        <MemberListCard
          currentUserNo={currentUserNo}
          member={member}
          onFollowChange={handleFollowChange}
          onBlockChange={handleBlockChange}
        />
      </div>
    ));
  };

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
       <div className="flex flex-wrap gap-4 justify-center">
        {renderMemberCards(filteredMembers)}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>페이지 {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          다음
        </button>
      </div>
    </div>
  );
}
