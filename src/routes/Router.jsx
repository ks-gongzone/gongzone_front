import { createBrowserRouter, Outlet } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import Party from "../pages/party/Index";
import { Point, PointCharge, PointHistory } from "../pages/point/Index";
import BoardList from "../pages/boardList/Index";

export default createBrowserRouter([
  {
    element: (
      <LayoutDefault>
        <Outlet />
      </LayoutDefault>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/party/accept", element: <Party /> },
      { path: "/board/list", element: <BoardList />},

      // point
      { path: "/point", element: <Point /> },
      { path: "/point/history", element: <PointHistory /> },
      { path: "/point/charge", element: <PointCharge /> },
    ],
  },
  //[{ path: "/login", element: <Login /> }],
]);
