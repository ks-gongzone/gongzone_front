import React, { useState } from "react";
import { Party } from "../../../utils/repository";

export default function RequestModal({
  isOpen,
  onClose,
  memberNo,
  partyNo,
  remainAmount,
}) {
  const [requestAmount, setRequestAmount] = useState(1);

  const handleSubmit = async () => {
    try {
      await Party.RequestJoin(memberNo, partyNo, "S060201", requestAmount);
      onClose();
    } catch (error) {
      console.error("Request join error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <div className="text-lg font-bold mb-4">파티 신청하기</div>
        <input
          type="number"
          value={requestAmount}
          onChange={(e) => {
            const value = Math.min(Math.max(e.target.value, 1), remainAmount);
            setRequestAmount(value);
          }}
          className="w-full border rounded p-2 mb-4"
          min="1"
          max={remainAmount} // 입력 필드의 최대값을 remainAmount로 설정
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded mr-2"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            신청
          </button>
        </div>
      </div>
    </div>
  );
}
