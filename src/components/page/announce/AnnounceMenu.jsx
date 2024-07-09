import { useEffect, useState } from "react";
import BasicTapMenu from "../../menu/BasicTapMenu";
import AnnounceItems from "./AnnounceItems";
import { AnnounceAPI } from "../../../utils/repository"

export default function AnnounceMenu({ memberNo }) {
  const tabItems = [
    { id: "all", label: "전체" },
    { id: "공지", label: "공지" },
    { id: "FAQ", label: "FAQ" },
    { id: "프로모션", label: "프로모션" },
  ];

  const [activeTab, setActiveTab] = useState("all");
  // 통신 위해서 공지사항 객체 상태로 관리 (한동환 추가)
  const [announcements, setAnnuncements] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  /**
   * @작성일: 2024-07-03
   * @내용: 페이지와 보여질 데이터 및 타입 통신
   */
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
    <div>
      <div className="w-full mx-auto sticky top-0">
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