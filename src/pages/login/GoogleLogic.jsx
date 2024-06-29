import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthStore from "../../utils/zustand/AuthStore";
import { Auth } from "../../utils/repository";

export default function GoogleLogin() {
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
        Auth.Google(code, state)
          .then((response) => {
            // 로그인 성공 시 처리 로직
            console.log('로그인 성공:', response);
            window.localStorage.setItem('accessToken', response.jwtToken);
            setIsLogin(true);
            setUserInfo({
              token: response.jwtToken,
              memberNo: response.memberNo,
              pointNo: response.pointNo,
            });
            navigate('/');
          })
          .catch((error) => {
            console.error('로그인 오류:', error);
          });
      }
    }
  }, [navigate, setIsLogin, setUserInfo, hasRequested]);

  return (
    <div>
      구글 로그인 처리 중...
    </div>
  );
};
