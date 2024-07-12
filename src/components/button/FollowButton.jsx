import { useState } from "react"
import { MemberListAPI } from "../../utils/repository";
import AuthStore from "../../utils/zustand/AuthStore";
import { HeartIcon } from "@heroicons/react/16/solid";

export default function FollowButton({ 
  targetMemberNo, targetMemberName,
  isFollowing, onFollowChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const currentUserNo = userInfo.memberNo;

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const confirmMessage = isFollowing ? 
      `${targetMemberName}님을 팔로우 취소 하시겠습니까?` : 
      `${targetMemberName}님을 팔로우 하시겠습니까?`;
      if (window.confirm(confirmMessage)) {
        if (isFollowing) {
          console.log("언팔로우 타겟", targetMemberNo);
          await MemberListAPI.unFollowMember(currentUserNo, targetMemberNo);
        } else {
          console.log("팔로우 타겟", targetMemberNo);
          await MemberListAPI.followMember(currentUserNo, targetMemberNo);
        }
        onFollowChange({ 
          memberNo: targetMemberNo,
          memberName: targetMemberName, isFollowing: !isFollowing })
      }
    } catch (error) {
      console.error("[버튼] 멤버 팔로우 중 에러 발생", error);
    }
  };

  return (
    <div onClick={handleFollow} className={`cursor-pointer ${isLoading ? "opacity-50" : ""}`}>
      <HeartIcon className={`w-8 h-8 ${isFollowing ? "text-red-500" : "text-gray-300"}`} />
    </div>
  );
}
