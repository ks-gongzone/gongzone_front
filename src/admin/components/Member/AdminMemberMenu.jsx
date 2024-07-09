import { useState } from "react";
import AdminMember from "../../pages/AdminMember";
import BasicTapMenu from "../../../components/menu/BasicTapMenu";
import AdminPunishModal from "./AdminPunishModal";
import MemberPunish from "../../pages/member/MemberPunish";
import MemberSleep from "../../pages/member/MemberSleep";
import MemberQuit from "../../pages/member/MemberQuit";
import MemberList from "../../pages/member/MemberList";

export default function AdminMemberMenu() {
  const tabItems = [
    { id: "list", label: "전체 회원 관리" },
    { id: "sleep", label: "휴면 회원 관리" },
    { id: "punish", label: "회원 제재 관리" },
    { id: "quit", label: "탈퇴 회원 관리" },
  ];

  const [activeTab, setActiveTab] = useState("list");
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const openModal = (member) => {
    const isPunishUpdate = activeTab === "punish";
    setSelectedReport({ ...member, isPunishUpdate });
    console.log("member " ,member);
    console.log("isPunishUpdate ", isPunishUpdate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center w-full ">
        <BasicTapMenu
          tabItems={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          className="max-w-8xl w-full"
        />
      </div>
      <div className="p-4">
        {activeTab === "list" && <MemberList openModal={openModal} />}
        {activeTab === "sleep" && <MemberSleep openModal={openModal} />}
        {activeTab === "punish" && <MemberPunish openModal={openModal} />}
        {activeTab === "quit" && <MemberQuit openModal={openModal} />}
      </div>
      {showModal && selectedReport && (
        <AdminPunishModal
          selectedReport={selectedReport}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
