import { useState } from "react";
import BasicTapMenu from "../../menu/BasicTapMenu";
import AnnounceItems from "./AnnounceItems";

export default function AnnounceMenu() {
  const tabItems = [
    { id: "all", label: "전체" },
    { id: "공지", label: "공지" },
    { id: "FAQ", label: "FAQ" },
    { id: "프로모션", label: "프로모션" },
  ];

  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const filterAnnouncements = (tab) => {
    if (tab === "all") {
      return announcements;
    }
    return announcements.filter((announcement) => announcement.type === tab);
  };

  const activeContent = (
    <AnnounceItems items={filterAnnouncements(activeTab)} />
  );

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

const announcements = [
  {
    type: "공지",
    title: "알려진 이슈를 안내해 드립니다. (6/27 수정)",
    date: "2024.06.26",
    views: "9999+",
  },
  {
    type: "공지",
    title: "악성코드 감염 예방을 위한 보안 수칙 안내",
    date: "2020.02.26",
    views: "",
  },
  {
    type: "공지",
    title: "계정 보호를 위한 안내",
    date: "2018.11.05",
    views: "",
  },
  {
    type: "공지",
    title: "알려진 이슈를 안내해 드립니다.",
    date: "2024.06.26",
    views: "9999+",
  },
  {
    type: "FAQ",
    title: "자주 묻는 질문",
    date: "2024.06.25",
    views: "9999+",
  },
  {
    type: "FAQ",
    title: "자주 묻는 질문",
    date: "2024.06.19",
    views: "9999+",
  },
  {
    type: "프로모션",
    title: "신규가입 프로모션 안내",
    date: "2024.06.19",
    views: "9999+",
  },
];
