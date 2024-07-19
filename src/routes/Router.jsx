import { createBrowserRouter, Outlet } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import {
  Point,
  PointCharge,
  PointDetail,
  PointHistory,
  PointMain,
  PointWithdraw,
} from "../pages/point/Index";
import BoardList from "../pages/boardList/Index";
import BoardWrite from "../pages/boardWrite/Index";

import Register from "../pages/login/Register";
import NaverLogin from "../pages/login/NaverLogic";
import GoogleLogin from "../pages/login/GoogleLogic";
import KakaoLogin from "../pages/login/KakaoLogic";

import MyPage from "../pages/myPage/MyPage";
import Announce from "../pages/announce/Index";
import AnnounceDetail from "../pages/anoounceDetail/Index";
import Admin from "../admin/pages/Index";
import AdminLogin from "../admin/pages/AdminLogin";
import PartyDetail from "../pages/partyDetail/Index";
import PartyList from "../pages/partyList/Index";
import { MyInfo, MyParty } from "../pages/myPage/Index";

import AdminWriteDetail from "../admin/pages/announceCreate/AdminWriteDetail";
import AdminUpdateDetail from "../admin/pages/announceUpdate/AdminUpdateDetail";
import MemberPage from "../pages/memberInteractionList";
import Intro from "../pages/introduction/Index";
import UpdateForm from "../pages/boardUpdate/UpdateForm";
import ErrorBoundary from "../components/error/ErrorBoundary";
import ErrorPage from "../components/error/ErrorPage";
import LoginAlertModal from "../components/error/LoginAlertModal";
import { useEffect, useState } from "react";
import MyPageBoardCard from "../pages/myPage/MyPageBoardCard";
import MyPageBoard from "../pages/myPage/MyPageBoard";

const RouterComponent = () => {
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    const handleShowAlertModal = () => {
      setShowAlertModal(true);
    };

    window.addEventListener("showLoginAlertModal", handleShowAlertModal);

    return () => {
      window.removeEventListener("showLoginAlertModal", handleShowAlertModal);
    };
  }, []);

  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
  };

  return (
    <ErrorBoundary>
      <LayoutDefault>
        <LoginAlertModal
          show={showAlertModal}
          handleClose={handleCloseAlertModal}
        />
        <Outlet />
      </LayoutDefault>
    </ErrorBoundary>
  );
};

export default createBrowserRouter([
  {
    element: <RouterComponent />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/home", element: <Home /> },
      {
        path: "/myPage",
        element: <MyPage />,
        children: [
          { path: "myInfo", element: <MyInfo /> },
          { path: "myParty", element: <MyParty /> },
          { path: "myPageBoard", element: <MyPageBoard /> },

          // point
          {
            path: "point",
            element: <Point />,
            children: [
              { path: "", element: <PointMain /> },
              { path: "history", element: <PointHistory /> },
              { path: "detail", element: <PointDetail /> },
              { path: "charge", element: <PointCharge /> },
              { path: "withdraw", element: <PointWithdraw /> },
            ],
          },
        ],
      },
      // memberList
      { path: "/member/list", element: <MemberPage /> },

      { path: "/party/detail/:id/:no", element: <PartyDetail /> },
      { path: "/party/detail/:id", element: <PartyList /> },
      { path: "/board/list", element: <BoardList /> },
      { path: "/board/write/:memberNo", element: <BoardWrite /> },
      { path: "/board/update/:boardNo", element: <UpdateForm /> },
      { path: "/register", element: <Register /> },
      { path: "/naver/callback", element: <NaverLogin /> },
      { path: "/google/callback", element: <GoogleLogin /> },
      { path: "/kakao/callback", element: <KakaoLogin /> },
      { path: "/announce", element: <Announce /> },
      { path: "/announce/detail/:announceNo", element: <AnnounceDetail /> },
    ],
  },
  { path: "/_admin", element: <AdminLogin /> },
  { path: "/_admin/main", element: <Admin /> },
  { path: "/_admin/announce/write", element: <AdminWriteDetail /> },
  { path: "/_admin/announce/update", element: <AdminUpdateDetail /> },
  { path: "/", element: <Intro /> },
]);
