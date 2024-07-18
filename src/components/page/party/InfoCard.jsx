import React, { useState, useEffect } from "react";
import {
  ClockIcon,
  CurrencyDollarIcon,
  LinkIcon,
  ShareIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import GZAPI from "../../../utils/api";

export default function InfoCard({
  chirdren,
  img,
  title,
  desc,
  link,
  remainAmt,
  targetAmt,
  address,
  price,
  period,
  writeNo,
  connectNo,
  boardNo,
  partyNo
}) {
  const [isCopied, setIsCopied] = useState(false);

  const navigate = useNavigate();

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000); // 2초 후에 안내 메시지 숨기기
    });
  };

  const handleBoardUpdate = () => {
    navigate(`/board/update/${boardNo}`)
  }

  const handleBoardDelete = async () => {
    try{
      const response = await GZAPI.delete(`api/boards/delete/${boardNo}/${partyNo}`)
      console.log(response);
      if (response.status === 200) {
        // 성공적으로 삭제되었음을 사용자에게 알림
        alert('게시글이 성공적으로 삭제되었습니다.');
        navigate(`/board/list`)
      } else {
        const errorData = await response.text();
        alert(errorData || '게시글 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting board:', error);
      alert('파티원이 있는 게시글은 삭제할 수 없습니다.');
    }
  }

  return (
    <div className="w-full flex justify-between">
      <div className="mt-2 w-[30em] h-[28em] rounded-md bg-slate-400 flex-shrink-0">
        <img
          className="w-[30em] h-[28em] rounded-md object-cover"
          src={img}
          alt=""
        />
      </div>
      <div className="pl-5 pt-5 flex-1">
        <div className="flex justify-between">
          <div>
            <div className="font-bold ml-5 mt-5 text-[1vw]">{title}</div>
            <div className="ml-5 py-7 font-semibold text-gray-700">{desc}</div>
          </div>
          <div className="relative flex items-center">
            {writeNo === connectNo && (
              <>
              {/* 수정 버튼 */}
              <button 
                className="bg-[#6ea2d4] hover:bg-[#1d5091] text-white font-bold py-1 px-2 rounded w-14 h-8"
                onClick={handleBoardUpdate}>
              수정
              </button>
              {/* 삭제 버튼 */}
              <button 
                className="bg-[#f97173] hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-1 w-14 h-8"
                onClick={handleBoardDelete}
              >
              삭제
              </button>
            </>
            )}
            <button onClick={handleShareClick}>
              <ShareIcon className="mt-3 w-8 h-8" />
            </button>
            {isCopied && (
              <div className="absolute top-10 ml-2 mt-1 text-sm text-green-500 bg-white p-2 rounded shadow-lg w-max">
                URL이 복사되었습니다!
              </div>
            )}
          </div>
        </div>
        <hr className="w-full ml-5" />
        <div className="pt-4 text-gray-600 ml-5 mt-5 text-[0.9vw] flex gap-2">
          <MapPinIcon className="w-7 h-7" /> {address}
        </div>
        <div className="text-gray-600 ml-5 mt-5 text-[0.9vw] flex gap-2">
          <ClockIcon className="w-7 h-7" /> 종료일 : {period}
        </div>
        <div className="text-gray-600 ml-5 mt-5 text-[0.9vw] flex gap-2">
          <ShoppingCartIcon className="w-7 h-7" /> 남은수량 : {remainAmt} /
          목표수량 : {targetAmt}
        </div>
        <div className="text-gray-600 ml-5 mt-5 text-[0.9vw] flex gap-2">
          <CurrencyDollarIcon className="w-7 h-7" /> 단위 당 가격 : {price}원
        </div>
        <Link
          className="text-gray-600 ml-5 mt-5 hover:text-red-600 text-[0.9vw] flex gap-2"
          to={link}
        >
          <LinkIcon className="w-7 h-7" /> 제품 구매 링크 바로가기
        </Link>
      </div>
    </div>
  );
}
