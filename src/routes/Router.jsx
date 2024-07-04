import { createBrowserRouter, Outlet } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import {
  Point,
  PointCharge,
  PointHistory,
  PointWithdraw,
} from "../pages/point/Index";
import BoardList from "../pages/boardList/Index";
import BoardWrite from "../pages/boardWrite/Index";

import Register from "../pages/login/Register";
import MovingPoint from "../pages/myPage/MovingPoint";
import NaverLogin from "../pages/login/NaverLogic";
import GoogleLogin from "../pages/login/GoogleLogic";
import KakaoLogin from "../pages/login/KakaoLogic";

import MyPage from "../pages/myPage/MovingPoint";
import Announce from "../pages/announce/Index";
import AnnounceDetail from "../pages/anoounceDetail/Index";
import Admin from "../admin/pages/Index";
import AdminLogin from "../admin/pages/AdminLogin";
import PartyDetail from "../pages/partyDetail/Index";
import PartyList from "../pages/partyList/Index";

export default createBrowserRouter([
  {
    element: (
      <LayoutDefault>
        <Outlet />
      </LayoutDefault>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/myPage", element: <MyPage /> },

      { path: "/party/detail/:id", element: <PartyDetail /> },
      { path: "/party/:id", element: <PartyList /> },
      { path: "/board/list", element: <BoardList /> },
      { path: "/board/write/:memberNo", element: <BoardWrite /> },
      { path: "/register", element: <Register /> },
      { path: "/naver/callback", element: <NaverLogin /> },
      { path: "/google/callback", element: <GoogleLogin /> },
      { path: "/kakao/callback", element: <KakaoLogin /> },
      { path: "/announce", element: <Announce /> },
      { path: "/announce/detail", element: <AnnounceDetail /> },

      // point
      { path: "/point", element: <Point /> },
      { path: "/point/history", element: <PointHistory /> },
      { path: "/point/charge", element: <PointCharge /> },
      { path: "/point/withdraw", element: <PointWithdraw /> },
    ],
  },
  { path: "/_admin", element: <AdminLogin /> },
  { path: "/_admin/main", element: <Admin /> },
]);
