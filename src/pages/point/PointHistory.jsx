import React, { useEffect } from "react";
import { formatNumber } from "../../libs/utilities";
import State from "../../utils/state/State";
import { Link } from "react-router-dom";
import { usePointData } from "./context/PointContext";
import { PointInnerSection, PointSection } from "../../components/page/point/Index";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import { PointAPI } from "../../utils/repository";

export default function PointHistory() {
  const { memberNo } = usePointData();
  const [pageSize, pageNo, maxPage, loading, histories] = [
    State("pageSize", 10),
    State("pageNo", 1),
    State("maxPage", 0),
    State("loading", true),
    State("histories", [])
  ];

  useEffect(() => {
    (async () => {
      // 포인트 내역 불러오기
      const responseHistories = await PointAPI.fetchHistories(memberNo);
      histories.set(responseHistories.data.result.elements);
      maxPage.set(responseHistories.data.result.max);

      // 로딩 완료
      loading.set(false);
    })();
  }, [loading.value]);


  return (
    loading.value ?
      <PointInnerSection>
        <div className="flex flex-col items-center mt-12">
          <Skeleton circle={ true } height={ 150 } width={ 150 } />
          <Skeleton height={ 30 } width={ 200 } className="mt-4" />
          <Skeleton height={ 20 } width={ 300 } className="mt-2" />
          <Skeleton height={ 20 } width={ 300 } className="mt-2" />
          <Skeleton height={ 20 } width={ 300 } className="mt-2" />
        </div>
      </PointInnerSection>
      :
      <PointSection title={ `${ memberNo }님의 포인트 내역 페이지` }>
        <PointInnerSection>
          <div>
            <div></div>
          </div>
          <PointHistoryTable
            memberNo={ memberNo }
            histories={ histories }
            pageSize={ pageSize.value }
            pageNo={ pageNo.value }
          />
          <div className="flex justify-end">
            <div className="w-1/6"></div>
            <div className="w-4/6">
              <Pagination pageNo={ pageNo } totalPages={ maxPage.value } />
            </div>
            <div className="w-1/6 flex justify-end items-center">
              <select
                className="w-full h-8 border rounded border-gray-400"
                onChange={ (event) => {
                  pageSize.set(Number(event.target.value));
                } }
              >
                <option value="10">10개</option>
                <option value="25">25개</option>
              </select>
            </div>
          </div>
        </PointInnerSection></PointSection>
  );
}

export function PointHistoryTable({ memberNo, histories, pageSize = 10, pageNo = 1 }) {

  return (
    <div className="flex flex-col flex-grow space-y-4">
      <div className="flex justify-end text-s"></div>
      <div className="flex flex-col w-full">
        <div className="flex w-full bg-gray-100 text-center">
          <TableHeader width="w-3/12">날짜</TableHeader>
          <TableHeader width="w-2/12">유형</TableHeader>
          <TableHeader width="w-[16%]">변동전</TableHeader>
          <TableHeader width="w-[16%]">변동량</TableHeader>
          <TableHeader width="w-[16%]">변동후</TableHeader>
          <TableHeader width="w-[12%]">상태</TableHeader>
        </div>
        { histories.value.map((history, index) => (
          <PointHistoryRow
            key={ index }
            memberNo={ memberNo }
            pointHistory={ history }
          />
        )) }
      </div>
    </div>
  );
}

function PointHistoryRow({ memberNo, pointHistory }) {
  return (
    <div className="flex w-full border-y border-y-gray-300 bg-gray-50 text-center">
      <TableCell width="w-3/12">
        { pointHistory.pointHistoryDate.substring(0, 10) }
      </TableCell>
      <TableCell width="w-2/12">{ pointHistory.type }</TableCell>
      <TableCell width="w-[16%]">
        { formatNumber(pointHistory.pointHistoryBefore) }
      </TableCell>
      <TableCell width="w-[16%]">
        { formatNumber(pointHistory.pointHistoryChange) }
      </TableCell>
      <TableCell width="w-[16%]">
        { formatNumber(pointHistory.pointHistoryAfter) }
      </TableCell>
      <TableCell width="w-[12%]">
        <Link
          to="/myPage/point/detail"
          state={ { memberNo, historyNo: pointHistory.pointHistoryNo } }
        >
          { pointHistory.status }
        </Link>
      </TableCell>
    </div>
  );
}

function TableHeader({ width, children }) {
  const className = `border-x border-x-gray-300 border-y-2 border-y-gray-400 ${
    width || "w-auto"
  }`;
  return <div className={ className }>{ children }</div>;
}

function TableCell({ width, children }) {
  const className = `border-x border-gray-300 ${ width || "w-auto" }`;
  return <div className={ className }>{ children }</div>;
}

const Pagination = ({ pageNo, totalPages }) => {
  const { value, set } = pageNo;

  const handleFirstPage = () => set(1);
  const handleLastPage = () => set(totalPages);
  const handlePrevPage = () => value > 1 && set(value - 1);
  const handleNextPage = () => value < totalPages && set(value + 1);

  const handlePageClick = (page) => set(page);

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(value - 2, 1);
    let endPage = Math.min(value + 2, totalPages);

    if (value <= 2) endPage = Math.min(5, totalPages);
    if (value >= totalPages - 1) startPage = Math.max(totalPages - 4, 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={ i }
          onClick={ () => handlePageClick(i) }
          className={ `px-3 py-1 border rounded ${
            i === value ? "bg-blue-500 text-white" : "bg-gray-200"
          }` }
        >
          { i }
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={ handleFirstPage }
        disabled={ value <= 1 }
        className="p-1 border border-gray-400 rounded"
      >
        <ChevronDoubleLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={ handlePrevPage }
        disabled={ value <= 1 }
        className="p-1 border border-gray-400 rounded"
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      { renderPageNumbers() }
      <button
        onClick={ handleNextPage }
        disabled={ value >= totalPages }
        className="p-1 border border-gray-400 rounded"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
      <button
        onClick={ handleLastPage }
        disabled={ value >= totalPages }
        className="p-1 border border-gray-400 rounded"
      >
        <ChevronDoubleRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
