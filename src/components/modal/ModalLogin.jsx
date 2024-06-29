import { useState } from 'react';
import AuthStore from "../../utils/zustand/AuthStore";

export default function ModalLogin({ isOpen, onClose }) {
  const [loginId, setloginId] = useState('');
  const [loginPw, setloginPw] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { statusLogin } = AuthStore();

  if (!isOpen) return null;

  const handleContinue = async (e) => {
    e.preventDefault();
    const loginRequest = { loginId, loginPw };
    const response = await statusLogin(loginRequest);
    console.log(loginRequest);

    if (response && response.error) {
      setErrorMessage(response.error);
    } else {
      setErrorMessage('');
      onClose();
    }
  };

  const handleNaverLogin = () => {
    const clientId = 'ViZy5l34ZQtLQtRQEPmO';
    const redirectUri = encodeURI('http://localhost:3000/naver/callback');
    const state = Math.random().toString(36).substr(2, 11);
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">로그인</h2>
          <button onClick={onClose} className="text-black text-3xl">&times;</button>
        </div>
        <form onSubmit={handleContinue} className="mt-4 space-y-4">
          <div>
            <label htmlFor="loginId" className="block text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={(e) => setloginId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="loginPw" className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              id="loginPw"
              value={loginPw}
              onChange={(e) => setloginPw(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">
              {errorMessage}
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <button className="text-sm text-gray-500">ID/PW 찾기</button>
            <div>
              <button type="submit" className="text-sm text-blue-500">CONTINUE</button>
            </div>
          </div>
        </form>
        <div className="space-y-2 mt-4">
          <button className="w-full bg-gray-200 text-black py-2 rounded-lg flex items-center justify-center">
            <span className="mr-2">+</span> GOOGLE
          </button>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center"
              onClick={handleNaverLogin}>
            <span className="mr-2">+</span> NAVER
          </button>
          <button className="w-full bg-yellow-300 text-black py-2 rounded-lg flex items-center justify-center">
            <span className="mr-2">+</span> KAKAO
          </button>
        </div>
      </div>
    </div>
  );
}
