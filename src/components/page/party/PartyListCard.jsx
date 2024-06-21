import { HeartIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, useRef } from "react";

export default function PartyListCard({
  children,
  img,
  title,
  id,
  desc,
  amount,
  like = false,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const likeBtn = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      type="button"
      className="max-w-sm text-left rounded-xl overflow-hidden shadow-lg bg-white border hover:border-red-200"
    >
      <div className="relative">
        <img
          className="w-full p-2 rounded-2xl h-48 object-cover"
          src={img}
          alt=""
        />
        {like && (
          <button
            type="button"
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
            onClick={likeBtn}
          >
            <HeartIcon
              className={`w-6 ${isLiked ? "text-red-500" : "text-[#e7e7e7]"}`}
            />
          </button>
        )}
      </div>
      <div className="px-6 py-3">
        <div className="font-bold text-ml mb-2">{title}</div>
        <div className="text-right text-gray-700 text-xs">{desc}</div>
        <div className="text-right font-bold text-gray-500 text-xl mt-2 mb-3">
          구매수량 : {amount}
        </div>
      </div>
    </button>
  );
}
