import React from "react";
export default function Board({ data = [] }) {
  return (
    <div>
      <h2>작성글</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((post, index) => (
            <li key="{index}">{post}</li>
          ))}
        </ul>
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
}
