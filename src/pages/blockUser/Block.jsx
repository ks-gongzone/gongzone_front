// TODO 블록유저 기능 구현 예정
import React from "react";

export default function BlockUser({ data = [] }) {
  return (
    <div>
      <h2>차단목록</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((post, index) => (
            <li key={index}>{post}</li>
          ))}
        </ul>
      ) : (
        <p>차단된 사용자가 없습니다..</p>
      )}
    </div>
  );
}
