import { HeartIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GZAPI from "../../utils/api";

export default function MyPageBoardCard({
                                        children,
                                        img,
                                        title,
                                        id,
                                        desc,
                                        amount,
                                        boardNo,
                                        memberNo,
                                        like = true,
                                        status,
                                        wish
                                      }) {
  const [isLiked, setIsLiked] = useState(wish);
  const navigate = useNavigate();

  const likeBtn = () => {
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    navigate(`/party/detail/${memberNo}/${id}`);
  };

  const stripHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    console.log(boardNo, memberNo);
    try{
      likeBtn();
      await GZAPI.post(`/api/boards/wish/${boardNo}/${memberNo}`)
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
  };

  return (
    <button
      type="button"
      className="w-full h-full relative text-left rounded-xl overflow-hidden shadow-lg bg-white border hover:border-red-200"
      onClick={handleCardClick}
    >
      {status === "S060103" && (
        <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-md z-10">
          모집 완료
        </div>
      )}
      {status === "S060108" && (
        <div className="absolute bottom-3 left-3 bg-gray-500 text-white px-2 py-1 rounded-md z-10">
          종료된 파티
        </div>
      )}
      {status === "S060101" && (
        <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md z-10">
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
            onClick={handleLikeClick}
          >
            <HeartIcon
              className={`w-6 ${isLiked ? "text-red-500" : "text-[#e7e7e7]"}`}
            />
          </div>
        )}
      </div>
      <div className="px-6 py-3">
        <div className="font-bold text-ml mb-2">{stripHtmlTags(title)}</div>
        <div className="text-right text-gray-700 text-xs">
          {stripHtmlTags(desc)}
        </div>
        <div className="text-right font-bold text-gray-500 text-xl mt-2 mb-3">
          구매수량 : {amount}
        </div>
      </div>
    </button>
  );
}
