import { Link, useParams } from "react-router-dom";
import Section from "../../layouts/Section";

export default function Point() {
  const { memberNo } = useParams();

  return (
    <Section>
      <div className={"bg-gray-50 w-full p-8"}>
        <h2 className={"text-xl font-bold ml-8"}>포인트 페이지</h2>
        <hr className={"my-4"} />
        <div className={"flex flex-grow"}>
          <div className={"flex justify-center w-1/4"}>
            보유 포인트
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
      </div>
    </Section>
  );
}
