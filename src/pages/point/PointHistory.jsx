import PointSection from "../../layouts/point/PointSection";
import { useEffect, useState } from "react";
import GZAPI from "../../utils/api";
import { formatNumber } from "../../libs/utilities";

function PointHistoryRow({ pointHistory }) {
  return (
    <div className="flex w-full text-center">
      <div className="w-2/12 border border-gray-400">{pointHistory.pointHistoryNo}</div>
      <div className="w-4/12 border border-gray-400">{pointHistory.pointHistoryDate}</div>
      <div className="w-2/12 border border-gray-400">{pointHistory.type}</div>
      <div className="w-[12%] border border-gray-400">{formatNumber(pointHistory.pointHistoryBefore)}</div>
      <div className="w-[12%] border border-gray-400">{formatNumber(pointHistory.pointHistoryChange)}</div>
      <div className="w-[12%] border border-gray-400">{formatNumber(pointHistory.pointHistoryAfter)}</div>
      <div className="w-[12%] border border-gray-400">{pointHistory.status}</div>
    </div>
  );
}

export default function PointHistory() {
  sessionStorage.setItem("memberNo", "M000002");
  const memberNo = sessionStorage.getItem("memberNo");
  const title = `${memberNo}님의 포인트 내역 페이지`;

  const [pointHistory, setPointHistory] = useState(null);

  useEffect(() => {
    async function fetchMemberPointHistory() {
      try {
        const url = `/api/members/${memberNo}/point/history`;
        const response = await GZAPI.get(url);
        const result = response.data.result;
        setPointHistory(result);
        console.log(result);
      } catch (e) {
        console.error("Error while fetching:", e);
      }
    }

    fetchMemberPointHistory();
  }, [memberNo]);


  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    pointHistory != null ? setLoaded(true) : setLoaded(false);
  }, [pointHistory]);

  if (!loaded) {
    return (
      <PointSection title={title}>
        <div className="text-center">
          잠시만 기다려주세요..
        </div>
      </PointSection>
    );
  }


  return (
    <PointSection title={title}>
      <div className="flex flex-grow">
        <div className="flex flex-col w-full">
          <div className="flex w-full text-center">
            <div className="w-2/12 border border-gray-400">내역번호</div>
            <div className="w-4/12 border border-gray-400">일시</div>
            <div className="w-2/12 border border-gray-400">유형</div>
            <div className="w-[12%] border border-gray-400">변동전</div>
            <div className="w-[12%] border border-gray-400">변동량</div>
            <div className="w-[12%] border border-gray-400">변동후</div>
            <div className="w-[12%] border border-gray-400">처리상태</div>
          </div>
          {
            pointHistory.map((history, index) => {
              return (
                <PointHistoryRow key={index} pointHistory={history} />
              );
            })
          }
        </div>
      </div>
    </PointSection>
  );
}
