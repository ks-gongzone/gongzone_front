import { useState } from "react";
import MovingPoint from "./MovingPointBackUp";

export default function MyPageMain() {
  const [content, setContent] = useState();

  return (
    // 사이드바로 변경
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <MovingPoint setContent={setContent} />
      </div>

      <div className="w-3/4 p-4">
        {content ? (
          content.error ? (
            <div className="text-red-500">{content.error}</div>
          ) : (
            <div>{JSON.stringify(content, null, 2)}</div>
          )
        ) : (
          <div>클릭해주세요</div>
        )}
      </div>
    </div>
  );
}
