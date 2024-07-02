import logo from "../../assets/logo/GZlogo.PNG";
import { useState } from "react";

export default function Admin() {
  const [content, setContent] = useState();
  const [selectedButton, setSelectedButton] = useState("dashboard");

  const handleButtonClick = (contentComponent, buttonName) => {
    setContent(contentComponent);
    setSelectedButton(buttonName);
  };

  const renderButton = (buttonName, label) => (
    <button
      type="button"
      className={`flex items-center p-2 rounded ${
        selectedButton === buttonName
          ? "text-gray-100 bg-gray-700"
          : "text-gray-100 hover:bg-gray-700"
      }`}
      onClick={() => handleButtonClick(<div>{label}</div>, buttonName)}
    >
      <div>{label}</div>
    </button>
  );

  return (
    <div className="flex justify-between">
      <div className="w-[15%] h-screen bg-gray-500 p-6 shadow-md font-bold ">
        <div className="mt-2 flex flex-col space-y-4">
          <img
            alt="logo"
            src={logo}
            className="w-full h-auto max-w-[150px] max-h-[50px] mb-10"
          />
          {renderButton("dashboard", "DASHBOARD")}
          {renderButton("member", "회원관리")}
          {renderButton("board", "게시판관리")}
          {renderButton("party", "파티관리")}
          {renderButton("report", "신고관리")}
          {renderButton("notice", "공지사항")}
          {renderButton("etc", "기타")}
        </div>
      </div>
      <div className="flex h-screen w-[75%] rounded-xl p-6">{content}</div>
    </div>
  );
}
