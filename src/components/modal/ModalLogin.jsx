import { useState } from 'react';

export default function ModalLogin({ isOpen, onClose }) {
  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('memberId:', memberId);
    console.log('memberPw:', memberPw);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">로그인</h2>
          <button onClick={onClose} className="text-black text-4xl">&times;</button>
        </div>
        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-2">
            <label htmlFor="memberId" className="block text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              id="memberId"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="memberPw" className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              id="memberPw"
              value={memberPw}
              onChange={(e) => setMemberPw(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4">로그인</button>
        </form>
        <div className="flex flex-col space-y-2">
          <button className="bg-red-500 text-white w-full py-2 rounded-lg">
            Google 계정으로 로그인
          </button>
          <button className="bg-green-500 text-white w-full py-2 rounded-lg">
            Naver 계정으로 로그인
          </button>
          <button className="bg-yellow-400 text-white w-full py-2 rounded-lg">
            Kakao 계정으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
