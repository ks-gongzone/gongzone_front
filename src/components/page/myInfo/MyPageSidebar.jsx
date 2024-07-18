import React from "react";
import { NavLink } from "react-router-dom";

export default function MypageSidebar() {
  return (
    <div className="w-1/5 p-4 bg-gray-200 border-r">
      <div className="flex flex-col w-full h-full">
      <NavLink to="myInfo" className={({ isActive }) => `w-full p-4 text-left text-lg ${isActive ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
        내정보
      </NavLink>
      <NavLink to="myPageBoard" className={({ isActive }) => `w-full p-4 text-left text-lg ${isActive ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
        작성글
      </NavLink>
      <NavLink to="myParty" className={({ isActive }) => `w-full p-4 text-left text-lg ${isActive ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
        내파티
      </NavLink>
      <NavLink to="point" className={({ isActive }) => `w-full p-4 text-left text-lg ${isActive ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
        포인트
      </NavLink>
      </div>
    </div>
  );
}