import { HeartIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useRef } from "react";
import ReportModal from "../../modal/ReportModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Note } from "../../../utils/repository";
import AuthStore from "../../../utils/zustand/AuthStore";
import FollowButton from "../../button/FollowButton";
import BlockButton from "../../button/BlockButton";

const MySwal = withReactContent(Swal);

export default function PartyCard({
  children,
  img,
  id,
  desc,
  memberTargetNo,
  amount,
  note = false,
  like = false,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const memberNo = AuthStore((state) => state.userInfo.memberNo);

  const likeBtn = () => {
    setIsLiked(!isLiked);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleReport = () => {
    setIsReportModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

  const handleNote = async () => {
    const { value: noteBody } = await MySwal.fire({
      title: "쪽지 전송",
      input: "textarea",
      inputLabel: `to : ${id}`,
      inputPlaceholder: "내용을 입력하세요...",
      inputAttributes: {
        "aria-label": "내용을 입력하세요",
      },
      showCancelButton: true,
      confirmButtonText: "보내기",
      cancelButtonText: "취소",
    });

    if (noteBody) {
      const data = {
        memberNo,
        memberTargetNo,
        noteBody,
      };

      try {
        await Note.InsertNote(data);
        MySwal.fire("성공", "쪽지가 성공적으로 보내졌습니다.", "success");
      } catch (error) {
        MySwal.fire("실패", "쪽지 보내기 중 오류가 발생했습니다.", "error");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border rounded-lg hover:border-[#ea6560] transition-colors overflow-hidden">
      <div className="flex">
        <div className="ml-4 mt-6 w-16 h-16 rounded-full bg-slate-400 flex-shrink-0">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={img}
            alt=""
          />
        </div>
        <div className="w-full mt-2 ml-4 font-bold text-gray-500 flex flex-col relative">
          {like && (
            <button type="button" className="self-end mr-4" onClick={likeBtn}>
              <FollowButton
                targetMemberNo={memberNo}
                targetMemberName={memberTargetNo}
                className={`w-6 transition-transform duration-200 ${
                  isLiked
                    ? "text-red-500 scale-125"
                    : "text-[#e7e7e7] scale-100"
                }`}
              />
            </button>
          )}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleDropdown}
              className="font-bold text-gray-500 text-sm focus:outline-none"
            >
              {id}
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                  type="button"
                >
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                    type="button"
                    onClick={handleNote}
                  >
                    쪽지 보내기
                  </button>
                  <BlockButton
                    targetMemberNo={memberNo}
                    targetMemberName={memberTargetNo}
                  />
                  <button
                    className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                    type="button"
                    onClick={handleReport}
                  >
                    신고하기
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="text-xs">{desc}</div>
          <div className="font-bold text-gray-500 text-sm self-end mt-2 mr-4">
            구매수량 : {amount}
          </div>
        </div>
      </div>
      {note && (
        <div className="w-full px-4 pt-5">
          <button
            type="button"
            className="w-full h-6 rounded-md bg-gray-300 hover:bg-gray-500 text-xs font-bold text-[white]"
            onClick={handleNote}
          >
            쪽지 보내기
          </button>
        </div>
      )}
      <div>{children}</div>

      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          closeModal={closeReportModal}
          memberTargetNo={memberTargetNo}
          memberNick={desc}
        />
      )}
    </div>
  );
}
