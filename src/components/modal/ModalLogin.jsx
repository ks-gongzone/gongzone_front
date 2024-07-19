import { useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import naverLogo from "../../assets/images/naverLoginButton.png";

export default function ModalLogin({ isOpen, onClose }) {
  const [loginId, setloginId] = useState("");
  const [loginPw, setloginPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("");
      onClose();
    }
  };

  const handleGoogleLogin = () => {
    const clientId =
      "901670599809-s8vu30qhb5hba1r856uvj4bulra76d0s.apps.googleusercontent.com";
    const redirectUri = encodeURI("https://www.gongzone.shop/google/callback");
    const state = Math.random().toString(36).substr(2, 11);
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile email&state=${state}`;
  };

  const handleNaverLogin = () => {
    const clientId = "ViZy5l34ZQtLQtRQEPmO";
    const redirectUri = encodeURI("https://www.gongzone.shop/naver/callback");
    const state = Math.random().toString(36).substr(2, 11);
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
  };

  const handleKakaoLogin = () => {
    //여기서 상태 검증
    const clientId = "526e8f945f81281052ccfce1af49781c";
    const redirectUri = encodeURI("https://www.gongzone.shop/kakao/callback");
    const state = Math.random().toString(36).substr(2, 11);
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile_nickname,account_email&state=${state}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">로그인</h2>
          <button onClick={onClose} className="text-black text-3xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleContinue} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="loginId"
              className="block text-sm font-medium text-gray-700"
            >
              아이디
            </label>
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
            <label
              htmlFor="loginPw"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
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
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          <div className="flex justify-between mt-4">
            <div className="ml-auto">
              <button type="submit" className="text-right text-blue-500">
                CONTINUE
              </button>
            </div>
          </div>
        </form>

        <div className="space-y-2 mt-4">
          <button
            className="w-full bg-[#f97173] text-white py-2 rounded-lg flex items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 488 512" fill="#ffffff">
              <path
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            <span className="mr-2"></span> GOOGLE
          </button>
          <button
            className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center"
            onClick={handleNaverLogin}
          >
            <img src={naverLogo} alt="Kakao Logo" className="h-full"/>
            <span className="mr-2"></span> NAVER
          </button>
          <button
            className="w-full bg-yellow-300 text-black py-2 rounded-lg flex items-center justify-center"
            onClick={handleKakaoLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="#191919">
              <path
                d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"></path>
            </svg>
            <span className="mr-2"></span> KAKAO
          </button>
        </div>
      </div>
    </div>
  );
}
