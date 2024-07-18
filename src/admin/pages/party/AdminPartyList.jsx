import { useState, useEffect } from "react";
import { Party } from "../../../utils/repository";

export default function AdminPartyList({ openModal, statusCode }) {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetch = async () => {
    const detailData = await Party.PartyAccept("_admin");
    const responseData = Array.isArray(detailData.data)
      ? detailData.data
      : [detailData.data];
    if (statusCode) {
      setData(responseData.filter((item) => item.status === statusCode));
    } else {
      setData(responseData);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "S060101":
        return "모집중";
      case "S060102":
        return "모집완료";
      case "S060103":
        return "파티원 결제대기";
      case "S060104":
        return "파티장 결제대기";
      case "S060105":
        return "쇼핑몰 배송중";
      case "S060106":
        return "수취 대기중";
      case "S060107":
        return "정산 대기중";
      case "S060108":
        return "정산 완료";
      default:
        return "알 수 없음";
    }
  };

  useEffect(() => {
    fetch();
  }, [statusCode]);

  const toggleRow = (id) => {
    setExpandedRows(
      expandedRows.includes(id)
        ? expandedRows.filter((rowId) => rowId !== id)
        : [...expandedRows, id]
    );
  };

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center box-border">
      <div className="w-full max-w-7xl">
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <div className="grid grid-cols-6 gap-4 bg-gray-50 p-4 font-bold">
            <div className="font-medium text-gray-500">파티 고유번호</div>
            <div className="font-medium text-gray-500">파티 이름</div>
            <div className="font-medium text-gray-500">파티 내용</div>
            <div className="font-medium text-gray-500">파티 상태</div>
            <div className="font-medium text-gray-500">세부 사항</div>
          </div>
          {currentItems.map((e) => (
            <div key={e.partyNo}>
              <div className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-gray-100 flex items-center">
                <div className="w-[15em] px-2 py-1 rounded text-sm">
                  {e.partyNo}
                </div>
                <div className="text-sm text-gray-500">{e.boardTitle}</div>
                <div className="text-sm text-gray-500">{e.boardBody}</div>
                <div className="text-sm text-gray-500">
                  {getStatusText(e.status)}
                </div>

                <div
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => toggleRow(e.partyNo)}
                >
                  클릭하여 상세 내용 보기
                </div>

                <div className="text-sm text-gray-500">
                  <button
                    type="button"
                    className="ml-4 p-2 bg-red-500 text-white rounded"
                    onClick={(event) => {
                      event.stopPropagation();
                      openModal(e);
                    }}
                  >
                    정산하기
                  </button>
                </div>
              </div>
              {expandedRows.includes(e.partyNo) && (
                <div className="col-span-6 bg-gray-100 px-4 py-8">
                  <p>파티 이름: {e.boardTitle}</p>
                  <p>카테고리: {e.partyCateCode}</p>
                  <p>제품 URL: {e.productUrl}</p>
                  <p>파티 금액: {e.partyPrice}</p>
                  <p>남은 금액: {e.remainPrice}</p>
                  <p>파티 종료일: {e.endDate}</p>
                  <p>주소: {e.address}</p>
                  <p>파티 상태: {getStatusText(e.status)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
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
                currentPage === number
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200 text-gray-700"
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
