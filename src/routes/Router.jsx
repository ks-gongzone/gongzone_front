import { Outlet, createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layouts/Default";
import Home from "../pages/home/Index";
import Party from "../pages/party/Index";
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
      { path: "/board/list", element: <BoardList />}
    ],
  },
  //[{ path: "/login", element: <Login /> }],
]);
