import { Outlet, createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";

export default createBrowserRouter([
  {
    element: (
      <LayoutDefault>
        <Outlet />
      </LayoutDefault>
    ),
    children: [{ path: "/", element: <Home /> }],
  },
  //[{ path: "/login", element: <Login /> }],
]);
