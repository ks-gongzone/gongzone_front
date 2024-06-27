import { createBrowserRouter, Outlet } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import Party from "../pages/party/Index";
import { Point, PointCharge, PointHistory } from "../pages/point/Index";
import BoardList from "../pages/boardList/Index";
import BoardWrite from "../pages/boardWrite/Index";

import Register from "../pages/login/Register";
import MovingPoint from "../pages/myPage/MovingPoint";

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

      { path: "/party/accept/:id", element: <Party /> },
      { path: "/api/boards/list", element: <BoardList />},
      { path: "/api/boards/write/:memberNo", element: <BoardWrite /> },
      { path: "/register", element: <Register /> },

      // point
      { path: "/point", element: <Point /> },
      { path: "/point/history", element: <PointHistory /> },
      { path: "/point/charge", element: <PointCharge /> },
    ],
  },
  //{ path: "/signup", element: <Signup /> },
]);
