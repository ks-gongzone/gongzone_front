import { Link } from "react-router-dom";

/**
 * @수정일: 2024-07-03
 * @수정내용: 로딩상태 추가 및 10개의 데이터씩 보여주는 로직 추가
 */
export default function AnnounceItems({ items, totalPages, currentPage, onPageChange }) {
  
  if (!Array.isArray(items) || items.length === 0) {
    return <div>No announcements available</div>;
  }

  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="w-full max-w-6xl">
        <div className="bg-white shadow rounded-lg">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between p-4 border-b hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <div
                    className={`w-[5em] text-center px-2 py-1 rounded mr-2 ${
                      item.type === "공지"
                        ? "bg-blue-200"
                        : item.type === "FAQ"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    }`}
                  >
                    {item.type}
                  </div>
                  <Link to="/announce/detail">{item.title}</Link>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">{item.date}</span>
                  {item.views && <div className="w-[40px] text-right">{item.views}</div>}
                </div>
              </li>
            ))}
          </ul>
          { /*
          <div className="flex justify-between p-4">
            <div>전체 페이지: {totalPages}</div>
            <div>현재 페이지: {currentPage}</div>
          </div>
          */ }
          <div className="flex justify-center p-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
