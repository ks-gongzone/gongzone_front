import React, { useEffect, useState } from "react";
import { MemberListAPI } from "../../utils/repository";
import MemberListCard from "../../pages/memberInteractionList/MemberListCard";

export default function FollowList({ memberNo }) {
  const [followList, setFollowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size] = useState(8);
  const [totalMembers, setTotalMembers] = useState(0);

  const fetchFollowList = async (page, size) => {
    try {
      const data = await MemberListAPI.getFollowList(memberNo, page, size);
      const processedData = data.followList.map((member) => ({
        ...member,
        isPopular: member.popular,
        isWarning: member.warning,
        isFollowing: member.following,
        isBlocked: member.blocked,
      }));
      setFollowList(processedData);
      setCurrentPage(data.currentPage);
      setTotalMembers(data.totalCount);
    } catch (error) {
      console.error("[팔로우 목록] 유저 데이터 로드 중 오류", error);
    }
  };

  useEffect(() => {
    fetchFollowList(currentPage, size);
  }, [memberNo, currentPage, size]);

  const renderMemberCards = (members) => {
    return members.map((member) => (
      <div key={member.memberNo} className="w-full lg:w-1/3 p-4">
        <MemberListCard member={member} note={true} like={true} />
      </div>
    ));
  };

  const totalPages = Math.ceil(totalMembers / size);

  return (
    <div className="w-full relative mx-auto mb-10 mt-14">
      <div className="flex flex-wrap gap-4 justify-center">
        {renderMemberCards(followList)}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <span>
          페이지 {currentPage} / {totalPages}
        </span>
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
