import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthStore from "../../utils/zustand/AuthStore";
import { Auth } from "../../utils/repository";
import './LodingSpinner.css';

export default function GoogleLogin() {
  const navigate = useNavigate();
  const { setIsLogin, setUserInfo } = AuthStore();
  const [hasRequested, setHasRequested] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasRequested) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');

      if (code) {
        setHasRequested(true);
        Auth.Google(code, state)
          .then((response) => {
            setLoading(false);
            if (response.success) {
              if (response.redirectUrl.includes('register')) {
                navigate(response.redirectUrl);
              } else {
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
              }
            } else {
              setErrorMessage(response.error);
            }
          })
          .catch((error) => {
            setLoading(false);
          });
      }
    }
  }, [navigate, setIsLogin, setUserInfo, hasRequested]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {loading ? (
        <>
          <div className="loader"></div>
        </>
      ) : (
        <>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        </>
      )}
    </div>
  );
}
