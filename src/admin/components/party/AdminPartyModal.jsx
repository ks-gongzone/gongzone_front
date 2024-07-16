import { useState } from "react";
import { Party } from "../../../utils/repository";

export default function AdminPartyModal({ selectedParty, closeModal }) {
  const [partyNo, setPartyNo] = useState(selectedParty.partyNo);
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  const handleButton = async () => {
    try {
      const response = await Party.SettlementParty(partyNo);
      if (response.status === 200) {
        console.log("Successfully settled party:", partyNo);
        closeModal();
      } else {
        console.error("Failed to settle party:", response);
      }
    } catch (error) {
      console.error("Error settling party:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="text-lg font-bold mb-4">파티 정산</div>
        <div className="mb-4">
          <div className="block text-gray-700">파티 번호</div>
          <input
            type="text"
            value={partyNo}
            readOnly
            className="mt-1 p-2 border rounded w-full"
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
          <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleButton}
          >
            정산
          </button>
        </div>
      </div>
    </div>
  );
}
