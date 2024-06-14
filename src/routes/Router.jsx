import { Outlet, createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import MemberInputData from "../pages/myPage/myInfo/InputData";

export default createBrowserRouter([
  {
    element: (
      <LayoutDefault>
        <Outlet />
      </LayoutDefault>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/userInfo", element: <MemberInputData /> },
    ],
  },
]);
