import { useEffect, useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import { MemberListAPI } from "../../utils/repository";
import MemberListCard from "./MemberListCard";
import { useNavigate } from "react-router-dom";

/**
 * @수정일: 2024-07-11
 * @내용: 유저 리스트에서 검색 및 팔로우 및 차단기능
 */
export default function MemberList({ searchQuery }) {
  const { userInfo } = AuthStore();
  const currentUserNo = userInfo?.memberNo;
  const [memberList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(8);
  const [totalMembers, setTotalMembers] = useState(0);
  const navigate = useNavigate();

  useEffect (() => {
    if (!currentUserNo) {
      // alert("로그인이 필요한 서비스입니다.");
      navigate("/");
    }
  }, [currentUserNo, navigate]);

  // 페이지 처리
  const changeMembersList = async (page, size) => {
    try {
      const data = await MemberListAPI.getMemberList(page, size);
      const processedData = data.memberList.map(member => ({
        ...member,
        isPopular: member.popular,
        isWarning: member.warning,
        isFollowing: member.following,
        isBlocked: member.blocked
      }));
      console.log("Allmember 컴포넌트:", processedData); // 데이터 확인용 로그
      setMemberList(processedData);
      setCurrentPage(data.currentPage);
      setTotalMembers(data.totalCount);
    } catch (error) {
      console.error("[페이지] 유저 데이터 로드 중 오류", error);
    }
  };

  useEffect(() => {
    changeMembersList(currentPage, size);
  }, [currentPage, size]);

  const filteredMembers = Array.isArray(memberList) ? memberList.filter((member) => {
    if (searchQuery && !member.memberName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  }) : [];

  const renderMemberCards = (members) => {
    return members.map((member) => (
      <div key={member.memberNo} className="w-full md:w-1/2 lg:w-1/3 p-4">
        <MemberListCard
          currentUserNo={currentUserNo}
          member={member}
        />
      </div>
    ));
  };

  const totalPages = Math.ceil(totalMembers / size);

  return (
    <div className="w-[80em] mx-auto mb-10 mt-14">
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
