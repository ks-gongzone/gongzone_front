import React from "react";

export default function Party({ data = [] }) {
  return (
    <div>
      <h2>내파티</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((party, index) => (
            <li key={index}>{party}</li>
          ))}
        </ul>
      ) : (
        <p>파티가 없습니다.</p>
      )}
    </div>
  );
}
