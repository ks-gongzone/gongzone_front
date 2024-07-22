import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthStore from "../../utils/zustand/AuthStore";
import { Auth } from "../../utils/repository";


export default function NaverLogin() {
  const navigate = useNavigate();
  const { setIsLogin, setUserInfo } = AuthStore();
  const [hasRequested, setHasRequested] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!hasRequested) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      console.log('Code:', code);  // 확인용 로그
      console.log('State:', state);  // 확인용 로그

      if (code) {
        setHasRequested(true);
        Auth.Naver(code, state)
          .then((response) => {
            // 로그인 성공 시 처리 로직
            if (response.accessToken) {
              window.localStorage.setItem("accessToken", response.accessToken);
              window.localStorage.setItem("refreshToken", response.refreshToken);
              setIsLogin(true);
              setUserInfo({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                memberNo: response.memberNo,
                pointNo: response.pointNo,
              });
              navigate('/home');
            } else {
              console.error('로그인 실패:', response);
              setErrorMessage(response.error);
            }
          })
          .catch((error, response) => {
            console.error('로그인 오류:', error);
          });
      }
    }
  }, [navigate, setIsLogin, setUserInfo, hasRequested]);

  return (
    <div>
      네이버 로그인 처리 중...
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
    </div>
  );
};


