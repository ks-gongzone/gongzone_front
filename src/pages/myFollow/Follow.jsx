// TODO 팔로우 멤버 리스트 보기 기능 구현 예정
import React from "react";

export default function Follow({ data = [] }) {
  return (
    <div>
      <h2>친구목록</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((follow, index) => (
            <li key={index}>{follow}</li>
          ))}
        </ul>
      ) : (
        <p>친구가 없습니다.</p>
      )}
    </div>
  );
}
