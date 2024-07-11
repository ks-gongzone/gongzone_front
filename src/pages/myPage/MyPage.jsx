import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MypageSidebar from "../../components/page/myInfo/MyPageSidebar";
import AuthStore from "../../utils/zustand/AuthStore";
import { MyInfo, MyParty, BlockUser, Board, Follow } from "./Index"
import { Point } from "../point/Index";
import GZAPI from "../../utils/api";
import BoardCardSection from "../boardList/BoardCardSection";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-12
 * @last: 2024-07-10
 * @변경내용: 내 작성 글 조회 컴포넌트 추가 (memberNo로 필터링)
 */
export default function MyPage() {
  const [activeTab, setActiveTab] = useState("");
  const { userInfo, isLogin } = AuthStore();
  const navigate = useNavigate();
  const location = useLocation(); // URL 정보 전달위해 사용
  const [searchResults, setSearchResults] = useState([]); // my게시글 조회를 위해 추가

  useEffect(() => {
    if (!isLogin) {
      console.log("로그인이 필요한 서비스");
      navigate("/");
    } else {
      const path = location.pathname.split("/")[2];
      if (!path) {
        navigate("/myPage/myInfo");
        setActiveTab("myInfo");
      }
      setActiveTab(path);
    }
    const fetchDefaultData = async () => {
      try {
        const response = await GZAPI.post("/api/boards/list", {
          location: "*",
          category: "*",
          content: "",
          memberNo: userInfo.memberNo, // 현재 로그인 중인 유저의 회원 번호 사용
        });
        const usePosts = response.data.filter(post => post.memberNo === userInfo.memberNo);
        setSearchResults(usePosts);
        console.log(response.data);
        console.log(response.data.memberNo);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };
    if (activeTab === "myBoard") {
      fetchDefaultData();
    }
}, [location.pathname, isLogin, navigate, userInfo.memberNo, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "myInfo":
        return <MyInfo memberNo={userInfo.memberNo} />;
      case "myBoard":
        return <BoardCardSection data={searchResults} />;
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