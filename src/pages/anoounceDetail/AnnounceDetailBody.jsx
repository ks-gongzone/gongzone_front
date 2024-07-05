import { useEffect, useState } from "react";
import { AnnounceAPI } from "../../utils/repository";

export default function AnnounceDetailBody() {
  const [announce, setAnnounce] = useState(null);
  const announceNo = sessionStorage.getItem('announceNo');

  useEffect(() => {
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
      });
  }, [announceNo]);

  if (!announce) {
    return<div>내용 가져오는 중...</div>;
  }

  console.log(announceNo);

  return (
    <div>
      <div className="w-[1200px] flex pb-4 border-black border-t-2"></div>
      <div className="flex pt-2 font-bold text-[1.5vw]">
        {announce.type} <div className="mx-2 font-light text-gray-400"> | </div> {announce.title}
      </div>
      <div className="text-gray-400 text-[0.8vw]">{announce.date}</div>
      <div className="w-[1200px] flex py-4 border-gray-300 border-b"></div>
      <div className="py-16 leading-10" 
        dangerouslySetInnerHTML={{ __html: announce.content }} />
      <div className="w-[1200px] flex py-4 border-gray-300 border-b"></div>
    </div>
  );
}