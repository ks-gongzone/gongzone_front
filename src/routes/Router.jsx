import { createBrowserRouter, Outlet } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import { Point, PointCharge, PointDetail, PointHistory, PointMain, PointWithdraw, } from "../pages/point";
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
import { BlockUser, MyInfo, MyParty, Follow, Board } from "../pages/myPage/Index";

export default createBrowserRouter([
  {
    element: (
      <LayoutDefault>
        <Outlet />
      </LayoutDefault>
    ),
    children: [
      { path: "/", element: <Home /> },
      { 
        path: "/myPage",
        element: <MyPage />,
        children: [
          { path: "myInfo", element: <MyInfo />},
          { path: "myParty", element: <MyParty />},
          { path: "myBoard", element: <Board />},
          { path: "blockUser", element: <BlockUser />},
          { path: "myFollow", element: <Follow />},

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
            ]
          },
        ],
      },

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

    ],
  },
  { path: "/_admin", element: <AdminLogin /> },
  { path: "/_admin/main", element: <Admin /> },
]);
