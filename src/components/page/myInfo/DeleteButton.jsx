import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthStore from "../../../utils/zustand/AuthStore";
import { UserDelete } from "../../../utils/repository";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-17
 * @last: 2024-07-01
 * @desc: 버튼 클릭시 회원 탈퇴 여부 묻는다.
 * @수정내용: 회원 정보 저장버튼 > 회원 탈퇴 버튼으로 변경
 */
export default function DeleteButton() {
  const redirect = useNavigate();
  const [inConfirm, setInConfirm] = useState(false);
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const { statusLogout } = AuthStore();

  const handleDelete = () => {
    setInConfirm(true);
  };

  const handleConfirm = async (confirm) => {
    setInConfirm(false);
    if (confirm) {
      try {
        await UserDelete(userInfo.memberNo);
        alert("회원탈퇴가 완료되었습니다.");
        redirect("/home");
        statusLogout();
      } catch (error) {
        console.error("회원 탈퇴 실패:", error);
        alert("회원 탈퇴 중 오류가 발생했습니다.");
      }
    } else {
      console.log("회원 탈퇴를 취소했습니다.");
    }
  };

  return (
    <div className="w-full flex justify-end">
      <button
        onClick={handleDelete}
        className="bg-[#f97173] text-white font-bold py-2 px-4 rounded"
      >
        회원 탈퇴
      </button>
      {inConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-md w-96 h-48 flex flex-col items-center justify-center z-60">
            <p className="mb-6 text-center text-lg">정말 회원 탈퇴하시겠습니까?</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleConfirm(true)}
                className="bg-[#f97173] text-white font-bold py-3 px-6 rounded mr-2"
              >
                예
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="bg-[#1d5091] text-white font-bold py-3 px-6 rounded"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}