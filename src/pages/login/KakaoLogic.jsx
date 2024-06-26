import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthStore from "../../utils/zustand/AuthStore";
import { Auth } from "../../utils/repository";

export default function KakaoLogin() {
  const navigate = useNavigate();
  const { setIsLogin, setUserInfo } = AuthStore();
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    if (!hasRequested) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      console.log('Code:', code);  // 확인용 로그
      console.log('State:', state);  // 확인용 로그

      if (code) {
        setHasRequested(true);
        Auth.Kakao(code, state)
          .then((response) => {
            if (response.success) {
              if (response.redirectUrl.includes('register')) {
                navigate(response.redirectUrl);
              } else {
                window.localStorage.setItem('accessToken', response.token);
                setIsLogin(true);
                setUserInfo({
                  token: response.token,
                  memberNo: response.memberNo,
                  pointNo: response.pointNo,
                });
                navigate('/');
              }
            } else {
              console.error('로그인 실패:', response);
            }
          })
          .catch((error) => {
            console.error('로그인 오류:', error);
          });
      }
    }
  }, [navigate, setIsLogin, setUserInfo, hasRequested]);

  return (
    <div>
      카카오 로그인 처리 중...
    </div>
  );
};
