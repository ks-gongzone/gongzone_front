import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MypageSidebar from "../../components/page/myInfo/MyPageSidebar";
import AuthStore from "../../utils/zustand/AuthStore";
import { MyInfo, MyParty, BlockUser, Board, Follow } from "./Index"
import { Point } from "../point/Index";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-12
 * @last: 2024-07-04
 * @변경내용: 화면송출 형식변경 (useState로 상태관리 -> useNavigate 링크로 전환)
 */
export default function MyPage() {
  const [activeTab, setActiveTab] = useState("myInfo");
  const { userInfo, isLogin } = AuthStore();
  const navigate = useNavigate();
  const location = useLocation(); // URL 정보 전달위해 사용

  useEffect(() => {
    if (!isLogin) {
      console.log("로그인이 필요한 서비스");
      navigate("/");
    } else {
      const path = location.pathname.split("/")[2];
      setActiveTab(path);
    }
  }, [location.pathname, isLogin, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "myInfo":
        return <MyInfo memberNo={userInfo.memberNo} />;
      case "myBoard":
        return <Board memberNo={userInfo.memberNo} />;
      case "myParty":
        return <MyParty />;
      case "point":
        return <Point />;
      case "myFollow":
        return <Follow memberNo={userInfo.memberNo} />;
      case "blockUser":
        return <BlockUser memberNo={userInfo.memberNo} />;
      default:
        return <div>클릭해주세요.</div>;
    }
  };

  return (
    <div className="flex">
      <MypageSidebar />
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  )
}