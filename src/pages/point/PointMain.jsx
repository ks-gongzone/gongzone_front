import { useEffect } from "react";
import { PointInnerSection, PointSection } from "../../components/page/point/Index";
import { formatNumber } from "../../libs/utilities";
import GZAPI from "../../utils/api";
import State from "../../utils/state/State";
import { Link } from "react-router-dom";
import { usePointData } from "./context/PointContext";
import { PointHistoryTable } from "./PointHistory";


export default function Point() {
  const { memberNo } = usePointData();
  const title = `${ memberNo }님의 포인트 페이지`;

  const memberPoint = State("memberPoint", "");

  useEffect(() => {
    (async () => {
      const url = `/api/members/${ memberNo }/point`;
      const response = await GZAPI.get(url);
      const result = response.data.result;
      memberPoint.set(result);
    })();
  }, []);


  return (
    <PointSection title={ title }>
      <div className="flex flex-col flex-grow space-y-12">
        {/* 보유 포인트, 충전/인출 버튼 */ }
        <PointInnerSection title={ "보유 포인트" }>
          <div className="items-center w-full text-right text-6xl">
            <span className="font-bold">{ formatNumber(memberPoint.value) }</span>
            <span className="ml-4 text-3xl">Point</span>
          </div>
          <div className="flex justify-end space-x-4">
            <Link to="/myPage/point/charge"
                  className="box-border border-2 rounded-xl px-4 py-2 bg-gray-400"
            >충전</Link>
            <Link to="/myPage/point/withdraw"
                  className="box-border border-2 rounded-xl px-4 py-2 bg-gray-300"
            >인출</Link>
          </div>
        </PointInnerSection>

        {/* 포인트 내역*/ }
        <PointInnerSection title={ "포인트 내역" }
                           description={ "(현재 페이지에는 최근 10건만 표시됩니다.)" }>
          <PointHistoryTable memberNo={ memberNo } />
          <div className="flex justify-center">
            <Link to="/myPage/point/history"
                  className="w-1/5 text-center box-border border-2 rounded-xl px-4 py-2 bg-gray-400"
            >내역 더보기</Link>
          </div>
        </PointInnerSection>
      </div>
    </PointSection>
  );
}
