import logo from "../../assets/logo/GONGZONE_logo_white.png";
import { useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import AdminMemberMenu from "../components/Member/AdminMemberMenu";
import AdminAnnounce from "../components/announce/AdminAnnounce";
import ReportList from "./report/ReportList";
import QuestionList from "./question/QuestionList";
import AdminPartyMenu from "../components/party/AdminPartyMenu";
import Dashboard from "./dashboard/Dashboard";

export default function Admin() {
  const [content, setContent] = useState({
    component: <Dashboard />,
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
          ? "text-gray-100 bg-[#6ea2d4]"
          : "text-gray-100 hover:bg-[#6ea2d4]"
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
    navigate("/home");
  };

  return (
    <div className="flex">
      <div className="w-[15%] min-h-screen bg-[#1e5187] p-6 shadow-md font-bold text-white">
        <div className="mt-2 flex flex-col space-y-4 sticky top-0">
          <Link to="/home">
            <img
              alt="logo"
              src={logo}
              className="w-full h-auto max-w-[300px] max-h-[100px] mb-10"
            />
          </Link>
          {renderButton("dashboard", "DASHBOARD", <Dashboard />)}
          {renderButton("member", "회원관리", <AdminMemberMenu />)}
          {renderButton("party", "파티관리", <AdminPartyMenu />)}
          {renderButton("report", "신고관리", <ReportList />)}
          {renderButton("notice", "공지사항", <AdminAnnounce />)}
          {renderButton("etc", "문의내역", <QuestionList />)}
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

        <div className=" p-6 bg-gray-100">{content.component}</div>
      </div>
    </div>
  );
}
