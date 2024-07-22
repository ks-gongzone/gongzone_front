import { useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import naverLogo from "../../assets/images/naverLoginButton.png";

import Naver from "../../assets/logo/ic-sns-naver.png";
import Kk from "../../assets/logo/ic-sns-kk.png";
import Google from "../../assets/logo/ic-sns-google.png";

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
    const redirectUri = encodeURI("http://localhost:3000/google/callback");
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
              className="block text-xs font-medium text-gray-700"
            >
              아이디
            </label>
            <input
              type="text"
              id="loginId"
              placeholder="아이디를 입력해주세요"
              value={loginId}
              onChange={(e) => setloginId(e.target.value)}
              className="mt-1 block text-sm w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="loginPw"
              className="block text-xs font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="loginPw"
              placeholder="비밀번호를 입력해주세요"
              value={loginPw}
              onChange={(e) => setloginPw(e.target.value)}
              className="mt-1 text-sm block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-[#1D5091] w-full rounded-lg text-white hover:bg-opacity-90 text-xs py-3">
              로그인
            </button>
          </div>

          
        </form>
        
        <div className="space-y-2 mt-4">
          <div className="bg-gray-300 w-full h-[1px] mb-4"></div>
          <button
            className="h-[42px] w-full text-black py-2 gap-2 rounded-md flex items-center justify-center text-xs shadow-[inset_0_0_0_0.5px_black] hover:bg-opacity-90"
            onClick={handleGoogleLogin}
          >
            <img src={Google} alt="Google Logo" className="w-6"/>
            구글 계정으로 로그인
          </button>
          <button
            className="h-[42px] w-full text-white bg-[#1DB400] py-2 gap-2 rounded-md flex items-center justify-center text-xs hover:bg-opacity-90"
            onClick={handleNaverLogin}
          >
            <img src={Naver} alt="Naver Logo" className="w-3"/>
            네이버 아이디로 로그인
          </button>
          <button
            className="h-[42px] w-full text-black bg-[#F7E318] py-2 gap-2 rounded-md flex items-center justify-center text-xs hover:bg-opacity-90"
            onClick={handleNaverLogin}
          >
            <img src={Kk} alt="Kakao Logo" className="w-4"/>
            카카오 계정으로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
