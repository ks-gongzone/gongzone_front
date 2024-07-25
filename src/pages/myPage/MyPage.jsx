import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

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
      setLoading(false); // 로딩 완료
    }
  }, [location.pathname, isLogin, navigate]);

  useEffect(() => {
    if (activeTab === "myInfo") {
      setInfoPage(1); // MyInfo 탭이 활성화될 때 infoPage를 기본 페이지로 설정
    }
  }, [activeTab]);

  const handleNextPage = () => setInfoPage(2);
  const handlePreviousPage = () => setInfoPage(1);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="w-full max-w-6xl mx-auto mb-10 mt-14">
          <div className="w-full mb-6 text-lg font-bold text-[#526688]">
            로딩 중...
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <Skeleton width="100%" height={300} />
            <Skeleton width="80%" height={24} className="mt-4" />
            <Skeleton width="60%" height={20} className="mt-2" />
            <Skeleton width="40%" height={20} className="mt-2" />
            <Skeleton width="100%" height={150} className="mt-4" />
            <Skeleton width="100%" height={50} className="mt-4" />
          </div>
        </div>
      );
    }

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
    <div className="w-[65em] mx-auto mb-10">
      <BasicTapMenu
        tabItems={tabItems}
        activeTab={activeTab}
        onTabClick={(id) => {
          setLoading(true); // 탭 변경 시 로딩 상태로 설정
          navigate(`/myPage/${id}`);
          setActiveTab(id);
          setLoading(false); // 로딩 완료
        }}
        className="sticky top-20 z-20"
      />
      <div>{renderContent()}</div>
    </div>
  );
}
