import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthStore from "../../utils/zustand/AuthStore";
import { MyInfo, MyInfoDetail, MyParty } from "./Index";
import { Point } from "../point/Index";
import MyPageBoard from "./MyPageBoard";
import BasicTapMenu from "../../components/menu/BasicTapMenu";

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
  const [infoPage, setInfoPage] = useState(1); // 페이지 상태 추가

  useEffect(() => {
    if (!isLogin) {
      console.log("로그인이 필요한 서비스");
      navigate("/home");
    } else {
      const path = location.pathname.split("/")[2];
      if (!path) {
        navigate("/myPage/myInfo");
        setActiveTab("myInfo");
      }
      setActiveTab(path);
    }
  }, [location.pathname, isLogin, navigate]);

  const handleNextPage = () => setInfoPage(2);
  const handlePreviousPage = () => setInfoPage(1);

  const renderContent = () => {
    switch (activeTab) {
      case "myInfo":
        return infoPage === 1 ? (
          <MyInfo memberNo={ userInfo.memberNo } onNextPage={ handleNextPage } />
        ) : (
          <MyInfoDetail
            memberNo={ userInfo.memberNo }
            onPreviousPage={ handlePreviousPage }
          />
        );
      case "myPageBoard":
        return <MyPageBoard />;
      case "myParty":
        return <MyParty />;
      case "point":
        return <Point />;
      default:
        return <div>클릭해주세요.</div>;
    }
  };

  const tabItems = [
    { id: "myInfo", label: "내정보" },
    { id: "myPageBoard", label: "찜목록" },
    { id: "myParty", label: "내파티" },
    { id: "point", label: "포인트" },
  ];

  return (
    <div className="w-full mx-auto mb-10">
      <BasicTapMenu
        tabItems={ tabItems }
        activeTab={ activeTab }
        onTabClick={ (id) => {
          navigate(`/myPage/${ id }`);
          setActiveTab(id);
        } }
        className="sticky top-20 z-20"
      />
      <div>{ renderContent() }</div>
    </div>
  );
}
