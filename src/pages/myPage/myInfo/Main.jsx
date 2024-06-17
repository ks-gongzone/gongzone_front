import React, { useState, useEffect } from "react";
import LocationSelect from "./LocationSelect";
import Password, { useDataSet } from "./PasswordUpdate";
import AlarmSettings from "./AlarmSelect";
import SaveButton from "./SubmitBubbon";
import SetNickname from "./NickName";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-10
 * @last: 2024-06-17
 */
export default function MyInfo() {
  const [data, setData] = useState({
    name: "",
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
      //  더미데이터
      const dummyData = {
        name: "홍길동",
        phone: "010-1234-5678",
        location: { do: "서울", si: "강남구", gu: "역삼동" },
        alarmSettings: {
          sms: true,
          email: true,
          marketing: false,
          member: true,
          note: false,
          bulletin: true,
          party: true,
          all: false,
        },
      };

      Promise.resolve(dummyData)
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error("데이터 로드 중 에러 발생", error);
          setLoading(false);
        });
    };
    fetchUserData();
  }, []);

  const { value: nickname, memberInput: changeNickname } = useDataSet(
    data.name
  );
  const { value: phoneNumber, memberInput: changePhoneNumber } = useDataSet(
    data.phone
  );

  useEffect(() => {
    if (!loading) {
      changeNickname(data.name);
      changePhoneNumber(data.phone);
    }
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userData = {
    name: nickname,
    phone: phoneNumber,
    location: data.location,
    alarmSettings: data.alarmSettings,
  };

  return (
    <div className="bg-gray-100 py-10 overflow-y-hidden">
      <div className="p-12 bg-white shadow-md rounded-lg w-[800px] mx-auto">
        <Password />
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
