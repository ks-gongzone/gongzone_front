import { useState } from "react";
import { AdminMemberAPI } from "../../utils/repository";
import AuthStore from "../../utils/zustand/AuthStore";

export default function QuestionModal() {
  const [textareaValue, setTextareaValue] = useState("");
  const [typeCodeValue, setTypeCodeValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const typeCodeChange = (e) => {
    setTypeCodeValue(e.target.value);
  }

  const handleButton = async () => {
    const data = {
      memberNo: AuthStore.getState().userInfo.memberNo,
      typeCode: typeCodeValue,
      memberQuestionBody: textareaValue,
    };
    console.log('Data to send:', data);


    try {
      const response = await AdminMemberAPI.QuestionMemberInsert(data);
      if (response.status === 200) {
        console.log('Successfully sent data:', data);
        closeModal();
      } else {
        console.error('Failed to send data:', response);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>
        1:1 문의
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="text-lg font-bold mb-4">문의</div>
            <div className="mb-4">
              <div className="block text-gray-700">문의 유형</div>
              <select className="mt-1 p-2 border rounded w-full" onChange={typeCodeChange}>
                <option value="T010601">회원</option>
                <option value="T010602">게시글</option>
                <option value="T010603">파티</option>
                <option value="T010605">기타</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">문의 사유 상세</label>
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
      )}
    </div>
  );
}
