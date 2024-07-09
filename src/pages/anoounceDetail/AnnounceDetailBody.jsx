import { useEffect, useState } from "react";
import { AnnounceAPI } from "../../utils/repository";
import { useNavigate, useParams } from "react-router-dom";

/**
 * @수정일: 2024-07-08
 * @수정내용: 세션스토리지에 announceNo 저장해서 조회 -> Link to 로 값 전달 후 useParams 훅 사용
 */
export default function AnnounceDetailBody() {
  const { announceNo } = useParams();
  const navigate = useNavigate();
  const [announce, setAnnounce] = useState(null);

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
        // navigate("/announce")
        alert("공지사항을 불러올 수 없습니다.");
      });
  }, [announceNo, navigate]);

  if (!announce) {
    return<div>내용 가져오는 중...</div>;
  }

  console.log(announceNo);

  return (
    <div>
      <div className="w-[1200px] flex pb-4 border-black border-t-2"></div>
      <div className="flex pt-2 font-bold text-[1.5vw]">
        {announce.typeCodeDes} <div className="mx-2 font-light text-gray-400"> | </div> {announce.announceTitle}
      </div>
      <div className="text-gray-400 text-[0.8vw]">{announce.announceDate}</div>
      <div className="w-[1200px] flex py-4 border-gray-300 border-b"></div>
      <div className="py-16 leading-10" dangerouslySetInnerHTML={{ __html: announce.announceBody }} />
      <div className="w-[1200px] flex py-4 border-gray-300 border-b"></div>
    </div>
  );
}