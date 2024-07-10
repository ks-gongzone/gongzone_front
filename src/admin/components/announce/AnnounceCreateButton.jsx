import React from "react";
import { useNavigate } from "react-router-dom";
import { AnnounceAPI } from "../../../utils/repository";
import AuthStore from "../../../utils/zustand/AuthStore";

/**
 * @내용: 공지 작성 버튼 컴포넌트
 * @작성일: 2024-07-09
 */
export default function CreateButton({ announceTitle, announceBody, typeCode }) {
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const memberNo = userInfo.memberNo;
  const navigate = useNavigate();
  const adminAddr = "/_admin/main";

  const handleSubmit = () => {
    if (memberNo !== "M000001") {
      alert("관리자만 공지사항을 작성할 수 있습니다.");
      navigate("/");
      return;
    }
    AnnounceAPI.createAnnouncement({ announceTitle, announceBody, typeCode, memberNo })
      .then(response => {
        alert("공지사항이 성공적으로 작성되었습니다.");
        navigate(adminAddr);
      })
      .catch(error => {
        console.error("공지사항 작성 중 오류 발생[컴포넌트]", error);
        navigate(adminAddr);
      });
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        작성하기
      </button>
    </div>
  );
}
