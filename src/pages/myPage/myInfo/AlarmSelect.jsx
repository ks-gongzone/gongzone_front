import React, { useEffect, useState } from "react";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-10
 * @last: 2024-06-17
 */

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between w-full mb-2 p-4 hover:bg-gray-100 transition duration-200 ease-in-out rounded">
    <label className="mr-2 text-lg">{label}</label>
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

const alarmSettings = [
  { label: "SMS 수신 여부", key: "sms" },
  { label: "이메일 수신 여부", key: "email" },
  { label: "광고성 정보 수신 여부", key: "marketing" },
  { label: "회원 알림 수신 여부", key: "member" },
  { label: "쪽지 알림 수신 여부", key: "note" },
  { label: "게시글 알림 수신 여부", key: "bulletin" },
  { label: "파티 수신 여부", key: "party" },
];

export default function AlarmSettings({ initialAlarms }) {
  const [alarms, setAlarms] = useState(
    initialAlarms ||
      alarmSettings.reduce(
        (acc, cur) => {
          acc[cur.key] = false;
          return acc;
        },
        { all: false }
      )
  );

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

  const handleChange = (key) => {
    setAlarms((prev) => {
      const newAlarms = {
        ...prev,
        [key]: !prev[key],
      };
      newAlarms.all = alarmSettings.every((setting) => newAlarms[setting.key]);
      return newAlarms;
    });
  };

  useEffect(() => {
    if (initialAlarms) {
      setAlarms(initialAlarms);
    }
  }, [initialAlarms]);

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-xl mx-auto">
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
      <div className="flex flex-col">
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
