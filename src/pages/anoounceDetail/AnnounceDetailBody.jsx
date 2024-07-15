import { useEffect, useState } from "react";
import { AnnounceAPI } from "../../utils/repository";
import { useNavigate, useParams } from "react-router-dom";
import AuthStore from "../../utils/zustand/AuthStore";
import DeleteButton from "../../admin/components/announce/AnnounceDeleteButton";

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
    window.scrollTo(0, 0); // 페이지 이동 위치 조정 필요한 사람 조정
    if (!announceNo) {
      console.error("announceNo가 없습니다.")
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
      navigate(`/_admin/announce/update`, { state: {announce, announceNo, memberNo: userInfo.memberNo} });
    } else {
      alert("해당 권한이 없습니다.");
    }
  };

  if (!announce) {
    return<div>내용 가져오는 중...</div>;
  }

  return (
    <div>
      <div className="w-[1200px] flex pb-4 border-black border-t-2"></div>
      <div className="flex justify-between items-center pt-2">
      <div className="flex items-center font-bold text-[1.5vw]">
        {announce.typeCodeDes}
        <div className="mx-2 font-light text-gray-400">|</div>
        {announce.announceTitle}
      </div>
      {isAdmin && (
        <button
        onClick={handleEditClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        공지사항 수정
        </button>
      )}
        </div>
      <div className="text-gray-400 text-[0.8vw]">작성일: {announce.announceDate.substring(0, 10)}</div>
      <div className="w-[1200px] flex py-4 border-gray-300 border-b"></div>
      <div className="py-16 leading-10" dangerouslySetInnerHTML={{ __html: announce.announceBody }} />
      {isAdmin && (<DeleteButton announceNo={announceNo} />)}
      <div className="w-[1200px] flex py-4 border-gray-300 border-b"></div>
    </div>
  );
}