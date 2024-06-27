import React, { useEffect } from 'react';
import { Auth } from "../../utils/repository";
import { naverClientId, naverRedirectURL, naverSecret } from '../../utils/naverLoginOAuth';

const { naver } = window;

const NaverLogin = () => {
  const initializeNaverLogin = () => {
    if (window.naver) {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: naverClientId,
        callbackUrl: naverRedirectURL,
        clientSecret: naverSecret,
        isPopup: false,
        loginButton: { color: 'green', type: 3, height: '60' },
      });
      naverLogin.init();

      naverLogin.getLoginStatus((status) => {
        if (status) {
          const user = naverLogin.user;
          Auth.Naver().then((res) => {
            if (res.error) {
              console.error(res.error);
            } else {
              // 네이버 로그인 성공 시 처리 로직
              console.log('Naver login success:', res);
              // 예: 사용자 정보를 로컬 스토리지에 저장
              window.localStorage.setItem("accessToken", res.accessToken);
              window.location.href = "/"; // 리디렉션
            }
          });
        } else {
          console.log('Naver login failed or user not logged in.');
        }
      });
    } else {
      console.error("Naver script not loaded");
    }
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
