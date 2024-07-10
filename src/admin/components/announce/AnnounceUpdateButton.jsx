import React from "react";

/**
 * @내용: 수정버튼 
 */
export default function UpdateButton({ handleUpdate, announceNo, memberNo }) {
  return (
    <div className="flex justify-end">
      <button
        onClick={() => handleUpdate(announceNo, memberNo)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        수정하기
      </button>
    </div>
  );
}
