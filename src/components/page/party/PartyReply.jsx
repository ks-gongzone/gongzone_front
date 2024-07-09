import { useState, useRef, useEffect } from "react";
import AuthStore from "../../../utils/zustand/AuthStore";

export default function PartyReply({ partyNo }) {
  const items = [
    { memberNick: "유신", content: "참가하겠습니다." },
    { memberNick: "감찬", content: "저도 참가할게요." },
    { memberNick: "순신", content: "좋은 아이디어네요." },
  ];
  const [Reply, setReply] = useState("");
  const memberNo = AuthStore((state) => state.userInfo.memberNo);

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

  const handleReplySubmit = async () => {
    //   if (newReply.trim()) {
    //     try {
    //       await Party.PostReply(partyNo, memberNo, newReply);
    //       setReplies([...replies, { memberNick: '현재 사용자', content: newReply }]);
    //       setNewReply('');
    //     } catch (error) {
    //       console.error('Error posting reply:', error);
    //     }
    //   }
  };

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">댓글</div>
      <div className="mb-4">
        {items.map((reply, index) => (
          <div key={index} className="p-2 border-b border-gray-200">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => toggleDropdown(index)}
                className="font-bold text-xl text-gray-500 text-sm focus:outline-none"
              >
                {items[index].memberNick}
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
            <div className="pl-10">{reply.content}</div>
          </div>
        ))}
      </div>
      <div className="flex">
        <textarea
          value={Reply}
          onChange={(e) => setReply(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="댓글을 입력하세요..."
        />
        <button
          onClick={handleReplySubmit}
          className="ml-2 w-[5em] px-4 py-2 bg-blue-500 text-white rounded"
        >
          등록
        </button>
      </div>
    </div>
  );
}
