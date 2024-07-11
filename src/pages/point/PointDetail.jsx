import { useEffect } from "react";
import GZAPI from "../../utils/api";
import State from "../../utils/state/State";
import { PointInnerSection } from "../../components/page/point/Index";
import { useLocation } from "react-router-dom";

export default function PointDetail() {
  const location = useLocation();
  const { pointNo, historyNo } = location.state || {};

  const pointHistory = State("pointHistory", {});

  useEffect(() => {
    (async () => {
      const url = `/api/members/${ pointNo }/point/history/${ historyNo }`;
      const response = await GZAPI.get(url);
      console.log(response)
      const result = response.data.result;
      pointHistory.set(result);
    })();
  }, []);


  return (
      <PointInnerSection title={ "포인트 내역 상세" } description={ '변동전 (A) + 변동량 (B) = 변동후 (C)' }>
        <div className="flex text-center">
          <TableHeader width={ "w-1/2" }>포인트 내역 번호</TableHeader>
          <TableHeader width={ "w-1/2" }>요청 일시</TableHeader>
        </div>
        <div className="flex text-center">
          <TableCell width={ "w-1/2" }>{ pointHistory.value.pointHistoryNo }</TableCell>
          <TableCell width={ "w-1/2" }>{ pointHistory.value.pointHistoryDate }</TableCell>
        </div>
        <div className="flex text-center">
          <TableHeader width={ "w-1/5" }>요청 유형</TableHeader>
          <TableHeader width={ "w-1/5" }>변동전 (A)</TableHeader>
          <TableHeader width={ "w-1/5" }>변동량 (B)</TableHeader>
          <TableHeader width={ "w-1/5" }>변동후 (C)</TableHeader>
          <TableHeader width={ "w-1/5" }>처리 상태</TableHeader>
        </div>
        <div className="flex text-center">
          <TableCell width={ "w-1/5" }>{ pointHistory.value.type }</TableCell>
          <TableCell width={ "w-1/5" }>{ pointHistory.value.pointHistoryBefore }</TableCell>
          <TableCell width={ "w-1/5" }>{ pointHistory.value.pointHistoryChange }</TableCell>
          <TableCell width={ "w-1/5" }>{ pointHistory.value.pointHistoryAfter }</TableCell>
          <TableCell width={ "w-1/5" }>{ pointHistory.value.status }</TableCell>
        </div>
        <div className="flex justify-center">
          <div className="w-1/2 flex justify-around">
            {/* TODO: 온라인영수증 팝업 */ }
            <button className="box-border border-2 rounded-xl px-4 py-2 bg-gray-400">!온라인영수증</button>
            {/* TODO: 문의하기 연결 */ }
            <button className="box-border border-2 rounded-xl px-4 py-2 bg-gray-300">!문의하기</button>
          </div>
        </div>
      </PointInnerSection>
  );
}

function TableHeader({ width, children }) {
  let className = "border-x border-x-gray-300 border-y-2 border-y-gray-400 ";
  className += width ? width : "w-auto";

  return (
      <div className={ className }>
        { children }
      </div>
  );
}

function TableCell({ width, children }) {
  let className = "border-x border-gray-300 ";
  className += width ? width : "w-auto";

  return (
      <div className={ className }>
        { children }
      </div>
  );
}
