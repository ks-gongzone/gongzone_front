import { createBrowserRouter, Outlet } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import Party from "../pages/party/Index";
import { Point, PointCharge, PointHistory } from "../pages/point/Index";
import BoardList from "../pages/boardList/Index";
import Register from "../pages/login/Register";
import MovingPoint from "../pages/myPage/MovingPoint";
import NaverLogin from "../pages/login/Naver";


export default createBrowserRouter([
  {
    element: (
      <LayoutDefault>
        <Outlet />
      </LayoutDefault>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/myPage", element: <MovingPoint /> },

      { path: "/party/accept", element: <Party /> },
      { path: "/board/list", element: <BoardList />},
      { path: "/register", element: <Register /> },
      { path: "/callback", element: <NaverLogin /> },

      // point
      { path: "/point", element: <Point /> },
      { path: "/point/history", element: <PointHistory /> },
      { path: "/point/charge", element: <PointCharge /> },
    ],
  },
  //{ path: "/signup", element: <Signup /> },
]);
