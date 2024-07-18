import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProfilePictureUpload from "../../components/page/myInfo/ProfilePicture";
import FollowList from "./FollowList";
import BlockList from "./BlockList";

export default function MyInfo({ memberNo, onNextPage }) {
  const tabItems = [
    { id: "profile", label: "프로필" },
    { id: "follow", label: "팔로우 목록" },
    { id: "block", label: "차단 목록" },
  ];

  const [activeTab, setActiveTab] = useState("profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setIsDropdownOpen(false); // 드롭다운 닫기
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
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="sticky top-0 z-10 flex justify-start">
        <button
          onClick={toggleDropdown}
          className={`text-lg font-bold py-2 px-4 rounded flex items-center bg-blue-500 text-white`}
        >
          ▼ 목록
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute mt-2 bg-white border rounded shadow-lg">
            {tabItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        {activeTab === "profile" && (
          <div className="flex flex-col items-center mb-8">
            <div className="w-64 h-64 mb-4">
              <ProfilePictureUpload memberNo={memberNo} />
            </div>
            <div className="flex justify-end w-full">
              <button
                onClick={onNextPage}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                정보상세수정
              </button>
            </div>
          </div>
        )}
        {activeTab === "follow" && <FollowList memberNo={memberNo} />}
        {activeTab === "block" && <BlockList memberNo={memberNo} />}
      </div>
      <div className="flex justify-end mt-4">
        <Link
          to="/member/list"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          모든회원보기
        </Link>
      </div>
    </div>
  );
}
