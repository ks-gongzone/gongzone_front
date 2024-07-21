import { useNavigate } from "react-router-dom";
import Naver from "../../assets/logo/ic-sns-naver.png";
import Kk from "../../assets/logo/ic-sns-kk.png";
import Google from "../../assets/logo/ic-sns-google.png";

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
        <div className="space-y-2 mb-4 mt-8">
        <div className="space-y-2 mt-4">
        <button
            className="h-[42px] w-full text-white bg-[#1D5091] py-2 gap-2 rounded-md flex items-center justify-center text-xs hover:bg-opacity-90"
            onClick={handleContinue}
          >
            공존 계정으로 회원가입
          </button>


          <button
            className="h-[42px] w-full text-black py-2 gap-2 rounded-md flex items-center justify-center text-xs shadow-[inset_0_0_0_0.5px_black] hover:bg-opacity-90"
            onClick={handleGoogleLogin}
          >
            <img src={Google} alt="Google Logo" className="w-6"/>
            구글 계정으로 회원가입
          </button>
          <button
            className="h-[42px] w-full text-white bg-[#1DB400] py-2 gap-2 rounded-md flex items-center justify-center text-xs hover:bg-opacity-90"
            onClick={handleNaverLogin}
          >
            <img src={Naver} alt="Naver Logo" className="w-3"/>
            네이버 아이디로 회원가입
          </button>
          <button
            className="h-[42px] w-full text-black bg-[#F7E318] py-2 gap-2 rounded-md flex items-center justify-center text-xs hover:bg-opacity-90"
            onClick={handleNaverLogin}
          >
            <img src={Kk} alt="Kakao Logo" className="w-4"/>
            카카오 계정으로 회원가입
          </button>
        </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button className=" text-gray-400 text-center w-full text-xs">ID/PW 찾기</button>
        </div>
      </div>
    </div>
  );
}
