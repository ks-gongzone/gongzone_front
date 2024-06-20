import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationSelect from "./LocationSelect";
import ChangePassword, { useDataSet } from "./PasswordUpdate";
import AlarmSettings from "./AlarmSelect";
import SaveButton from "./SubmitButton";
import SetNickname from "./NickName";
import axios from "axios";

/**
 * 내 정보 컴포넌트 집합
 * @date: 2024-06-10
 * @last: 2024-06-17
 */
export default function MyInfo() {
  // 로그인 구현 전 임시 세션 설정
  sessionStorage.setItem("memberNo", "M000001");
  const memberNo = sessionStorage.getItem("memberNo");
  const returnPath = useNavigate();

  const [data, setData] = useState({
    nickname: "",
    phone: "",
    location: { do: "", si: "", gu: "" },
    alarmSettings: {
      sms: false,
      email: false,
      marketing: false,
      member: false,
      note: false,
      bulletin: false,
      party: false,
      all: false,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get(`/api/myPage/${memberNo}/memberInfo`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("데이터 로드 중 에러 발생", error);
          alert("사용자 정보를 가져오는데 실패했습니다.");
          // 데이터 없을때 메인페이지로 이동 useNavigate훅의 기능
          returnPath.push("/");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchUserData();
  }, [memberNo, returnPath]);

  const { value: nickname, memberInput: changeNickname } = useDataSet(
    data.nickname
  );
  const { value: phoneNumber, memberInput: changePhoneNumber } = useDataSet(
    data.phone
  );

  useEffect(() => {
    if (!loading) {
      changeNickname(data.nickname);
      changePhoneNumber(data.phone);
    }
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userData = {
    nickname: nickname,
    phone: phoneNumber,
    location: data.location,
    alarmSettings: data.alarmSettings,
  };

  return (
    <div className="bg-gray-100 py-10 overflow-y-hidden">
      <div className="p-12 bg-white shadow-md rounded-lg w-[800px] mx-auto">
        <ChangePassword />
        <SetNickname />
        <div className="mb-6">
          <div className="text-gray-700 font-bold text-lg mb-2">선호지역</div>
          <LocationSelect initailLocation={data.location} />
        </div>
        <div className="mb-6">
          <div className="text-gray-700 font-bold text-lg mb-2">휴대폰</div>
          <input
            className="w-full p-2 border border-gray-300 rounded mt-2"
            placeholder="휴대폰 번호를 입력해 주세요."
            value={phoneNumber}
            onChange={changePhoneNumber}
          />
        </div>
        <div className="mb-6 flex justify-end">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            본인인증
          </button>
        </div>
        <AlarmSettings initialAlarms={data.alarmSettings} />
        <div className="flex justify-end mt-4">
          <SaveButton userData={userData} />
        </div>
      </div>
    </div>
  );
}
