import { useState } from "react";
import AdminMember from "../../pages/AdminMember";
import BasicTapMenu from "../../../components/menu/BasicTapMenu";
import AdminPunishModal from "./AdminPunishModal";

export default function AdminMemberMenu() {
  const tabItems = [
    { id: "dormant", label: "휴면 회원 관리" },
    { id: "punish", label: "회원 제재 관리" },
    { id: "report", label: "신고 회원 관리" },
  ];

  const [activeTab, setActiveTab] = useState("dormant");
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const openModal = (report) => {
    setSelectedReport(report);
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
        {activeTab === "dormant" && <div>휴면 회원 관리 내용</div>}
        {activeTab === "punish" && <AdminMember openModal={openModal} />}
        {activeTab === "report" && <div>신고 회원 관리 내용</div>}
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
