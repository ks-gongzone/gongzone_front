import React from "react";
import { contentAPI } from "../../utils/repository";

export default function MovingPoint({ setContent }) {
  // 각 섹션 클릭 시 데이터 로드
  const loadContent = async (callAPI) => {
    try {
      const data = await callAPI();
      setContent({ data });
    } catch (err) {
      console.error("Loading Error 발생", err);
      setContent({ error: "페이지 로드 실패" });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div
        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getUserInfo)}
      >
        내정보
      </div>
      <div
        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getBulletin)}
      >
        게시글
      </div>
      <div
        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getPartyInfo)}
      >
        파티
      </div>
      <div
        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getPoints)}
      >
        포인트
      </div>
      <div
        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getBlockUser)}
      >
        차단목록
      </div>
    </div>
  );
}
