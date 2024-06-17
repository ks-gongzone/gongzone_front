// src/pages/SignUpPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Auth } from "../../utils/repository";

// 회원가입 페이지 컴포넌트
export  default function SocialSignup(){
  const location = useLocation();
  const navigatenavigate = useNavigate();
  const [additionalInfo, setAdditionalInfo] = useState({
    phoneNumber: '',
    address: '',
  });

  const { socialMember } = location.state || {};

  // 입력 필드 값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo({
      ...additionalInfo,
      [name]: value,
    });
  };

  // 회원가입 버튼 클릭 핸들러
  const handleSignUp = () => {
    Auth.signUp({ ...socialMember, ...additionalInfo }) // socialMember와 추가 정보를 합쳐서 백엔드로 전송
      .then(response => {
        const { token } = response.data;
        window.localStorage.setItem('accessToken', token); // JWT 토큰을 로컬 스토리지에 저장
        history.push('/'); // 회원가입 후 홈 페이지로 리디렉션
      })
      .catch(error => {
        console.error('회원가입 실패:', error);
      });
  };

  return (
    <div>
      <h2>추가 정보 입력</h2>
      <input
        type="text"
        name="phoneNumber"
        value={additionalInfo.phoneNumber}
        onChange={handleInputChange}
        placeholder="전화번호"
      />
      <input
        type="text"
        name="address"
        value={additionalInfo.address}
        onChange={handleInputChange}
        placeholder="주소"
      />
      {/* 추가 정보 입력 필드 추가 가능 */}
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

