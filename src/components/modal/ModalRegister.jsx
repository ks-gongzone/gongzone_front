import { useNavigate } from "react-router-dom";

export default function ModalRegisterLogin({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContinue = (e) => {
    e.preventDefault();
    onClose();
    navigate("/register");
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
    const clientId = "526e8f945f81281052ccfce1af49781c";
    const redirectUri = encodeURI("https://www.gongzone.shop/kakao/callback");
    const state = Math.random().toString(36).substr(2, 11);
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile_nickname,account_email&state=${state}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex-grow">회원가입</h2>
          <button onClick={onClose} className="text-black text-3xl">
            &times;
          </button>
        </div>
        <div className="space-y-2 mb-4">
          <button
            className="w-full bg-sky-500 text-white py-2 rounded-lg flex items-center justify-center"
            onClick={handleContinue}
          >
            <span className="mr-2">+</span> GONGZONE
          </button>
          <button
            className="w-full bg-gray-200 text-black py-2 rounded-lg flex items-center justify-center"
            onClick={handleGoogleLogin}
          >
            <span className="mr-2">+</span> GOOGLE
          </button>
          <button
            className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center"
            onClick={handleNaverLogin}
          >
            <span className="mr-2">+</span> NAVER
          </button>
          <button
            className="w-full bg-yellow-300 text-black py-2 rounded-lg flex items-center justify-center"
            onClick={handleKakaoLogin}
          >
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
