import React from 'react';

function LoginAlertModal({ show, handleClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">로그인 필요</h2>
        </div>
        <div className="mt-4 space-y-4">
          <p>로그인이 필요합니다. 로그인해주세요.</p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-[#1d5091] rounded hover:bg-gray-400" onClick={handleClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginAlertModal;
