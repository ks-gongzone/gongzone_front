import React, { useState } from "react";

// 개별 토글 스위치
const ToggleSwitch = ({ label, name, checked, onChange }) => (
  <div className="flex items-center justify-between w-full mb-4 p-2 hover:bg-gray-100 transition duration-200 ease-in-out rounded">
    <label className="mr-2">{label}</label>
    <div className="flex items-center">
      <div
        className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition duration-200 ease-in-out ${
          checked ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={onChange}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform tarnsition duration-500 ease-in-out ${
            checked ? "translate-x-8" : ""
          }`}
        ></div>
      </div>
    </div>
  </div>
);

// 알람 설정 배열
const alarmSettings = [
  { label: "SMS 수신 여부", key: "sms" },
  { label: "이메일 수신 여부", key: "email" },
  { label: "광고성 정보 수신 여부", key: "marketing" },
  { label: "회원 알림 수신 여부", key: "member" },
  { label: "쪽지 알림 수신 여부", key: "note" },
  { label: "게시글 알림 수신 여부", key: "bulletin" },
  { label: "파티 수신 여부", key: "party" },
];

export default function AlarmSettings() {
  // 알람 상태 초기화
  const [alarms, setAlarms] = useState(
    // acc 누적후 최종적으로 출력, cur 현재 돌고있는 요소
    alarmSettings.reduce(
      (acc, cur) => {
        acc[cur.key] = false; // 각 알람 항목의 초기 값을 false로 설정
        return acc;
      },
      { all: false }
    )
  );

  // 전체 동의 상태 변경
  const handleAllChange = () => {
    const newValue = !alarms.all;
    setAlarms({
      all: newValue,
      sms: newValue,
      email: newValue,
      marketing: newValue,
      member: newValue,
      note: newValue,
      bulletin: newValue,
      party: newValue,
    });
  };

  // 개별 알람 항목
  const handleChange = (key) => {
    setAlarms((prev) => {
      const newAlarms = {
        ...prev,
        [key]: !prev[key], // 선택된 항목의 상태를 변경
      };
      // 전체 동의 상태 변경시 업데이트
      newAlarms.all = alarmSettings.every((setting) => newAlarms[setting.key]);
      return newAlarms;
    });
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-xl mx-auto">
      {/* 전체 동의 */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-700 font-bold text-lg">알림 설정</div>
        <label className="flex items-center">
          <div className="mr-2">전체 동의</div>
          <div
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition duration-200 ease-in-out ${
              alarms.all ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={handleAllChange}
          >
            <div
              className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-500 ease-in-out ${
                alarms.all ? "translate-x-8" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>
      {/* 개별 알람 동의 */}
      <div className="flex flex-col gap-4">
        {alarmSettings.map((setting) => (
          <ToggleSwitch
            key={setting.key}
            name={setting.key}
            label={setting.label}
            checked={alarms[setting.key]}
            onChange={() => handleChange(setting.key)}
          />
        ))}
      </div>
    </div>
  );
}
