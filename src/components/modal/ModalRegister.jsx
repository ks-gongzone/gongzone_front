import { useNavigate } from 'react-router-dom';

export default function ModalRegisterLogin({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinue = (e) => {
    e.preventDefault();
    onClose();
    navigate('/register');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex-grow">회원가입</h2>
          <button onClick={onClose} className="text-black text-3xl">&times;</button>
        </div>
        <div className="space-y-2 mb-4">
          <button className="w-full bg-sky-500 text-white py-2 rounded-lg flex items-center justify-center"
                  onClick={handleContinue}>
            <span className="mr-2">+</span> GONGZONE
          </button>
          <button className="w-full bg-gray-200 text-black py-2 rounded-lg flex items-center justify-center">
            <span className="mr-2">+</span> GOOGLE
          </button>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center">
            <span className="mr-2">+</span> NAVER
          </button>
          <button className="w-full bg-yellow-300 text-black py-2 rounded-lg flex items-center justify-center">
            <span className="mr-2">+</span> KAKAO
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="text-sm text-gray-500">ID/PW 찾기</button>
        </div>
      </div>
    </div>
  );
}
