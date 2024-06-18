import { HeartIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useRef } from "react";

export default function PartyCard({
  children,
  img,
  id,
  desc,
  amount,
  note = false,
  like = false,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
            <button type="button" className="self-end mr-4">
              <HeartIcon
                className={`w-6 ${isLiked ? "text-red-500" : "text-[#e7e7e7]"}`}
                onClick={likeBtn}
              />
            </button>
          )}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="font-bold text-gray-500 text-sm focus:outline-none"
            >
              {id}
            </button>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    쪽지보내기
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    거래 내역 조회
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
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
          >
            쪽지 보내기
          </button>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
