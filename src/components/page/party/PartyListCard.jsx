import { HeartIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PartyListCard({
  children,
  img,
  title,
  id,
  desc,
  amount,
  memberNo,
  like = false,
  status, // 새로운 prop 추가
}) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const likeBtn = () => {
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    navigate(`/party/detail/${memberNo}`);
  };

  const stripHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <button
      type="button"
      className="relative transition-all w-full h-full text-left rounded-xl overflow-hidden bg-white border-[#EBEBEB] border hover:border-red-200 hover:scale-105"
      onClick={handleCardClick}
    >
      {status === "S060103" && (
        <div className="absolute bottom-3 left-3 bg-[#1d5091] text-white px-2 py-1 rounded-md z-10">
          모집 완료
        </div>
      )}
      {status === "S060108" && (
        <div className="absolute bottom-3 left-3 bg-[#ce3375] text-white px-2 py-1 rounded-md z-10">
          종료된 파티
        </div>
      )}
      {status === "S060101" && (
        <div className="absolute bottom-3 left-3 bg-[#62c8b3] text-white px-2 py-1 rounded-md z-10">
          모집중인 파티
        </div>
      )}
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
      <div className="px-6 py-2">
        <div className="text-sm text-gray-900 text-ml">
          {stripHtmlTags(desc)}
        </div>
        <div className="text-right text-gray-500 text-xs">
          {stripHtmlTags(title)}
        </div>
        <div className="text-xs text-right font-bold mt-2 mb-1 text-[#1d5091]">
          총 구매수량 : {amount}
        </div>
      </div>
    </button>
  );
}
