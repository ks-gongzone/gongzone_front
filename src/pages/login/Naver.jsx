import React, { useEffect } from 'react';
import axios from "axios";
import { Auth } from "../../utils/repository";
import { loadNaverScript } from "../../utils/naverLoginScript";

const NaverLogin = () => {
const { naver } = window;
  useEffect(() => {
    const initNaverLogin = async () => {
      await loadNaverScript();

      if (window.naver && window.naver.LoginWithNaverId) {
        const naverLogin = new window.naver.LoginWithNaverId({
          clientId: 'ViZy5l34ZQtLQtRQEPmO', // 네이버 개발자 콘솔에서 발급받은 클라이언트 ID
          callbackUrl: 'http://localhost:3000/callback', // 콜백 URL
          isPopup: true,
          loginButton: { color: 'green', type: 3, height: 40 },
        });
        naverLogin.init();
        document.getElementById('naverIdLogin').innerHTML = '';
        //naverLogin.renderLoginButton();
      } else {
        console.error('Failed to load Naver Login SDK');
      }

      const handleCallback = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (code && state) {
          try {
            const response = await axios.get(`http://localhost:3000/callback?code=${code}&state=${state}`);
            const { accessToken } = response.data;
            window.localStorage.setItem('naverAccessToken', accessToken);

            // 네이버 사용자 정보 요청
            const userInfo = await Auth.Naver();
            console.log(userInfo);
          } catch (error) {
            console.error('Error during login:', error);
          }
        }
      };
      handleCallback();
    };
    initNaverLogin();
  }, []);

  return (
    <div>
      <div id="naverIdLogin"></div>
      {/*<h2>Processing Naver Login...</h2>*/}
    </div>
  );
};

export default NaverLogin;
