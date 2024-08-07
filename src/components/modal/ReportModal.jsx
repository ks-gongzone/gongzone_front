import { useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import { AdminMemberAPI } from "../../utils/repository";

export default function ReportModal({
  isOpen,
  closeModal,
  memberTargetNo,
  memberNick,
}) {
  const [textareaValue, setTextareaValue] = useState("");
  const [typeCodeValue, setTypeCodeValue] = useState("T010501");

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const typeCodeChange = (e) => {
    setTypeCodeValue(e.target.value);
  };

  const handleButton = async () => {
    const data = {
      memberNo: AuthStore.getState().userInfo.memberNo,
      memberTargetNo: memberTargetNo,
      typeCode: typeCodeValue,
      reasonDetail: textareaValue,
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-50">
        <div className="text-lg font-bold mb-4">신고</div>
        <div className="mb-4">
          <div className="block text-gray-700">대상 회원</div>
          <input
            type="text"
            value={memberNick}
            readOnly
            className="mt-1 p-2 border rounded w-full"
          />
          <input
            type="text"
            value={memberTargetNo}
            readOnly
            className="mt-1 p-2 border rounded w-full hidden"
          />
        </div>
        <div className="mb-4">
          <div className="block text-gray-700">신고 유형</div>
          <select
            className="mt-1 p-2 border rounded w-full"
            onClick={typeCodeChange}
            value={typeCodeValue}
          >
            <option value="T010501">부적절한 콘텐츠</option>
            <option value="T010502">사기 및 사기성 행위</option>
            <option value="T010503">스팸 및 악성 행위</option>
            <option value="T010505">지적 재산권 침해</option>
            <option value="T010506">사생활 침해 및 개인정보 보호</option>
            <option value="T010506">사용자 행위 관련</option>
            <option value="T010507">기타</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">신고 사유 상세</label>
          <textarea
            className="mt-1 p-2 border rounded w-full"
            rows="3"
            value={textareaValue}
            onChange={handleTextareaChange}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="p-2 bg-gray-300 text-gray-700 rounded mr-2"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleButton}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
