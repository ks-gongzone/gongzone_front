import { HeartIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardListCard({
  children,
  img,
  title,
  id,
  cate,
  amount,
  memberNo,
  like = false,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const likeBtn = () => {
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    navigate(`/party/detail/${memberNo}`);
  };

  return (
    <button
      type="button"
      className="w-full text-left rounded-xl overflow-hidden shadow-lg bg-white border hover:border-red-200"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          className="w-full p-2 rounded-2xl h-48 object-cover"
          src={img}
          alt=""
        />
        {like && (
          <div
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              likeBtn();
            }}
          >
            <HeartIcon
              className={`w-6 ${isLiked ? "text-red-500" : "text-[#e7e7e7]"}`}
            />
          </div>
        )}
      </div>
      <div className="px-6 py-3">
        <div className="font-bold text-ml mb-2">{title}</div>
        <div className="text-right text-gray-700 text-xs">{cate}</div>
        <div className="text-right font-bold text-gray-500 text-xl mt-2 mb-3">
          남은수량 : {amount}
        </div>
      </div>
    </button>
  );
}
