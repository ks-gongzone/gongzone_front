import { Outlet } from "react-router-dom";
import useAuthStore from "../../utils/zustand/AuthStore";
import { PointDataProvider } from "./context/PointContext";

export default function Point() {
  const { memberNo, pointNo } = useAuthStore((state) => ({
    memberNo: state.userInfo.memberNo,
    pointNo: state.userInfo.pointNo,
  }));
  

  return (
      <PointDataProvider memberNo={ memberNo } pointNo={ pointNo }>
        <Outlet />
      </PointDataProvider>
  );
}
