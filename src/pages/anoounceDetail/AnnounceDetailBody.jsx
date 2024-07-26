import { useEffect, useState } from "react";
import { AnnounceAPI } from "../../utils/repository";
import { useNavigate, useParams } from "react-router-dom";
import AuthStore from "../../utils/zustand/AuthStore";
import DeleteButton from "../../admin/components/announce/AnnounceDeleteButton";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * @수정일: 2024-07-11
 * @수정내용: 삭제버튼 관리자 유무에 따라 표시
 */
export default function AnnounceDetailBody() {
  const { announceNo } = useParams();
  const navigate = useNavigate();
  const [announce, setAnnounce] = useState(null);
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const isAdmin = userInfo.memberNo === 'M000001';

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 위치 조정
    if (!announceNo) {
      console.error("announceNo가 없습니다.");
      return;
    }
    AnnounceAPI.getAnnouncementDetail(announceNo)
      .then((data) => {
        setAnnounce(data);
      })
      .catch((error) => {
        console.error("공지사항 세부 로드중 오류 발생[컴포넌트]", error);
        alert("공지사항을 불러올 수 없습니다.");
      });
  }, [announceNo]);

  const handleEditClick = () => {
    if (isAdmin) {
      navigate(`/_admin/announce/update`, { state: { announce, announceNo, memberNo: userInfo.memberNo } });
    } else {
      alert("해당 권한이 없습니다.");
    }
  };

  if (!announce) {
    return (
      <div className="p-4 mx-auto w-[480px] sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
        <Skeleton height={40} />
        <Skeleton count={3} height={20} className="mt-2" />
        <Skeleton height={300} className="mt-4" />
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto w-[480px] sm:w-[600px] md:w-[800px] lg:w-[1000px] xl:w-[1200px]">
      <div className="w-full flex pb-4 border-black border-t-2"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center font-bold text-xl sm:text-2xl md:text-3xl">
          {announce.typeCodeDes}
          <div className="mx-2 font-light text-gray-400">|</div>
          {announce.announceTitle}
        </div>
        {isAdmin && (
          <button
            onClick={handleEditClick}
            className="bg-[#1d5091] text-white px-4 py-2 rounded"
          >
            공지사항 수정
          </button>
        )}
      </div>
      <div className="text-gray-400 text-sm sm:text-base">작성일: {announce.announceDate.substring(0, 10)}</div>
      <div className="w-full flex py-4 border-gray-300 border-b"></div>
      <div className="py-16 leading-8 sm:leading-10 text-base sm:text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: announce.announceBody }} />
      {isAdmin && (<DeleteButton announceNo={announceNo} />)}
      <div className="w-full flex py-4 border-gray-300 border-b"></div>
    </div>
  );
}
