import State from "../../utils/state/State";
import { PointCharge, PointWithdraw } from "./Index";
import PointMain from "./PointMain";
import { useEffect } from "react";


export default function Point() {
  const isLoaded = State("isLoaded", false);
  const renderPage = State("renderPage", "main");

  useEffect(() => {

  }, [isLoaded.value]);


  return (
    // TODO: 로딩 화면 구현
    // !isLoaded.value
    //   ?
    //   <PointSection>
    //     <div className="text-center">잠시만 기다려주세요..</div>
    //   </PointSection>
    //   :
    <>
      {/* 포인트 메인 페이지 */ }
      { renderPage.value === "main" && <PointMain isLoaded={ isLoaded } renderPage={ renderPage } /> }

      {/* 포인트 충전 페이지*/ }
      { renderPage.value === "charge" && <PointCharge isLoaded={ isLoaded } renderPage={ renderPage } /> }

      {/* 포인트 인출 페이지*/ }
      { renderPage.value === "withdraw" && <PointWithdraw isLoaded={ isLoaded } renderPage={ renderPage } /> }
    </>
  );
}
