import { Link } from "react-router-dom";
import { useEffect } from "react";
import PointSection from "../../components/page/point/PointSection";
import { formatNumber } from "../../libs/utilities";
import GZAPI from "../../utils/api";
import State from "../../utils/state/State";
import { PointHistory } from "./Index";
import PointInnerSection from "../../components/page/point/PointInnerSection";

// test: 로그인 기능 구현 후 제거
sessionStorage.setItem("memberNo", "M000002");
sessionStorage.setItem("memberPointNo", "MP000002");
const memberNo = sessionStorage.getItem("memberNo");
const memberPointNo = sessionStorage.getItem("memberPointNo");
const title = `${memberNo}님의 포인트 페이지`;
export default function Point() {
  const memberPoint = State("memberPoint", "");
  const isLoaded = State("isLoaded", false);

  useEffect(() => {
    (async () => {
      const url = `/api/members/${memberPointNo}/point`;
      const response = await GZAPI.get(url);
      const result = response.data.result;
      memberPoint.set(result);
      isLoaded.set(true);
    })();
  }, []);

  if (!isLoaded.value) {
    return (
      <PointSection title={title}>
        <div className="text-center">잠시만 기다려주세요..</div>
      </PointSection>
    );
  }

  return (
    <PointSection title={title}>
      <div className="flex flex-col flex-grow space-y-12">
        {/* 보유 포인트, 충전/인출 버튼 */}
        <PointInnerSection title={"보유 포인트"}>
          <div className="items-center w-full text-right text-6xl">
            <span className="font-bold">{formatNumber(memberPoint.value)}</span>
            <span className="ml-4 text-3xl">Point</span>
          </div>
          <div className="flex justify-end space-x-4">
            <Link
              to={"/point/charge"}
              className="box-border border-2 rounded-xl px-4 py-2 bg-gray-400"
            >
              !충전
            </Link>
            <Link
              to={"/point/withdraw"}
              className="box-border border-2 rounded-xl px-4 py-2 bg-gray-300"
            >
              !인출
            </Link>
          </div>
        </PointInnerSection>

        {/* 포인트 내역*/}
        <PointInnerSection title={"포인트 내역"}>
          <div>
            <PointHistory memberPointNo={memberPointNo} />
          </div>
        </PointInnerSection>
      </div>
    </PointSection>
  );
}
