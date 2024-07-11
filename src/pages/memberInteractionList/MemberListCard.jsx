import React from "react";
import FollowButton from "../../components/button/FollowButton";
import BlockButton from "../../components/button/BlockButton";

export default function MemberListCard({ member, onFollowChange, onBlockChange }) {
  return (
    <div className="w-full h-full text-left rounded-xl overflow-hidden shadow-lg bg-white border hover:border-red-200">
      <div className="px-6 py-3">
        <div className="font-bold text-ml mb-2">이름: {member.memberName}</div>
        <div className="font-bold text-ml mb-2">성별: {member.memberGender}</div>
        <FollowButton
          memberNo={member.memberNo}
          isFollowing={member.isFollowing}
          onFollowChange={onFollowChange}
        />
        <BlockButton
          memberNo={member.memberNo}
          isBlocked={member.isBlocked}
          onBlockChange={onBlockChange}
        />
      </div>
    </div>
  );
}
