import { useState, useRef, useEffect } from "react";
import AuthStore from "../../../utils/zustand/AuthStore";
import { Board } from "../../../utils/repository";

export default function PartyReply({ boardNo, boardReply }) {
  const [reply, setReply] = useState("");
  const [updateReply, setUpdateReply] = useState("");
  const connectMemberNo = AuthStore((state) => state.userInfo.memberNo);
  const [replies, setReplies] = useState(boardReply); // 초기 댓글 목록 설정
  const [editingIndex, setEditingIndex] = useState(-1);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setUpdateReply(replies[index].replyBody);
  };

  const handleReplySubmit = async () => {
    if (reply.trim()) {
      const newReply = await Board.BoardReply(boardNo, connectMemberNo, reply);
      console.log(newReply.data); // 새로운 댓글 확인
      setReplies(newReply.data); // 새로운 댓글을 상태에 추가
      setReply(""); // 댓글 입력 필드 비우기
    }
  };

  const handleReplyUpdate = async (replyNo) => {
    if (updateReply.trim()) {
      const updateReplies = await Board.UpdateBoardReply(
        replyNo,
        boardNo,
        connectMemberNo,
        updateReply
      );
      console.log(updateReplies.data);
      setReplies(updateReplies.data);
      setUpdateReply("");
      setEditingIndex(-1);
    }
  };

  const handleDelete = async (index) => {
    const deleteNo = replies[index].replyNo;

    const deletedReply = await Board.DeleteBoardReply(
      deleteNo,
      boardNo,
      connectMemberNo
    );
    console.log(deletedReply);
    setReplies(deletedReply.data);
  };

  return (
    <div className="max-w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">댓글</div>
      <div className="mb-4">
        {replies.map((reply, index) => (
          <div key={index} className="p-2 border-b border-gray-200">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => toggleDropdown(index)}
                className="font-bold text-xl text-gray-500 text-sm focus:outline-none"
              >
                {reply.memberId}
              </button>
              {isDropdownOpen === index && (
                <div className="absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
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
                    >
                      쪽지보내기
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      type="button"
                    >
                      차단하기
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                      role="menuitem"
                      type="button"
                    >
                      신고하기
                    </button>
                  </div>
                </div>
              )}
            </div>

            {editingIndex === index ? (
              // 수정 중일 때
              // 수정 중인 댓글이면 수정 가능한 입력 칸을 보여줌
              <div className="flex">
                <textarea
                  value={updateReply}
                  onChange={(e) => setUpdateReply(e.target.value)}
                  className="w-full border rounded p-2"
                />
                <button
                  onClick={() => handleReplyUpdate(reply.replyNo)}
                  className="ml-2 w-[5em] px-4 py-2 bg-[#1d5091] text-white rounded
                  hover:bg-[#6ea2d4]"
                >
                  수정
                </button>
              </div>
            ) : (
              // 수정 중 아닐 때
              <div className="pl-10 flex items-center justify-between">
                <span>{reply.replyBody}</span>
                {reply.memberNo === connectMemberNo && (
                  <div className="space-x-2">
                    <button
                      className="text-sm text-black-500 hover:underline"
                      onClick={() => handleEdit(index)}
                    >
                      수정
                    </button>
                    <button
                      className="text-sm text-black-500 hover:underline"
                      onClick={() => handleDelete(index)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="댓글을 입력하세요..."
        />
        <button
          onClick={handleReplySubmit}
          className="ml-2 w-[5em] px-4 py-2 bg-[#1d5091] text-white rounded
          hover:bg-[#6ea2d4]"
        >
          등록
        </button>
      </div>
    </div>
  );
}
