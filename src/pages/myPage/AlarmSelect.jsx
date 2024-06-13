import React, { useState } from "react";
import "./toggle.css";

export default function AlarmSettings() {
  const [alarms, setAlarms] = useState({
    all: false,
    sms: false,
    email: false,
    marketing: false,
    member: false,
    note: false,
    bulletin: false,
    party: false,
  });

  const handleChange = (e) => {
    const { name } = e.target;
    setAlarms((beforeAlarms) => ({
      ...beforeAlarms, // beforeAlarms의 객체를 복사
      [name]: !beforeAlarms[name], // 동적으로 객체 속성 업데이트
    }));
  };

  return (
    <div className="mb-6">
      <div className="text-gray-700 font-bold text-lg mb-2">알림 설정</div>
      {Object.keys(alarms).map((key) => (
        <div key={key} className="flex items-center mb-2">
          <label className="mr-2 capitalize">{key}</label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              name={key}
              checked={alarms[key]}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>
      ))}
    </div>
  );
}
