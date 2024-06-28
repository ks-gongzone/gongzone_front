import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyInfo from "../myInfo/MyInfo";
import Point from "../point/Point";
import Board from "./Board";
import MyParty from "./MyParty";
import Follow from "./Follow";
import Block from "./Block";
import {
  ChangeUserInfo,
  MyBoard,
  Myfollow,
  BlockUser,
} from "../../utils/repository";
import AuthStore from "../../utils/zustand/AuthStore";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-12
 * @last: 2024-06-28
 * @변경내용: point, party 컴포넌트 호출 (2024-06-28 수정)
 */
export default function MyPage() {
  const [activeTab, setActiveTab] = useState("myInfo");
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, isLogin } = AuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      console.log("로그인이 필요한 서비스");
      // navigate("/"); 안정화 후 추가 예정
    } else {
      TapName(activeTab);
    }
  }, [activeTab, isLogin]);

  const TapName = (tab) => {
    setContent(null); 
    setIsLoading(true);
    setActiveTab(tab);
    let changeData;

    switch (tab) {
      case "myInfo":
        changeData = ChangeUserInfo(userInfo.memberNo);
        break;
      case "myBoard":
        changeData = MyBoard(userInfo.memberNo);
        break;
      case "myParty":
        changeData = Promise.resolve(null); // 빈 프로미스로 설정
        break;
      case "myPoint":
        changeData = Promise.resolve(null); // 빈 프로미스로 설정
        break;
      case "myFollow":
        changeData = Myfollow(userInfo.memberNo);
        break;
      case "blockUser":
        changeData = BlockUser(userInfo.memberNo);
        break;
      default:
        setIsLoading(false);
        setContent(null);
        return;
    }

    if (changeData) {
      changeData
      .then((data) => {
        setContent(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("변경중 에러발생", error);
        setContent({ error: `변경 중 에러 내용: ${error.message}` });
        setIsLoading(false);
      });
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>로딩 중...</div>
    }

    switch (activeTab) {
      case "myInfo":
        return <MyInfo data={content || {}} memberNo={userInfo.memberNo} />;
      case "myBoard":
        return <Board data={content || []} memberNo={userInfo.memberNo} />;
      case "myParty":
        return <MyParty />;
      case "myPoint":
        return <Point />;
      case "myFollow":
        return <Follow data={content || []} memberNo={userInfo.memberNo} />;
      case "blockUser":
        return <Block data={content || []} memberNo={userInfo.memberNo} />;
      default:
        return <div>클릭해주세요.</div>;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/5 p-4 bg-gray-200 border-r">
        <div className="flex flex-col w-full h-full">
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "myInfo"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("myInfo")}
          >
            내정보
          </button>
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "myBoard"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("myBoard")}
          >
            작성글
          </button>
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "myParty"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("myParty")}
          >
            내파티
          </button>
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "myPoint"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("myPoint")}
          >
            포인트
          </button>
          <button
            className={`w-full p-4 text-left text-lg ${
              activeTab === "blockUser"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => TapName("blockUser")}
          >
            차단목록
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        {content ? (
          content.error ? (
            <div className="text-red-500">{content.error}</div>
          ) : (
            renderContent()
          )
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}
