import { useState } from "react";
import { MemberListAPI } from "../../utils/repository";
import AuthStore from "../../utils/zustand/AuthStore";

export default function BlockButton({ 
  targetMemberNo, targetMemberName,
  initialBlocked }) {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const currentUserNo = userInfo.memberNo;
  const [isBlocked, setIsBlocked] = useState(initialBlocked);

  const handleBlock = async () => {
    setIsLoading(true);
    try {
      const confirmMessage = isBlocked ? 
      `${targetMemberName}님을 차단해제 하시겠습니까?` : 
      `${targetMemberName}님을 차단시겠습니까?`;
      if(window.confirm(confirmMessage)) {
        if (isBlocked) {
          console.log("차단해제 타겟", targetMemberNo);
          await MemberListAPI.unBlockMember(currentUserNo, targetMemberNo);
        } else {
          console.log("차단 타겟", targetMemberNo);
          await MemberListAPI.blockMember(currentUserNo, targetMemberNo);
        }
        setIsBlocked(!isBlocked);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("[버튼] 멤버 차단 중 에러 발생", error);
      setIsBlocked(false);
    }
  };

  return (
    <button 
      onClick={handleBlock} 
      disabled={isLoading} 
      className={`px-4 py-2 rounded ${isBlocked ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'} ${isLoading ? 'opacity-50' : ''}`}
      style={{ minWidth: '90px' }}
    >
      {isBlocked ? "차단취소" : "차단"}
    </button>
  )
}