import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfilePictureUpload from "../../components/page/myInfo/ProfilePicture";
import FollowList from "./FollowList";
import BlockList from "./BlockList";

export default function MyInfo({ memberNo, onNextPage }) {
  const [showFollowList, setShowFollowList] = useState(false);
  const [showBlockList, setShowBlockList] = useState(false);

  const handleToggleFollowList = () => {
    setShowFollowList(!showFollowList);
    setShowBlockList(false);
  }

  const handleToggleBlockList = () => {
    setShowBlockList(!showBlockList);
    setShowFollowList(false);
  }

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-64 h-64 mb-8">
            <ProfilePictureUpload memberNo={memberNo} />
          </div>
        </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={onNextPage}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              정보상세수정
        </button>
        </div>
      </div>
        <div className="flex flex-col items-center mb-8">
          <div className="flex space-x-4 mb-8">
          <button
            onClick={handleToggleFollowList}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            ♥ 팔로우 목록 보기
          </button>
          <button
            onClick={handleToggleBlockList}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            🚫 차단 목록 보기
          </button>
        </div>
      </div>
      {showFollowList && <FollowList memberNo={memberNo} />}
      {showBlockList && <BlockList mebmerNo={memberNo} /> }
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
