import React from "react";
import { useState } from "react";
import LocationSelect from "./LocationSelect";
import Password, { useDataSet } from "./PasswordUpdate";

function DataFill() {
  // 닉네임 입력 값
  const { value: nickname, memberInput: changeNickname } = useDataSet();
  // 핸드폰 입력 값
  const { value: phoneNumber, memberInput: changePhoneNumber } = useDataSet();

  // 지역
  const [selectedLocation, setSelectedLocation] = useState({
    do: "",
    si: "",
    gu: "",
  });
  const handleLocationChange = (doValue, siValue, guValue) => {
    setSelectedLocation({ do: doValue, si: siValue, gu: guValue });
  };

  return (
    <div className="p-12 bg-white shadow-md rounded-lg w-[800px] mx-auto ">
      <Password />
      <div className="mb-6">
        <div className="text-gray-700 font-bold text-lg mb-2">닉네임</div>
        <input
          className="w-full p-2 border border-gray-300 rounded mt-2"
          placeholder="닉네임을 입력해 주세요."
        />
      </div>
      <div className="mb-6">
        <div className="text-gray-700 font-bold text-lg mb-2">선호지역</div>
        <LocationSelect onLocationChange={handleLocationChange} />
      </div>
      <div className="mb-6">
        <div className="text-gray-700 font-bold text-lg mb-2">휴대폰</div>
        <input
          className="w-full p-2 border border-gray-300 rounded mt-2"
          placeholder="휴대폰 번호를 입력해 주세요."
        />
      </div>
      <div className="flex justify-end">
        {/*
          본인 인증 확인 ture, false값에 따라서 확인완료 혹은 다시시도
        */}
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          본인인증
        </button>
      </div>
    </div>
  );
}

export default function MemberInputData() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <DataFill />
    </div>
  );
}
