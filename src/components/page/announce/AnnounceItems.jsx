import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AuthStore from "../../../utils/zustand/AuthStore";
import { AnnounceAPI } from "../../../utils/repository";

/**
 * @수정일: 2024-07-08
 * @내용: 로딩상태 추가 및 10개의 데이터씩 보여주는 로직
 * @수정내용: sessionStorage사용하지 않고 Link에 announceNo를 담아 보내주도록 변경
 */
export default function AnnounceItems({
  items,
  totalPages,
  currentPage,
  onPageChange,
}) {
  // 관리자 계정 확인 작업
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (userInfo && userInfo.memberNo) {
      setIsAdmin(userInfo.memberNo === "M000001");
      setLoading(false);
    }
  }, [userInfo]);

  if (loading) {
    return (
      <div className="flex flex-col items-center box-border p-4">
        <div className="w-full max-w-6xl">
          <div className="bg-white shadow rounded-lg">
            <ul>
              {Array.from({ length: 10 }).map((_, index) => (
                <li key={index} className="flex justify-between p-4 border-b">
                  <div className="flex items-center">
                    <div className="w-[5em] text-center px-2 py-1 rounded mr-2">
                      <Skeleton width={50} height={20} />
                    </div>
                    <Skeleton width={200} height={20} />
                  </div>
                  <div className="flex items-center">
                    <Skeleton width={100} height={20} className="mr-4" />
                    <Skeleton width={40} height={20} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center box-border p-4">
          <div className="w-full max-w-6xl">
            <div className="bg-white shadow rounded-lg">
              <ul>
                {Array.from({ length: 10 }).map((_, index) => (
                  <li key={index} className="flex justify-between p-4 border-b">
                    <div className="xl:w-[54em] w-[30em] md:w-[40em] lg:w-[54em] flex items-center">
                      <Skeleton width={100} height={20} />
                      <div className="text-left px-2 py-1 rounded mr-2">
                        <Skeleton width={200} height={20} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Skeleton width={100} height={20} className="mr-4" />
                      <Skeleton width={40} height={20} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center justify-center">
            <Link
              to="/_admin/announce/write"
              className="bg-[#1d5091] text-white px-4 py-2 rounded mx-1"
            >
              글쓰기
            </Link>
          </div>
        )}
      </div>
    );
  }

  const handleItemClick = (announceNo) => {
    AnnounceAPI.incrementAnnounceViews(announceNo, navigate).catch((error) => {});
  };

  return (
    <div className="flex flex-col items-center box-border p-4">
      <div className="xl:w-[65em] w-[30em] md:w-[50em] lg:w-[58em]">
        <div className="bg-white shadow rounded-lg">
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between p-4 border-b hover:bg-gray-100"
              >
                <div className="flex items-center mb-2 sm:mb-0">
                  <div
                    className={`w-[5em] text-center px-2 py-1 rounded mr-2 ${
                      item.type === "공지"
                        ? "bg-[#6ea2d4]"
                        : item.type === "FAQ"
                        ? "bg-[#ffa750]"
                        : "bg-[#62c8b3]"
                    }`}
                  >
                    {item.type}
                  </div>
                  <Link
                    to={`/announce/detail/${item.announceNo}`}
                    onClick={() => handleItemClick(item.announceNo)}
                    state={{ memeberNo: userInfo.memberNo }}
                    className="break-words max-w-xs sm:max-w-none"
                  >
                    {item.title}
                  </Link>
                </div>
                <div className="flex items-center justify-between sm:justify-end sm:w-auto w-full">
                  <span className="mr-4">{item.date.substring(0, 10)}</span>
                  {item.views && (
                    <div className="w-[40px] text-right">{item.views}</div>
                  )}
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
                    index + 1 === currentPage
                      ? "bg-[#6ea2d4] text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="flex justify-end flex-1">
            <Link
              to="/_admin/announce/write"
              className="bg-[#1d5091] text-white px-4 py-2 rounded mx-1 mt-10"
            >
              글쓰기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
