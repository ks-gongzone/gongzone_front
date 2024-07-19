import React, { useEffect, useState } from "react";
import { MemberListAPI } from "../../utils/repository";
import MemberListCard from "../../pages/memberInteractionList/MemberListCard";

export default function BlockList({ memberNo }) {
  const [blockList, setBlockList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(8);
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    const fetchBlockList = async () => {
      try {
        const data = await MemberListAPI.getBlockList(memberNo, currentPage, size);
        const processedData = data.blockList.map(member => ({
          ...member,
          isPopular: member.popular,
          isWarning: member.warning,
          isBlocked: member.blocked
        }));
        setBlockList(processedData);
        setCurrentPage(data.currentPage);
        setTotalMembers(data.totalCount);
      } catch (error) {
        console.error("[차단 목록] 유저 데이터 로드 중 오류", error);
      }
    };

    fetchBlockList();
  }, [memberNo, currentPage, size]);

  const renderMemberCards = (members) => {
    return members.map((member) => (
      <div key={member.memberNo} className="w-full md:w-1/2 lg:w-1/3 p-4">
        <MemberListCard
          member={member}
        />
      </div>
    ));
  };

  const totalPages = Math.ceil(totalMembers / size);

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="flex flex-wrap gap-4 justify-center">
        {renderMemberCards(blockList)}
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
