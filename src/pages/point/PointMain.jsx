import React, { useEffect } from "react";
import { PointInnerSection, PointSection, } from "../../components/page/point/Index";
import { formatNumber } from "../../libs/utilities";
import State from "../../utils/state/State";
import { Link } from "react-router-dom";
import { usePointData } from "./context/PointContext";
import { PointHistoryTable } from "./PointHistory";
import Skeleton from "react-loading-skeleton";
import { PointAPI } from "../../utils/repository";

export default function Point() {
  const { memberNo } = usePointData();
  const title = `${ memberNo }님의 포인트 페이지`;

  const [memberPoint, loading, histories] = [
    State("memberPoint", ""),
    State("loading", true),
    State("pointHistories", [])
  ];

  useEffect(() => {
    (async () => {
      // 포인트 불러오기
      const responsePoint = await PointAPI.fetchPoint(memberNo);
      memberPoint.set(responsePoint.data.result);

      // 포인트 내역 불러오기
      const responseHistories = await PointAPI.fetchHistories(memberNo);
      histories.set(responseHistories.data.result.elements);

      // 로딩 완료
      loading.set(false);
    })();
  }, []);

  console.log(loading)


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
      <PointSection title={ title }>
        <div className="flex flex-col flex-grow space-y-12">
          {/* 보유 포인트, 충전/인출 버튼 */ }
          <PointInnerSection title={ "보유 포인트" }>
            <div className="items-center w-full text-right text-6xl">
              <span className="font-bold">{ formatNumber(memberPoint.value) }</span>
              <span className="ml-4 text-3xl">Point</span>
            </div>
            <div className="flex justify-end space-x-4">
              <Link
                to="/myPage/point/charge"
                className="box-border border-2 rounded-xl px-4 py-2 bg-[#6ea2d4] hover:bg-[#1d5091]"
              >
                충전
              </Link>
              <Link
                to="/myPage/point/withdraw"
                className="box-border border-2 rounded-xl px-4 py-2 bg-[#62c8b3] hover:bg-[#299c9f]"
              >
                인출
              </Link>
            </div>
          </PointInnerSection>

          {/* 포인트 내역*/ }
          <PointInnerSection
            title={ "포인트 내역" }
            description={ "(현재 페이지에는 최근 10건만 표시됩니다.)" }
          >
            <PointHistoryTable memberNo={ memberNo } histories={ histories } />
            <div className="flex justify-center">
              <Link
                to="/myPage/point/history"
                className="w-full text-center box-border border-2 rounded-xl px-4 py-2 bg-gray-200 hover:bg-gray-400"
              >
                내역 더보기
              </Link>
            </div>
          </PointInnerSection>
        </div>
      </PointSection>
  );
}
