import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationSelect from "./LocationSelect";
import ChangePassword, { useDataSet } from "./PasswordUpdate";
import AlarmSettings from "./AlarmSelect";
import SaveButton from "./SubmitButton";
import SetNickname from "./NickName";
import { ChangeUserInfo, SaveUserData } from "../../../utils/repository";

/**
 * 내 정보 컴포넌트 집합
 * @date: 2024-06-10
 * @last: 2024-06-21
 */
export default function MyInfo({ data, memberNo }) {
  const navigate = useNavigate();

  const [userData, setData] = useState({
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
    ChangeUserInfo(memberNo)
      .then((fetchUserData) => {
        setData(fetchUserData);
      })
      .catch((error) => {
        alert("사용자 정보를 가져오는데 실패했습니다.");
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [memberNo, navigate]);

  const { value: nickname, memberInput: changeNickname } = useDataSet(
    userData.nickname
  );
  const { value: phoneNumber, memberInput: changePhoneNumber } = useDataSet(
    userData.phone
  );

  useEffect(() => {
    if (!loading) {
      changeNickname(userData.nickname);
      changePhoneNumber(userData.phone);
    }
  }, [userData, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSave = () => {
    SaveUserData(memberNo, userData)
      .then(() => {
        alert("사용자 정보가 성공적으로 저장되었습니다.");
      })
      .catch((error) => {
        alert("사용자 정보를 저장하는데 실패했습니다.");
      });
  };

  return (
    <div className="bg-gray-100 py-10 overflow-y-hidden">
      <div className="p-12 bg-white shadow-md rounded-lg w-[800px] mx-auto">
        <ChangePassword memberNo={memberNo} />
        <SetNickname />
        <div className="mb-6">
          <div className="text-gray-700 font-bold text-lg mb-2">선호지역</div>
          <LocationSelect initailLocation={userData.location} />
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
        <AlarmSettings initialAlarms={userData.alarmSettings} />
        <div className="flex justify-end mt-4">
          <SaveButton userData={userData} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
}
