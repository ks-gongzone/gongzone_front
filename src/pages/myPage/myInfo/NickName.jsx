import React, { useState, useEffect } from "react";

/**
 * 닉네임 상태 관리 컴포넌트
 * @date: 2024-06-17
 * @last: 2024-06-17
 */
export default function SetNickname() {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 더미데이터
    const fetchDummyData = () => {
      return new Promise((resolve) => {
        const dummyData = {
          nickname: "더미데이터입니다.",
        };
        resolve(dummyData);
      });
    };

    fetchDummyData()
      .then((data) => {
        setNickname(data.nickname);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: 호출 실패", error);
        setLoading(false);
      });
  }, []);

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
