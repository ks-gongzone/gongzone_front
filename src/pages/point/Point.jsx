import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PointSection from "../../layouts/point/PointSection";
import { formatNumber } from "../../libs/utilities";
import GZAPI from "../../utils/api";

export default function Point() {
  // test: 로그인 기능 구현 후 제거
  sessionStorage.setItem("memberNo", "M000001");
  const memberNo = sessionStorage.getItem("memberNo");
  const title = `${memberNo}님의 포인트 페이지`;

  const [memberPoint, setMemberPoint] = useState(null);

  useEffect(() => {
    async function fetchMemberPoint() {
      try {
        const url = `/api/members/${memberNo}/point`;
        const response = await GZAPI.get(url);
        setMemberPoint(response.data.result.memberPoint);
      } catch (e) {
        console.error("Error while fetching:", e);
      }
    }

    fetchMemberPoint();
  }, [memberNo]);


  return (
    <PointSection title={title}>
      <div className="flex flex-grow">
        <div className="flex flex-col justify-center items-center w-1/4">
          <div>
            <p className="mb-4">보유 포인트</p>
          </div>
          <div className="flex justify-center items-center w-32 h-32 text-xl bg-gray-100">
            <span className="font-bold">{formatNumber(memberPoint)}</span><span>P</span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4">
          <div>
            <p className="mb-4">포인트 내역</p>
          </div>
          <Link to={`/point/history`} className="flex justify-center items-center w-32 h-32 text-xl bg-gray-100">
            ㅇ
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4">
          <div>
            <p className="mb-4">포인트 충전</p>
          </div>
          <Link to={`/point/charge`} className="flex justify-center items-center w-32 h-32 text-xl bg-gray-100">
            ㅇ
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4">
          <div>
            <p className="mb-4">포인트 인출</p>
          </div>
          <Link to={`/point/withdraw`} className="flex justify-center items-center w-32 h-32 text-xl bg-gray-100">
            ㅇ
          </Link>
        </div>
      </div>
    </PointSection>
  );
}
