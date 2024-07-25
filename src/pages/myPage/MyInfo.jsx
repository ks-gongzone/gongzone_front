import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import FollowList from "./FollowList";
import BlockList from "./BlockList";
import { BarsArrowDownIcon } from "@heroicons/react/24/solid";
import Profile from "../../components/page/myInfo/Profile";

export default function MyInfo({ memberNo, onNextPage }) {
  const navigate = useNavigate();
  const tabItems = [
    { id: "profile", label: "프로필" },
    { id: "follow", label: "팔로우 목록" },
    { id: "block", label: "차단 목록" },
    { id: "all", label: "전체 회원 보기" },
  ];

  const [activeTab, setActiveTab] = useState("profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsDropdownOpen(false); // 드롭다운 닫기
    if (id === "all") {
      navigate("/member/list"); // 전체 회원 보기 페이지로 이동
    }
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
    <div className="lg:w-[65em] w-[90%] mb-10 border-gray-200 border-2 py-8 px-4 sm:px-8 rounded-lg shadow-lg mx-auto">
      <div className="relative flex justify-start">
        <button
          onClick={toggleDropdown}
          className={`gap-2 text-lg font-bold py-2 px-5 rounded-md flex items-center bg-[#6ea2d4] hover:bg-[#1d5091] text-white`}
        >
          <BarsArrowDownIcon className="w-5 h-5" /> 메뉴
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-12 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-40"
          >
            {tabItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className="block w-full text-sm text-left px-4 py-2 hover:bg-gray-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        {activeTab === "profile" && (
          <div className="flex flex-col items-center mt-12">
            <div className="w-[90%] md:w-[60%] mb-4">
              <Profile memberNo={memberNo} />
            </div>
            <div className="border-t-2 border-gray-400 mb-12" />
            <button
              onClick={onNextPage}
              className="bg-[#1d5091] hover:bg-[#0d2544] text-white font-bold py-2 w-full px-4 rounded"
            >
              상세 정보 수정
            </button>
          </div>
        )}
        {activeTab === "follow" && <FollowList memberNo={memberNo} />}
        {activeTab === "block" && <BlockList memberNo={memberNo} />}
      </div>
    </div>
  );
}