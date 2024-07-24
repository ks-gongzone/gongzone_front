import { useState } from "react";
import { AdminMemberAPI } from "../../../utils/repository";
import AuthStore from "../../../utils/zustand/AuthStore";

export default function AdminPunishModal({ selectedReport, closeModal }) {
  const [punishDuration, setPunishDuration] = useState(1);
  const [textareaValue, setTextareaValue] = useState("");
  const [typeCodeValue, setTypeCodeValue] = useState("");

  const handleDurationChange = (e) => {
    setPunishDuration(e.target.value);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const typeCodeChange = (e) => {
    setTypeCodeValue(e.target.value);
  }

  const handleButton = async () => {
    const data = {
      memberNo: selectedReport.memberNo,
      typeCode: typeCodeValue,
      reasonDetail: textareaValue,
      period: punishDuration,
    };

    const apiCall = selectedReport.isPunishUpdate
      ? AdminMemberAPI.PunishUpdate({
        ...data,
      })
      : AdminMemberAPI.PunishInsert({
        ...data,
        memberAdminNo: AuthStore.getState().userInfo.memberNo,
        statusCode: 'S010502',
        memberStatusCode: 'S010103'
      });

    try {
      const response = await apiCall;
      if (response.status === 200) {
        closeModal();
      } else {
        console.error('Failed to send data:', response);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="text-lg font-bold mb-4">제재</div>
        <div className="mb-4">
          <div className="block text-gray-700">대상 회원</div>
          <input
            type="text"
            value={selectedReport.memberNo}
            readOnly
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <div className="block text-gray-700">제재 유형</div>
          <select className="mt-1 p-2 border rounded w-full" onClick={typeCodeChange}>
            <option value="T010401">부적절한 콘텐츠</option>
            <option value="T010402">사기 및 사기성 행위</option>
            <option value="T010403">스팸 및 악성 행위</option>
            <option value="T010405">지적 재산권 침해</option>
            <option value="T010406">
              사생활 침해 및 개인정보 보호
            </option>
            <option value="T010406">사용자 행위 관련</option>
            <option value="T010407">기타</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">제재 사유 상세</label>
          <textarea
            className="mt-1 p-2 border rounded w-full"
            rows="3"
            value={textareaValue}
            onChange={handleTextareaChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <div className="block text-gray-700">제재 기간</div>
          <div className="text-center text-gray-700 mt-2">
            {punishDuration} 일
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={punishDuration}
            onChange={handleDurationChange}
            className="w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="p-2 bg-gray-300 text-gray-700 rounded mr-2"
            onClick={closeModal}
          >
            취소
          </button>
          <button type="button" className="p-2 bg-blue-500 text-white rounded"  onClick={handleButton}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
