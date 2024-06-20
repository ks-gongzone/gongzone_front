import { createBrowserRouter, Outlet } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import Party from "../pages/party/Index";
import { Point, PointHistory } from "../pages/point/Index";
import Point from "../pages/point/Point";
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
    ],
  },
  //[{ path: "/login", element: <Login /> }],
]);
