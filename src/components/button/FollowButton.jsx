import { useState } from "react"
import { MemberListAPI } from "../../utils/repository";
import AuthStore from "../../utils/zustand/AuthStore";
import { HeartIcon } from "@heroicons/react/16/solid";

export default function FollowButton({ 
  targetMemberNo, targetMemberName,
  initialFollowing }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const currentUserNo = userInfo.memberNo;

  const handleFollow = async () => {
    setIsLoading(true);
    try{
      const confirmMessage = isFollowing ? 
        `${targetMemberName}님을 팔로우 취소 하시겠습니까?` : 
        `${targetMemberName}님을 팔로우 하시겠습니까?`;
      if (window.confirm(confirmMessage)) {
          if (isFollowing) {
            await MemberListAPI.unFollowMember(currentUserNo, targetMemberNo);
          } else {
            await MemberListAPI.followMember(currentUserNo, targetMemberNo);
          }
          setIsFollowing(!isFollowing);
        }
        setIsLoading(false);
      } catch (error) {
        error;
        setIsLoading(false);
    }
  };

  return (
    <button type="button" className="self-end mr-4" onClick={handleFollow} disabled={isLoading}> 
      <HeartIcon
        className={`w-6 transition-transform duration-200 ${
          isFollowing
            ? "text-red-500 scale-125"
            : "text-[#e7e7e7] scale-125"
        }`}
      />
    </button>
  );
}
