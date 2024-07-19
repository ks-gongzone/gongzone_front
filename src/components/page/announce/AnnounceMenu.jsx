import { useEffect, useState } from "react";
import BasicTapMenu from "../../menu/BasicTapMenu";
import AnnounceItems from "./AnnounceItems";
import { AnnounceAPI } from "../../../utils/repository";

export default function AnnounceMenu({ memberNo }) {
  const tabItems = [
    { id: "all", label: "전체" },
    { id: "공지", label: "공지" },
    { id: "FAQ", label: "FAQ" },
    { id: "프로모션", label: "프로모션" },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [announcements, setAnnuncements] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  useEffect(() => {
    const fetchAnnounce = async () => {
      const type = activeTab === "all" ? "" : activeTab;
      try {
        const data = await AnnounceAPI.getAnnouncements(page, size, type);
        setAnnuncements(data.announcements);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error("공지사항 데이터 로드 중 오류", error);
      }
    };
    fetchAnnounce();
  }, [activeTab, page, size]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setPage(1); // 탭 변경시 첫 페이지로 초기 설정
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full sticky top-0">
        <BasicTapMenu
          tabItems={tabItems}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </div>
      <div className="p-4">
        <AnnounceItems
          items={announcements}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          memberNo={memberNo}
        />
      </div>
    </div>
  );
}
