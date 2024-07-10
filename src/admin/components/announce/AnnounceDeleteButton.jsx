import React from "react";
import { useNavigate } from "react-router-dom";
import { AnnounceAPI } from "../../../utils/repository";
import AuthStore from "../../../utils/zustand/AuthStore";

/**
 * @내용: 공지 삭제 버튼 컴포넌트
 * @작성일: 2024-07-10
 */
export default function DeleteButton({ announceNo }) {
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const memberNo = userInfo.memberNo;
  const isAdmin = memberNo === "M000001";
  const navigate = useNavigate();
  const adminAddr = "/_admin/main";

  const handleDelete = () => {
    if (!isAdmin) {
      alert("관리자만 공지사항을 삭제할 수 있습니다.");
      return;
    }
    const confirmDelete = window.confirm("정말로 이 공지사항을 삭제하시겠습니까?");
    if (confirmDelete) {
      AnnounceAPI.deleteAnnouncement(announceNo)
        .then((response) => {
          alert("공지사항이 성공적으로 삭제되었습니다.");
          navigate(adminAddr);
        })
        .catch(error => {
          console.error("공지사항 삭제 중 오류 발생[컴포넌트]", error);
        });
    }
  };
  
  return (
    <div className="flex justify-end">
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        삭제하기
      </button>
    </div>
  );
}
