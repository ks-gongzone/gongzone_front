import { HeartIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GZAPI from "../../../utils/api";

function Label({ label }) {
  if (label === "추천") {
    return (
      <span className="font-semibold text-[#2DC43B] bg-[#EFFAF0] text-[10px] px-2 py-1 rounded-lg">
        {label}
      </span>
    );
  } else if (label === "인기") {
    return (
      <span className="font-semibold text-[#6C6AFF] bg-[#F4F4FF] text-[10px] px-2 py-1 rounded-lg">
        {label}
      </span>
    );
  } else if (label === "핫") {
    return (
      <span className="font-semibold text-[#FE4D4C] bg-[#FFF2F2] text-[10px] px-2 py-1 rounded-lg">
        {label}
      </span>
    );
  }
}

export default function BoardListCard({
  children,
  img,
  title,
  id,
  labels,
  cate,
  amount,
  memberNo,
  boardNo,
  partyNo,
  wish,
  like = false,
}) {
  const [isLiked, setIsLiked] = useState(wish);
  const navigate = useNavigate();

  const likeBtn = () => {
    setIsLiked(!isLiked);
  };

  const handleCardClick = async () => {
    try {
      await GZAPI.post(`/api/boards/addView/${boardNo}`);

      navigate(`/party/detail/${memberNo}/${partyNo}`, {
        state: { memberNo, partyNo },
      });
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      likeBtn();
      await GZAPI.post(`/api/boards/wish/${boardNo}/${memberNo}`);
    } catch (error) {
      console.error("서버 요청 중 오류 발생:", error);
    }
  };

  return (
    <button
      type="button"
      className="transition-all w-full h-full text-left rounded-xl overflow-hidden bg-white border-[#EBEBEB] border hover:border-red-200 hover:scale-105"
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
            className="absolute top-4 right-4 bg-white p-2 rounded-full cursor-pointer"
            onClick={handleLikeClick}
          >
            <HeartIcon
              className={`w-6 ${isLiked ? "text-red-500" : "text-[#e7e7e7]"}`}
            />
          </div>
        )}
      </div>
      <div className="px-6 py-2">
        <div className={["flex gap-2", labels?.length > 0 && 'mb-2'].join(' ')}>
          {(labels ?? []).map(label => <Label key={label} label={label} />)}
        </div>
        <div className="text-sm text-gray-900 text-ml">{title}</div>
        <div className="flex justify-between">
        <div className="text-gray-400 text-xs mt-1">{cate}</div>
        <div className="text-xs font-bold mt-2 mb-1 text-blue-500">
          남은수량 : {amount}
        </div>
        </div>
        
      </div>
    </button>
  );
}
