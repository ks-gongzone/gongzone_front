import { useState } from "react"
import { MemberListAPI } from "../../utils/repository";

export default function FollowButton({ memberNo, isFollowing, onFolloChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await MemberListAPI.followMember(memberNo);
      onFolloChange();
    } catch (error) {
      console.error("[버튼] 멤버 팔로우 중 에러 발생", error);
    }
  };

  return (
    <button onClick={handleFollow} disabled={isLoading}>
      {isFollowing ? "팔로우취소" : "팔로우"}
    </button>
  );
}
