import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MypageSidebar from "../../components/page/myInfo/MyPageSidebar";
import AuthStore from "../../utils/zustand/AuthStore";
import { MyInfoDetail, MyInfo, MyParty } from "./Index"
import { Point } from "../point/Index";
import GZAPI from "../../utils/api";
import BoardCardSection from "../boardList/BoardCardSection";

/**
 * 개별 토글 스위치 컴포넌트
 * @date: 2024-06-12
 * @last: 2024-07-15
 * @변경내용: 내정보 수정 내용 사진 및 팔로우 차단 목록 이동 액티브탭 생성
 */
export default function MyPage() {
  const [activeTab, setActiveTab] = useState("");
  const { userInfo, isLogin } = AuthStore();
  const navigate = useNavigate();
  const location = useLocation(); // URL 정보 전달위해 사용
  const [searchResults, setSearchResults] = useState([]); // my게시글 조회를 위해 추가
  const [infoPage, setInfoPage] = useState(1); // 페이지 상태 추가

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

  const handleNextPage = () => setInfoPage(2);
  const handlePreviousPage = () => setInfoPage(1);

  const renderContent = () => {
    switch (activeTab) {
      case "myInfo":
        return infoPage === 1 ? (
          <MyInfo memberNo={userInfo.memberNo} onNextPage={handleNextPage} />
        ) : (
          <MyInfoDetail
            memberNo={userInfo.memberNo}
            onPreviousPage={handlePreviousPage}
          />
        );
      case "myBoard":
        return <BoardCardSection data={searchResults} />;
      case "myParty":
        return <MyParty />;
      case "point":
        return <Point />;
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