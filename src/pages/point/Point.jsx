import { Outlet } from "react-router-dom";
import useAuthStore from "../../utils/zustand/AuthStore";
import { PointDataProvider } from "./context/PointContext";

export default function Point() {
  const { memberNo } = useAuthStore((state) => ({
    memberNo: state.userInfo.memberNo,
  }));


  return (
    <PointDataProvider memberNo={ memberNo }>
      <Outlet />
    </PointDataProvider>
  );
}
