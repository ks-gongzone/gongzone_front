import { useState, useEffect } from "react";
import BoardListCard from "../../components/page/board/BoardListCard";
import AuthStore from "../../utils/zustand/AuthStore";
import GZAPI from "../../utils/api";

const cate = [
  { key: "CF0101", value: "식품-신선식품-채소" },
  { key: "CF0102", value: "식품-신선식품-과일" },
  { key: "CF0103", value: "식품-신선식품-수산/건어물" },
  { key: "CF0104", value: "식품-신선식품-정육/계란류" },
  { key: "CF0105", value: "식품-신선식품-우유/유제품" },
  { key: "CF0201", value: "식품-곡물류-쌀/잡곡" },
  { key: "CF0202", value: "식품-곡물류-견과류" },
  { key: "CF0301", value: "식품-반찬류-김치/반찬" },
  { key: "CF0302", value: "식품-반찬류-밀키트" },
  { key: "CF0401", value: "식품-가공식품-면류/통조림" },
  { key: "CF0402", value: "식품-가공식품-양념/오일" },
  { key: "CF0403", value: "식품-가공식품-간식/과자" },
  { key: "CF0404", value: "식품-가공식품-베이커리/잼" },
  { key: "CF0501", value: "식품-음료-생수/음료" },
  { key: "CF0502", value: "식품-음료-커피/차" },
  { key: "CF9901", value: "식품-기타-건강식품" },
];

const baseURL = "http://localhost:8088";

function getCategoryValue(category) {
  const value = cate.find((item) => item.key === category);
  return value ? value.value : "";
}

export default function BoardCardSection({ data }) {
  const memberNo = AuthStore((state) => state.userInfo.memberNo);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // 페이지당 항목 수 설정

  useEffect(() => {}, [currentPage]);

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-[65em] mx-auto mb-10 mt-14">
      <div className="w-full mb-6 text-lg font-bold text-[#526688]">
        모집중인 파티
      </div>
      <div className="grid grid-cols-3 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((e) => (
            <div key={e.boardNo}>
              <BoardListCard
                img={`${baseURL}${e.files[0].filePath}`}
                cate={getCategoryValue(e.category)}
                title={e.boardTitle}
                id={e.partyNo}
                memberNo={memberNo}
                boardNo={e.boardNo}
                partyNo={e.partyNo}
                note={e.partyCateCode}
                like={e.like}
                amount={e.remain}
              >
                <div className="text-sm px-3 pb-3">
                  <div className="flex justify-between mb-3 text-[#888888]"></div>
                </div>
              </BoardListCard>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">Loading...</div>
        )}
      </div>
      {/* 페이지네이션 컴포넌트 추가 */}
      <div className="flex justify-center mt-4">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

// 페이지네이션 컴포넌트
const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md border border-gray-300 focus:outline-none ${
                currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
