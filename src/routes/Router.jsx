import { Outlet, createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
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
      { path: "/userInfo", element: <MovingPoint /> },
    ],
  },
  //[{ path: "/login", element: <Login /> }],
]);
