import logo from "../../assets/logo/GZlogo.PNG";
import { useState } from "react";
import AdminMember from "./AdminMember";
import AuthStore from "../../utils/zustand/AuthStore";
import { useNavigate } from "react-router-dom";
import AdminMemberMenu from "../components/Member/AdminMemberMenu";
import AdminAnnounce from "../components/announce/AdminAnnounce";
import ReportList from "./report/ReportList";

export default function Admin() {
  const [content, setContent] = useState({
    component: <div>DASHBOARD</div>,
    label: "DASHBOARD",
  });
  const [selectedButton, setSelectedButton] = useState("dashboard");

  const handleButtonClick = (contentComponent, label, buttonName) => {
    setContent({ component: contentComponent, label: label });
    setSelectedButton(buttonName);
  };

  const renderButton = (buttonName, label, component) => (
    <button
      type="button"
      className={`flex items-center p-2 rounded ${
        selectedButton === buttonName
          ? "text-gray-100 bg-gray-400"
          : "text-gray-100 hover:bg-gray-500"
      }`}
      onClick={() => handleButtonClick(component, label, buttonName)}
    >
      <div>{label}</div>
    </button>
  );

  const { statusLogout } = AuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    statusLogout();
    navigate("/");
  };

  return (
    <div className="flex">
      <div className="w-[15%] h-screen bg-gray-700 p-6 shadow-md font-bold text-white">
        <div className="mt-2 flex flex-col space-y-4">
          <img
            alt="logo"
            src={logo}
            className="w-full h-auto max-w-[150px] max-h-[50px] mb-10"
          />
          {renderButton("dashboard", "DASHBOARD", <div>DASHBOARD</div>)}
          {renderButton("member", "회원관리", <AdminMemberMenu />)}
          {renderButton("board", "게시판관리", <div>게시판관리</div>)}
          {renderButton("party", "파티관리", <div>파티관리</div>)}
          {renderButton("report", "신고관리", <ReportList />)}
          {renderButton("notice", "공지사항", <AdminAnnounce />)}
          {renderButton("etc", "기타", <div>기타</div>)}
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="h-[5%] w-full bg-white shadow-xl flex items-center justify-between p-4">
          <div className="text-lg font-bold">{content.label}</div>
          <div className="flex items-center gap-4">
            <div className="text-sm">관리자 로그인 중</div>
            <button
              className="text-[13px] rounded-xl bg-gray-400 text-white py-1 px-4"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className="h-screen p-6 bg-gray-100">{content.component}</div>
      </div>
    </div>
  );
}
