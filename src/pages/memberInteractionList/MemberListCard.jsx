import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState, useEffect, useRef } from "react";
import ReportModal from "../../components/modal/ReportModal";
import FollowButton from "../../components/button/FollowButton";
import BlockButton from "../../components/button/BlockButton";
import AuthStore from "../../utils/zustand/AuthStore";
import { Note } from "../../utils/repository";
import sample1 from "../../assets/images/sample1.PNG";

const MySwal = withReactContent(Swal);

export default function MemberListCard({
  member,
  like = false,
  note = false,
  children,
  profileImage,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const currentUserNo = userInfo.memberNo;

  const likeBtn = () => {
    setIsLiked(!isLiked);
  };

  const toggleDropdown = () => {
    if (currentUserNo !== member.memberNo) {
      setIsDropdownOpen(!isDropdownOpen);
    }
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
      inputLabel: `to : ${member.memberName}`,
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
        memberNo: currentUserNo,
        memberTargetNo: member.memberNo,
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
    <div className="border rounded-lg hover:border-[#ea6560] transition-colors overflow-hidden min-h-[210px] flex flex-col">
      <div className="flex flex-grow flex-wrap md:flex-nowrap">
        <div className="ml-4 mt-6 w-16 h-16 rounded-full bg-slate-400 flex-shrink-0">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={profileImage || sample1}
            alt=""
          />
        </div>
        <div className="w-full mt-2 ml-4 font-bold text-gray-500 flex flex-col relative">
          <div className="self-end" style={{ height: '24px' }}>
            {like && currentUserNo !== member.memberNo && (
              <button type="button" onClick={likeBtn}>
                <FollowButton
                  targetMemberNo={member.memberNo}
                  targetMemberName={member.memberName}
                  initialFollowing={member.isFollowing}
                  className={`w-6 transition-transform duration-200 ${
                    isLiked ? "text-red-500 scale-125" : "text-[#e7e7e7] scale-100"
                  }`}
                />
              </button>
            )}
          </div>
          <div className="relative mt-2" ref={dropdownRef}>
            <button
              type="button"
              onClick={toggleDropdown}
              className="font-bold text-gray-500 text-sm focus:outline-none"
            >
              <span className="font-bold text-black">{member.memberName}</span> #{member.memberNick}
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
                  {currentUserNo !== member.memberNo && (
                    <BlockButton
                      targetMemberNo={member.memberNo}
                      targetMemberName={member.memberName}
                      initialBlocked={member.isBlocked}
                    />
                  )}
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
          <div className="text-xs mt-2">
            성별: {member.gender === "M" ? "남성" : "여성"}
          </div>
        </div>
      </div>
      {currentUserNo !== member.memberNo && (
        <div className="flex flex-col justify-center items-center mt-4 p-4 space-y-2">
          {note && (
            <button
              onClick={handleNote}
              type="button"
              className="w-full h-6 rounded-md bg-gray-300 hover:bg-gray-500 text-xs font-bold text-[white]"
            >
              쪽지 보내기
            </button>
          )}
          <hr className="w-full" />
          {member.isPopular ? (
            <div className="w-full text-center flex items-center justify-center h-6 rounded-md bg-[#6ea2d4] text-xs font-bold text-[white]">
              인기유저
            </div>
          ) : member.isWarning ? (
            <div className="w-full text-center flex items-center justify-center h-6 rounded-md bg-[#b93d40] text-xs font-bold text-[white]">
              공존의난동꾼
            </div>
          ) : (
            <div className="w-full text-center flex items-center justify-center h-6 rounded-md bg-[#62c8b3] text-xs font-bold text-[white]">
              일반유저
            </div>
          )}
        </div>
      )}
      {isReportModalOpen && (
        <ReportModal
          isOpen={isReportModalOpen}
          closeModal={closeReportModal}
          memberTargetNo={member.memberNo}
          memberNick={member.memberName}
        />
      )}
    </div>
  );
}
