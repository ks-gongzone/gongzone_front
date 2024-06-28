import { useState } from "react";
import BasicTapMenu from "../../menu/BasicTapMenu";
import AnnounceItems from "./AnnounceItems";

export default function AnnounceMenu() {
  const tabItems = [
    { id: "all", label: "전체", content: "전체" },
    { id: "announce", label: "공지", content: <AnnounceItems /> },
    { id: "FAQ", label: "FAQ", content: "FAQ" },
    { id: "promotion", label: "프로모션", content: "프로모션" },
  ];

  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const activeContent = tabItems.find((tab) => tab.id === activeTab)?.content;

  return (
    <div>
      <div className="w-full mx-auto sticky top-0">
        <BasicTapMenu
          tabItems={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </div>
      <div className="p-4">{activeContent}</div>
    </div>
  );
}
