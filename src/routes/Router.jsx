import { Outlet, createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import MyPageMain from "../pages/myPage/MyPageMain";

export default createBrowserRouter([
  {
    element: (
      <LayoutDefault>
        <Outlet />
      </LayoutDefault>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/userInfo", element: <MyPageMain /> },
    ],
  },
  //[{ path: "/login", element: <Login /> }],
]);
