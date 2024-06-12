import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PointSection from "../../layouts/PointSection";
import { formatNumber } from "../../libs/utilities";

export default function Point() {
  const { memberNo } = useParams();
  const title = `${memberNo}님의 포인트 페이지`;

  const [memberPoint, setMemberPoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMemberPoint() {
      try {
        const url = `/api/member/${memberNo}/point`;
        const response = await axios.get(url);
        setMemberPoint(response.data.result.memberPoint);
      } catch (error) {
        console.error("Error while fetching:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberPoint();
  }, [memberNo]);

  if (loading) {
    return (
      <PointSection>
        <div className={"flex justify-center"}>Loading...</div>
      </PointSection>
    );

  }

  if (error) {
    return (
      <PointSection>
        <div className={"flex justify-center"}>Error: {error.message}</div>
      </PointSection>
    );
  }

  return (
    <PointSection title={title}>
      <div className="flex flex-grow">
        <div className="flex flex-col justify-center items-center w-1/4">
          보유 포인트
          <div className="flex justify-center items-center text-xl bg-gray-100 w-32 h-32">
            <span className="font-bold">{formatNumber(memberPoint)}</span><span>P</span>
          </div>
        </div>
        <div className="flex justify-center w-1/4">
          <Link to={`/member/${memberNo}/point/history`} className="text-blue-500 underline">
            포인트 내역
          </Link>
        </div>
        <div className="flex justify-center w-1/4">
          <Link to={`/member/${memberNo}/point/charge`} className="text-blue-500 underline">
            포인트 충전
          </Link>
        </div>
        <div className="flex justify-center w-1/4">
          <Link to={`/member/${memberNo}/point/withdraw`} className="text-blue-500 underline">
            포인트 인출
          </Link>
        </div>
      </div>
    </PointSection>
  );
}
