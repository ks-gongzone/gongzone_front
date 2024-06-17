import React, { useState } from "react";
import { contentAPI } from "../../utils/repository";

export default function MovingPoint() {
  // 콘텐츠를 저장할 상태
  const [content, setContent] = useState();
  // 오류 메시지를 저장할 상태
  const [error, setError] = useState();

  // 각 섹션 클릭 시 데이터 로드
  const loadContent = async (callAPI) => {
    try {
      const data = await callAPI();
      setContent(data);
      setError(null);
    } catch (err) {
      console.error("Loading Error 발생", err);
      setContent(null);
      setError("페이지 로드 실패");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div
        className="cusor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getUserInfo)}
      >
        내정보
      </div>
      <div
        className="cusor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getBulletin)}
      >
        게시글
      </div>
      <div
        className="cusor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getPartyInfo)}
      >
        파티
      </div>
      <div
        className="cusor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getPoints)}
      >
        포인트
      </div>
      <div
        className="cusor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={() => loadContent(contentAPI.getBlockUser)}
      >
        차단목록
      </div>

      <div className="mt-4">
        {error && <div className="text-red-500">{error}</div>}
        {content ? (
          <div>{JSON.stringify(content, null, 2)}</div>
        ) : (
          <div>클릭해주세요</div>
        )}
      </div>
    </div>
  );
}
