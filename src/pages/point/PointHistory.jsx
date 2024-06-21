import { useEffect } from "react";
import GZAPI from "../../utils/api";
import { formatNumber } from "../../libs/utilities";
import State from "../../utils/state/State";

export default function PointHistory({ memberPointNo }) {
  const pointHistory = State("pointHistory", []);

  useEffect(() => {
    (async () => {
      const url = `/api/members/${memberPointNo}/point/history`;
      const response = await GZAPI.get(url);
      const result = [...response.data.result];
      console.log(result);
      pointHistory.set(result);
    })();
  }, []);

  return (
    <div className="flex flex-col flex-grow space-y-4">
      <div className="flex justify-around">
        <button className="w-1/4 h-8 rounded-lg bg-gray-300">!사용 내역</button>
        <button className="w-1/4 h-8 rounded-lg bg-gray-300">
          !충전(증가) 내역
        </button>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full bg-gray-100 text-center">
          <div className="w-2/12 border-x border-x-gray-300 border-y-2 border-y-gray-400">
            내역번호
          </div>
          <div className="w-4/12 border-x border-x-gray-300 border-y-2 border-y-gray-400">
            일시
          </div>
          <div className="w-2/12 border-x border-x-gray-300 border-y-2 border-y-gray-400">
            유형
          </div>
          <div className="w-[12%] border-x border-x-gray-300 border-y-2 border-y-gray-400">
            변동전
          </div>
          <div className="w-[12%] border-x border-x-gray-300 border-y-2 border-y-gray-400">
            변동량
          </div>
          <div className="w-[12%] border-x border-x-gray-300 border-y-2 border-y-gray-400">
            변동후
          </div>
          <div className="w-[12%] border-x border-x-gray-300 border-y-2 border-y-gray-400">
            상태
          </div>
        </div>
        {pointHistory.value.map((history, index) => {
          return <PointHistoryRow key={index} pointHistory={history} />;
        })}
      </div>
    </div>
  );
}

const PointHistoryRow = ({ pointHistory }) => {
  return (
    <div className="flex w-full border-y border-y-gray-300 bg-gray-50 text-center">
      <div className="w-2/12 border-x border-gray-300">
        {pointHistory.pointHistoryNo}
      </div>
      <div className="w-4/12 border-x border-gray-300">
        {pointHistory.pointHistoryDate}
      </div>
      <div className="w-2/12 border-x border-gray-300">{pointHistory.type}</div>
      <div className="w-[12%] border-x border-gray-300">
        {formatNumber(pointHistory.pointHistoryBefore)}
      </div>
      <div className="w-[12%] border-x border-gray-300">
        {formatNumber(pointHistory.pointHistoryChange)}
      </div>
      <div className="w-[12%] border-x border-gray-300">
        {formatNumber(pointHistory.pointHistoryAfter)}
      </div>
      <div className="w-[12%] border-x border-gray-300">
        {pointHistory.status}
      </div>
    </div>
  );
};
