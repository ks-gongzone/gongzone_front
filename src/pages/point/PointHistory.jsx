import { useEffect } from "react";
import GZAPI from "../../utils/api";
import { formatNumber } from "../../libs/utilities";
import State from "../../utils/state/State";
import PointInnerSection from "../../components/page/point/PointInnerSection";
import { Link } from "react-router-dom";

export default function PointHistory({ pointNo }) {
  const histories = State("pointHistories", []);

  useEffect(() => {
    (async () => {
      const url = `/api/members/${ pointNo }/point/history`;
      const response = await GZAPI.get(url);
      const result = [...response.data.result];
      console.log(result);
      histories.set(result);
    })();
  }, []);


  return (
    <PointInnerSection title={ "포인트 내역" }
                       description={ "(!현재 페이지에는 최근 10건만 표시됩니다.)" }>
      <div className="flex flex-col flex-grow space-y-4">
        <div className="flex justify-end text-s">
        </div>
        <div className="flex flex-col w-full">
          <div className="flex w-full bg-gray-100 text-center">
            <TableHeader width="w-3/12">날짜</TableHeader>
            <TableHeader width="w-2/12">유형</TableHeader>
            <TableHeader width="w-[16%]">변동전</TableHeader>
            <TableHeader width="w-[16%]">변동량</TableHeader>
            <TableHeader width="w-[16%]">변동후</TableHeader>
            <TableHeader width="w-[12%]">상태</TableHeader>
          </div>
          { histories.value.map((history, index) => {
            return <PointHistoryRow key={ index } pointHistory={ history } />;
          }) }
        </div>
      </div>
    </PointInnerSection>
  );
}


// TODO: 상태 클릭 시 상세조회로 연결
const PointHistoryRow = ({ pointHistory }) => {
  return (
    <div className="flex w-full border-y border-y-gray-300 bg-gray-50 text-center">
      <TableCell width="w-3/12">{ pointHistory.pointHistoryDate.substring(0, 11) }</TableCell>
      <TableCell width="w-2/12">{ pointHistory.type }</TableCell>
      <TableCell width="w-[16%]">{ formatNumber(pointHistory.pointHistoryBefore) }</TableCell>
      <TableCell width="w-[16%]">{ formatNumber(pointHistory.pointHistoryChange) }</TableCell>
      <TableCell width="w-[16%]">{ formatNumber(pointHistory.pointHistoryAfter) }</TableCell>
      <TableCell width="w-[12%]">
        <Link to={ {
          pathname: '/myPage/point/detail',
          state: { historyNo: pointHistory.pointHistoryNo }
        } }>!{ pointHistory.status }</Link>
      </TableCell>
    </div>
  );
};

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
