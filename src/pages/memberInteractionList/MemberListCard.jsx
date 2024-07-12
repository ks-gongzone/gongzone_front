import React from "react";
import FollowButton from "../../components/button/FollowButton";
import BlockButton from "../../components/button/BlockButton";
import AuthStore from "../../utils/zustand/AuthStore";

/**
 * @작성일: 2024-07-11
 * @내용: 회원별 프로필 카드 
 */
export default function MemberListCard({ 
  member,
  onFollowChange, onBlockChange }) {

  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const currentUserNo = userInfo.memberNo;
  const isAdmin = userInfo.memberNo === "M000001";
  const isPopular = member.isPopular;
  const isWarning = member.isWarning;

  return (
    <div className="w-full h-full relative text-left rounded-xl overflow-hidden shadow-lg bg-white border hover:border-red-200 p-4">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <div 
             className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-400 text-white text-lg"
          >
            프로필
          </div>
          <div className="ml-4">
            <div className="font-bold text-lg flex items-center">
              name: {member.memberName}
              {currentUserNo !== member.memberNo && (
                <div className="ml-2">
                  <FollowButton
                    targetMemberNo={member.memberNo}
                    targetMemberName={member.memberName}
                    isFollowing={member.following}
                    onFollowChange={onFollowChange}
                  />
                </div>
              )}
            </div>
            <div className="font-bold text-lg">gender: {member.gender}</div>
            {isAdmin && (
              <div className="mt-2">
                {isPopular && (
                  <div className="text-blue-500">인기유저</div>
                )}
                {isWarning && (
                  <div className="text-red-500">블랙리스트유저</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">! 작성글보기</button>
        {currentUserNo !== member.memberNo && (
          <BlockButton
            targetMemberNo={member.memberNo}
            targetMemberName={member.memberName}
            isBlocked={member.blocked}
            onBlockChange={onBlockChange}
          />
        )}
      </div>
    </div>
  );
}
