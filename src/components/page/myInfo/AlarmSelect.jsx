import React, { useEffect, useState } from "react";
import { GetAlertSetting, UpdateAlertSetting, InsertAlertSetting } from "../../../utils/repository";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-10
 * @last: 2024-06-19
 */

const ToggleSwitch = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between w-full mb-2 p-4 hover:bg-gray-100 transition duration-200 ease-in-out rounded">
    <label className="mr-2 text-lg">{label}</label>
    <div className="flex items-center">
      <div
        className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition duration-200 ease-in-out ${
          checked ? "bg-[#1d5091]" : "bg-gray-300"
        }`}
        onClick={onChange}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition duration-500 ease-in-out ${
            checked ? "translate-x-8" : ""
          }`}
        ></div>
      </div>
    </div>
  </div>
);

const alarmSettings = [
  { label: "SMS 수신 여부", key: "smsAlert" },
  { label: "이메일 수신 여부", key: "emailAlert" },
  { label: "광고성 정보 수신 여부", key: "marketingAlert" },
  { label: "회원 알림 수신 여부", key: "memberAlert" },
  { label: "쪽지 알림 수신 여부", key: "noteAlert" },
  { label: "게시글 알림 수신 여부", key: "bulletinAlert" },
  { label: "파티 수신 여부", key: "partyAlert" },
];

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-10
 * @last: 2024-07-01
 * @내용: 백엔드와 통신 후 값 확인
 * @수정내용: 알람 데이터가 없는 유저 기본값 세팅 수정 및 데이터 가공처리(2024-07-01)
 */
export default function AlarmSettings({ memberNo }) {
  const [alarms, setAlarms] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false); // 알람 데이터 없는 유저 상태 추가

  // db에 없는 all: data 제거 로직 추가 (2024-07-01)
  useEffect(() => {
    GetAlertSetting(memberNo)
      .then((response) => {
        const data = response.alertData;
        const newAlarms = { 
          smsAlert: data.smsAlert,
          emailAlert: data.emailAlert,
          marketingAlert: data.marketingAlert,
          memberAlert: data.memberAlert,
          noteAlert: data.noteAlert,
          bulletinAlert: data.bulletinAlert,
          partyAlert: data.partyAlert,
          all: data.smsAlert &&
               data.emailAlert &&
               data.marketingAlert &&
               data.memberAlert &&
               data.noteAlert &&
               data.bulletinAlert &&
               data.partyAlert
        };
        setAlarms(newAlarms);
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          const defaultAlarms = {
            smsAlert: false,
            emailAlert: false,
            marketingAlert: false,
            memberAlert: false,
            noteAlert: false,
            bulletinAlert: false,
            partyAlert: false,
            all: false,
          };
          setAlarms(defaultAlarms);
          setIsNewUser(true);
        }
      });
  }, [memberNo]);

  const handleAllChange = () => {
    if (!alarms) return; // 알람 로딩 안 됐을 때 종료로직 추가 (2024-06-28)
    const newValue = !alarms.all;
    const newAlarms = {
      all: newValue,
      smsAlert: newValue,
      emailAlert: newValue,
      marketingAlert: newValue,
      memberAlert: newValue,
      noteAlert: newValue,
      bulletinAlert: newValue,
      partyAlert: newValue,
    };
    setAlarms(newAlarms);
  };

  const handleChange = (key) => {
    if (!alarms) return; // 알람 로딩 안 됐을 때 종료로직 추가 (2024-06-28)
      const newAlarms = {
        ...alarms,
        [key]: !alarms[key],
      };
      newAlarms.all = alarmSettings.every((setting) => newAlarms[setting.key]);
      setAlarms(newAlarms);
  };

  const handleSave = () => {
    const saveAlert = isNewUser ? InsertAlertSetting : UpdateAlertSetting;
    saveAlert(memberNo, alarms)
      .then(() => {
        alert("알림 설정 저장완료");
        setIsNewUser(false);
      })
      .catch((error) => error);
  }

  if (!alarms) {
    return <div>알람 데이터가 필요합니다.</div>;
  }

  return (
    <div className="p-8 bg-white shadow-md rounded-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-700 font-bold text-lg">알림 설정</div>
        <label className="flex items-center">
          <div className="mr-2">전체 동의</div>
          <div
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition duration-200 ease-in-out ${
              alarms.all ? "bg-[#1d5091]" : "bg-gray-300"
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
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#1d5091] text-white font-bold py-2 px-4 rounded"
        >
          알림 설정 저장
        </button>
      </div>
    </div>
  );
}