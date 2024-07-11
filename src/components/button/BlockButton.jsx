import { useState } from "react";
import { MemberListAPI } from "../../utils/repository";

export default function BlockButton({ memberNo, isBlocked, onBlockChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleBlock = async () => {
    setIsLoading(true);
    try {
      await MemberListAPI.blockMember(memberNo);
      onBlockChange();
    } catch (error) {
      console.error("[버튼] 멤버 차단 중 에러 발생", error);
    }
  };

  return (
    <button onClick={handleBlock} disabled={isLoading}>
      {isBlocked ? "차단취소" : "차단"}
    </button>
  )
}