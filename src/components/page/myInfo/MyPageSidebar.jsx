import React from "react";
import { NavLink } from "react-router-dom";

export default function MypageSidebar() {
  return (
    <div className="w-full">
      <div className="flex w-full">
        <NavLink to="myInfo" className={({ isActive }) => `flex-1 p-4 text-center text-lg ${isActive ? "bg-white text-black" : "bg-gray-100 text-black"}`}>
          내정보
        </NavLink>
        <NavLink to="myPageBoard" className={({ isActive }) => `flex-1 p-4 text-center text-lg ${isActive ? "bg-white text-black" : "bg-gray-100 text-black"}`}>
          찜목록
        </NavLink>
        <NavLink to="myParty" className={({ isActive }) => `flex-1 p-4 text-center text-lg ${isActive ? "bg-white text-black" : "bg-gray-100 text-black"}`}>
          내파티
        </NavLink>
        <NavLink to="point" className={({ isActive }) => `flex-1 p-4 text-center text-lg ${isActive ? "bg-white text-black" : "bg-gray-100 text-black"}`}>
          포인트
        </NavLink>
      </div>
    </div>
  );
}