import React, { useState } from "react";
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
import AuthStore from "../../../utils/zustand/AuthStore";

export default function InfoCard({
  children,
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
  partyNo,
}) {
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const memberNo = AuthStore((state) => state.userInfo.memberNo);

  const handleShareClick = () => {
    const url = `${window.location.origin}/party/detail/${memberNo}/${partyNo}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  const handleBoardUpdate = () => {
    navigate(`/board/update/${boardNo}`);
  };

  const handleBoardDelete = async () => {
    try {
      const response = await GZAPI.delete(
        `api/boards/delete/${boardNo}/${partyNo}`
      );
      console.log(response);
      if (response.status === 200) {
        alert("게시글이 성공적으로 삭제되었습니다.");
        navigate(`/board/list`);
      } else {
        const errorData = await response.text();
        alert(errorData || "게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("파티원이 있는 게시글은 삭제할 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full">
      <div className="mt-2 w-full lg:w-[30em] h-[28em] rounded-md bg-slate-400 flex-shrink-0">
        <img
          className="w-full h-full rounded-md object-cover"
          src={img}
          alt=""
        />
      </div>
      <div className="lg:pl-5 pt-5 flex-1">
        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            <div className="font-bold mt-5 text-lg lg:text-[1vw]">{title}</div>
            <div className="py-7 font-semibold text-gray-700 text-sm lg:text-base">
              {desc}
            </div>
          </div>
          <div className="relative flex items-center">
            {writeNo === connectNo && (
              <>
                <button
                  className="bg-[#6ea2d4] hover:bg-[#1d5091] text-white font-bold py-1 px-2 rounded w-14 h-8 mt-3"
                  onClick={handleBoardUpdate}
                >
                  수정
                </button>
                <button
                  className="bg-[#f97173] hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-1 w-14 h-8 mt-3"
                  onClick={handleBoardDelete}
                >
                  삭제
                </button>
              </>
            )}
            <button onClick={handleShareClick}>
              <ShareIcon className="mt-3 w-8 h-8 ml-5" />
            </button>
            {isCopied && (
              <div className="absolute top-10 ml-2 mt-1 text-sm text-green-500 bg-white p-2 rounded shadow-lg w-max">
                URL이 복사되었습니다!
              </div>
            )}
          </div>
        </div>
        <hr className="w-full" />
        <div className="pt-4 text-gray-600 mt-5 text-sm lg:text-[0.9vw] flex gap-2 items-center">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" /> {address}
        </div>
        <div className="text-gray-600 mt-5 text-sm lg:text-[0.9vw] flex gap-2 items-center">
          <ClockIcon className="w-5 h-5 lg:w-7 lg:h-7" /> 종료일 : {period}
        </div>
        <div className="text-gray-600 mt-5 text-sm lg:text-[0.9vw] flex gap-2 items-center">
          <ShoppingCartIcon className="w-5 h-5 lg:w-7 lg:h-7" /> 남은수량 :{" "}
          {remainAmt} / 목표수량 : {targetAmt}
        </div>
        <div className="text-gray-600 mt-5 text-sm lg:text-[0.9vw] flex gap-2 items-center">
          <CurrencyDollarIcon className="w-5 h-5 lg:w-7 lg:h-7" /> 단위 당 가격
          : {price}원
        </div>
        <Link
          className="text-gray-600 mt-5 hover:text-red-600 text-sm lg:text-[0.9vw] flex gap-2 items-center"
          to={link}
        >
          <LinkIcon className="w-5 h-5 lg:w-7 lg:h-7" /> 제품 구매 링크 바로가기
        </Link>
      </div>
    </div>
  );
}
