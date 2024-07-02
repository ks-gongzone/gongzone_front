import { Link } from "react-router-dom";
import { useEffect } from "react";
import PointSection from "../../components/page/point/PointSection";
import { formatNumber } from "../../libs/utilities";
import GZAPI from "../../utils/api";
import State from "../../utils/state/State";
import { PointHistory } from "./Index";
import PointInnerSection from "../../components/page/point/PointInnerSection";
import useAuthStore from "../../utils/zustand/AuthStore";


export default function Point() {
  const { memberNo, pointNo } = useAuthStore((state) => ({
    memberNo: state.userInfo.memberNo,
    pointNo: state.userInfo.pointNo,
  }));
  console.log(memberNo, pointNo)
  const title = `${ memberNo }님의 포인트 페이지`;

  const memberPoint = State("memberPoint", "");
  const isLoaded = State("isLoaded", false);

  useEffect(() => {
    (async () => {
      const url = `/api/members/${ pointNo }/point`;
      const response = await GZAPI.get(url);
      const result = response.data.result;
      memberPoint.set(result);
      isLoaded.set(true);
    })();
  }, []);


  return (
    !isLoaded.value
      ?
      <PointSection title={ title }>
        <div className="text-center">잠시만 기다려주세요..</div>
      </PointSection>
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
                to={ "/point/charge" }
                className="box-border border-2 rounded-xl px-4 py-2 bg-gray-400"
              >
                충전
              </Link>
              <Link
                to={ "/point/withdraw" }
                className="box-border border-2 rounded-xl px-4 py-2 bg-gray-300"
              >
                !인출
              </Link>
            </div>
          </PointInnerSection>

          {/* 포인트 내역*/ }
          <PointInnerSection title={ "포인트 내역" }>
            <div>
              <PointHistory pointNo={ pointNo } />
            </div>
          </PointInnerSection>
        </div>
      </PointSection>
  );
}
