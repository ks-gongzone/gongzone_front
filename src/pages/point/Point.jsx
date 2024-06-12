import { Link, useParams } from "react-router-dom";
import PointSection from "../../layouts/Section";

export default/**
*
*/
 function Point() {
  const { memberNo } = useParams();
  const title = `${memberNo}님의 포인트 페이지`;

  return (
    <PointSection title={title}>
      <div className={"flex flex-grow"}>
        <div className={"flex flex-col justify-center items-center w-1/4"}>
          보유 포인트
          <div className={"flex justify-center items-center text-xl bg-gray-100 w-32 h-32"}>
            <span className={"font-bold"}>?</span><span>P</span>
          </div>
        </div>
        <div className={"flex justify-center w-1/4"}>
          <Link to={`/member/${memberNo}/point/history`} className="text-blue-500 underline">
            포인트 내역
          </Link>
        </div>
        <div className={"flex justify-center w-1/4"}>
          <Link to={`/member/${memberNo}/point/charge`} className="text-blue-500 underline">
            포인트 충전
          </Link>
        </div>
        <div className={"flex justify-center w-1/4"}>
          <Link to={`/member/${memberNo}/point/withdraw`} className="text-blue-500 underline">
            포인트 인출
          </Link>
        </div>
      </div>
    </PointSection>
  );
}
