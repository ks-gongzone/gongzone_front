import React, { useState, useEffect } from "react";
import { GetNickname, UpdateNickname } from "../../../utils/repository";

/**
 * 닉네임 상태 관리 컴포넌트
 * @date: 2024-06-17
 * @last: 2024-07-18
 * @수정내용: 닉네임 2~8글자 한정 로직 추가 (특수 기호 불가)
 */
export default function SetNickname({ memberNo }) {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  // alert대신 메세지로 오류 표기
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    GetNickname(memberNo)
      .then((data) => {
        setNickname(data.nickname);
        setLoading(false);
      })
      .catch((error) => {
        console.error("에러: 호출 실패", error);
        setLoading(false);
      });
  }, [memberNo]);

  const isAbleNickname = (nickname) => {
    const filtering = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,8}$/;
    return filtering.test(nickname);
  };

  const changeNickname = (e) => {
    const newNickname = e.target.value;
    if (!isAbleNickname(newNickname)) {
      setValidationMessage("닉네임은 2~8자의 한글, 영문자 또는 숫자로 입력해 주세요.");
    } else {
      setValidationMessage("");
    }
    setNickname(newNickname);
  };

  const handleSaveNickname = () => {
    if (!isAbleNickname(nickname)) {
      setValidationMessage("닉네임은 2~8자의 한글, 영문자 또는 숫자로 입력해 주세요.");
      return;
    }
    UpdateNickname(memberNo, nickname)
      .then(() => {
        console.log("닉네임 저장 성공");
        alert(`${nickname}으로 변경 완료`);
      })
      .catch((error) => {
        console.error("닉네임 수정 오류", error);
        alert(`${nickname}으로는 변경 할 수 없습니다.`);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mb-6">
      <div className="text-gray-700 font-bold text-lg mb-2">닉네임</div>
      <input
        className="w-full p-2 border border-gray-300 rounded mt-2"
        placeholder="닉네임을 입력해 주세요."
        value={nickname}
        onChange={changeNickname}
      />
      {validationMessage && (
        <div className="text-red-500 text-sm mt-1">{validationMessage}</div>
      )}
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleSaveNickname}
          className="bg-[#1d5091] text-white font-bold py-2 px-4 rounded"
        >
          닉네임 저장
        </button>
      </div>
    </div>
  );
}
