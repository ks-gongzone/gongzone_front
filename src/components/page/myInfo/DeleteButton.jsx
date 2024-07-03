import { useNavigate } from "react-router-dom";
import { useState } from "react";
/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-17
 * @last: 2024-07-01
 * @desc: 버튼 클릭시 회원 탈퇴 여부 묻는다.
 * @수정내용: 회원 정보 저장버튼 > 회원 탈퇴 버튼으로 변경
 */
export default function DeleteButton() {
  const redirect = useNavigate();
  const [ inConfirm, setInConfirm ] = useState(false);

  const handleDelete = () => {
    setInConfirm(true);
  };

  const handleConfirm = (confirm) => {
    setInConfirm(false);
    if (confirm) {
      alert("회원탈퇴가 완료되었습니다.");
      redirect("/");
    } else {
      console.log("회원 탈퇴를 취소했습니다.");
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded"
      >
        회원 탈퇴
      </button>
      {inConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white p-8 rounded shadow-md w-96 h-48 flex flex-col items-center justify-center">
          <p className="mb-6 text-center text-lg">정말 회원 탈퇴하시겠습니까?</p>
          <div className="flex space-x-4">
            <button
              onClick={() => handleConfirm(true)}
              className="bg-red-500 text-white font-bold py-3 px-6 rounded mr-2"
            >
              예
            </button>
            <button
              onClick={() => handleConfirm(false)}
              className="bg-gray-300 text-black font-bold py-3 px-6 rounded"
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
