import React, { useState, useEffect } from "react";
import { GetNickname } from "../../../utils/repository";

/**
 * 닉네임 상태 관리 컴포넌트
 * @date: 2024-06-17
 * @last: 2024-06-21
 */
export default function SetNickname({ memberNo }) {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

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

  const changeNickname = (e) => {
    setNickname(e.target.value);
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
    </div>
  );
}
