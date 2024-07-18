import { Link, useNavigate } from "react-router-dom";
import AuthStore from "../../../utils/zustand/AuthStore";
import { AnnounceAPI } from "../../../utils/repository";

/**
 * @수정일: 2024-07-08
 * @내용: 로딩상태 추가 및 10개의 데이터씩 보여주는 로직
 * @수정내용: sessionStorage사용하지 않고 Link에 announceNo를 담아 보내주도록 변경
 */
export default function AnnounceItems({ items, totalPages, currentPage, onPageChange }) {
  // 관리자 계정 확인 작업
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const isAdmin = userInfo.memberNo === 'M000001';
  const navigate = useNavigate();

  if (!Array.isArray(items) || items.length === 0) {
    return <div>공지사항이 존재하지 않습니다.</div>;
  }

  const handleItemClick = (announceNo) => {
    AnnounceAPI.incrementAnnounceViews(announceNo, navigate)
      .catch((error) => {
        console.log("조회수 증가 실패", error);
      });
  }  

  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="w-full max-w-6xl">
        <div className="bg-white shadow rounded-lg">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between p-4 border-b hover:bg-gray-100">
                <div className="flex items-center">
                  <div
                    className={`w-[5em] text-center px-2 py-1 rounded mr-2 ${
                      item.type === '공지'
                        ? 'bg-blue-200'
                        : item.type === 'FAQ'
                        ? 'bg-yellow-200'
                        : 'bg-green-200'
                    }`}
                  >

                    {item.type}
                  </div>
                  <Link
                    to={`/announce/detail/${item.announceNo}`}
                    onClick={() => handleItemClick(item.announceNo)}
                    state={{ memeberNo: userInfo.memberNo }}
                    >
                      {item.title}
                    </Link>
                </div>
                <div className="flex items-center">
                  <span className="mr-4">{item.date.substring(0, 10)}</span>
                  {item.views && <div className="w-[40px] text-right">{item.views}</div>}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center p-4">
            <div className="flex justify-center flex-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => onPageChange(index + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {isAdmin && (
              <div className="flex justify-end flex-1">
                <Link 
                  to="/_admin/announce/write"
                  className="bg-blue-500 text-white px-4 py-2 rounded mx-1"
                >
                  글쓰기
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}