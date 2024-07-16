import { useState } from "react";
import BasicTapMenu from "../../../components/menu/BasicTapMenu";
import AdminPartyModal from "./AdminPartyModal";
import AdminPartyList from "../../pages/party/AdminPartyList";

export default function AdminPartyMenu() {
  const tabItems = [
    { id: "list", label: "전체 파티 관리", statusCode: null },
    { id: "settlement", label: "정산 대기 관리", statusCode: "S060107" },
    { id: "complete", label: "완료 파티 관리", statusCode: "S060108" },
  ];

  const [activeTab, setActiveTab] = useState(tabItems[0].id);
  const [showModal, setShowModal] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const openModal = (partyNo) => {
    setSelectedParty(partyNo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedParty(null);
  };

  const activeStatusCode = tabItems.find(
    (tab) => tab.id === activeTab
  )?.statusCode;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center w-full ">
        <BasicTapMenu
          tabItems={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
          className="max-w-8xl"
        />
      </div>
      <div className="p-4">
        <AdminPartyList openModal={openModal} statusCode={activeStatusCode} />
      </div>
      {showModal && setSelectedParty && (
        <AdminPartyModal
          selectedParty={selectedParty}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
