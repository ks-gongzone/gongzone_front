import { useState } from "react";
import { MemberListAPI } from "../../utils/repository";
import AuthStore from "../../utils/zustand/AuthStore";

export default function BlockButton({
  targetMemberNo,
  targetMemberName,
  initialBlocked,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const currentUserNo = userInfo.memberNo;
  const [isBlocked, setIsBlocked] = useState(initialBlocked);

  const handleBlock = async () => {
    setIsLoading(true);
    try {
      const confirmMessage = isBlocked
        ? `${targetMemberName}님을 차단해제 하시겠습니까?`
        : `${targetMemberName}님을 차단시겠습니까?`;
      if (window.confirm(confirmMessage)) {
        if (isBlocked) {
          await MemberListAPI.unBlockMember(currentUserNo, targetMemberNo);
        } else {
          await MemberListAPI.blockMember(currentUserNo, targetMemberNo);
        }
        setIsBlocked(!isBlocked);
      }
      setIsLoading(false);
    } catch (error) {
      error;
      setIsBlocked(false);
    }
  };

  return (
    <button
      onClick={handleBlock}
      disabled={isLoading}
      className={`block px-4 py-2 text-sm w-full text-left ${
        isBlocked ? "text-red-700" : "text-gray-700"
      } hover:bg-gray-100 ${isLoading ? "opacity-50" : ""}`}
      style={{ minWidth: "90px" }}
    >
      {isBlocked ? "차단됨" : "차단하기"}
    </button>
  );
}
