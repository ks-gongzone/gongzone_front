import { useEffect } from "react";
import GZAPI from "../../utils/api";
import { formatNumber } from "../../libs/utilities";
import State from "../../utils/state/State";
import { Link } from "react-router-dom";
import { usePointData } from "./context/PointContext";
import { PointInnerSection } from "../../components/page/point/Index";

export default function PointHistory() {
  const { memberNo, pointNo } = usePointData();
  const [pageSize, pageNo] = [
    State('pageSize', 10),
    State('PageNo', 1)
  ]

  // totalPages 가져오기
  useEffect(() => {

  }, [pageSize]);

  return (
    <PointInnerSection title={ `${ memberNo }님의 포인트 내역 페이지` }>
      <div>
        <div></div>
      </div>
      <PointHistoryTable pointNo={ pointNo } pageSize={ pageSize.value } pageNo={ pageNo.value } />
      <div className="flex justify-end">
        <div className="w-1/6"></div>
        <div className="w-4/6">
          {/* TODO: totalPages 구현 */ }
          <Pagination pageNo={ pageNo } totalPages={ 10 } />
        </div>
        <div className="w-1/6 flex justify-end items-center">
          <select className="w-full h-8 border rounded border-gray-400 "
                  onChange={ (event) => {
                    pageSize.set(event.target.value);
                  } }>
            <option value="10">!10개</option>
            <option value="25">!25개</option>
          </select>
        </div>
      </div>
    </PointInnerSection>
  );
}

export function PointHistoryTable({ pointNo, pageSize = 10, pageNo = 1 }) {
  const histories = State("pointHistories", []);

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams({
        pageSize: pageSize,
        pageNo: pageNo,
      });
      const url = `/api/members/${ pointNo }/point/history?${ params.toString() }`;
      const response = await GZAPI.get(url);
      const result = response.data.result;
      histories.set(result);
    })();
  }, []);

  return (
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
        { histories.value.map((history) => {
          return (
            <PointHistoryRow pointNo={ pointNo }
                             pointHistory={ history } />
          );
        }) }
      </div>
    </div>
  );
}

function PointHistoryRow({ pointNo, pointHistory }) {
  return (
    <div className="flex w-full border-y border-y-gray-300 bg-gray-50 text-center">
      <TableCell width="w-3/12">{ pointHistory.pointHistoryDate.substring(0, 11) }</TableCell>
      <TableCell width="w-2/12">{ pointHistory.type }</TableCell>
      <TableCell width="w-[16%]">{ formatNumber(pointHistory.pointHistoryBefore) }</TableCell>
      <TableCell width="w-[16%]">{ formatNumber(pointHistory.pointHistoryChange) }</TableCell>
      <TableCell width="w-[16%]">{ formatNumber(pointHistory.pointHistoryAfter) }</TableCell>
      <TableCell width="w-[12%]">
        <Link to={ '/myPage/point/detail' }
              state={
                {
                  pointNo: pointNo,
                  historyNo: pointHistory.pointHistoryNo
                }
              }>
          { pointHistory.status }
        </Link>
      </TableCell>
    </div>
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

const Pagination = ({ pageNo, totalPages }) => {
  const { value, set } = pageNo;

  const handleFirstPage = () => {
    set(1);
  };

  const handleLastPage = () => {
    set(totalPages);
  };

  const handlePrevPage = () => {
    if (value > 1) set(value - 1);
  };

  const handleNextPage = () => {
    if (value < totalPages) set(value + 1);
  };

  const handlePageClick = (page) => {
    set(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(value - 2, 1);
    let endPage = Math.min(value + 2, totalPages);

    if (value <= 2) {
      endPage = 5;
    }

    if (value >= totalPages - 1) {
      startPage = totalPages - 4;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= totalPages) {
        pages.push(
          <button
            key={ i }
            onClick={ () => handlePageClick(i) }
            className={ `px-3 py-1 border rounded ${
              i === value ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }` }
          >
            { i }
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        onClick={ handleFirstPage }
        className="px-3 py-1 border border-gray-400 rounded"
      >
        &lsaquo;&lsaquo;
      </button>
      <button
        onClick={ handlePrevPage }
        className="px-3 py-1 border border-gray-400 rounded"
      >
        &lsaquo;
      </button>
      { renderPageNumbers() }
      <button
        onClick={ handleNextPage }
        className="px-3 py-1 border border-gray-400 rounded"
      >
        &rsaquo;
      </button>
      <button
        onClick={ handleLastPage }
        className="px-3 py-1 border border-gray-400 rounded"
      >
        &rsaquo;&rsaquo;
      </button>
    </div>
  );
};
