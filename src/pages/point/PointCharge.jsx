import { PointInnerSection, PointSection } from "../../components/page/point/Index";
import State from "../../utils/state/State";
import { formatNumber } from "../../libs/utilities";
import * as PortOne from "@portone/browser-sdk/v2";
import GZAPI from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { usePointData } from "./context/PointContext";

export default function PointCharge() {
  const { memberNo } = usePointData();
  const title = `${ memberNo }님의 포인트 충전 페이지`;

  const pointCharge = State("pointCharge", 0);
  const navigate = useNavigate();

  const actions = {
    requestPointCharge: async () => {
      const payData = Payment(pointCharge.value);
      const payResponse = await PortOne.requestPayment(payData); // i'mport 결제 API

      // 오류 발생
      if (payResponse.code != null) {
        alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        // TODO: 서버에 오류정보 전송(status: 실패로 설정 후 전송)
        return;  // 종료
      }

      // TODO: 결제 로딩 화면 필요
      // 정상 처리
      const data = {
        pointChange: pointCharge.value,
        changeType: "T030101",
        detail: {
          ...payResponse,
          type: "TOSSPAY",
          status: "S030201",
        },
      }
      const response = await GZAPI.post(`/api/members/${ memberNo }/point/payment`, data);

      if (response.data.result === "SUCCESS") {
        alert('포인트 결제가 완료되었습니다.');
        navigate('/myPage/point');
      } else {
        alert('포인트 결제에 실패하였습니다. 다시 시도해주세요.')
      }
    },
    inputChangeHandler: (e) => {
      const value = e.target.value.replace(/,/g, "");
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        pointCharge.set(numericValue);
      }
    },
    addAmount: (amount) => {
      return () => {
        if (pointCharge.value + amount > 999_999) {
          alert(
            "최대 충전 가능 금액을 초과했습니다.\n(최대 충전 가능 금액: 100만 원)"
          );
          pointCharge.set(999_999);
          return;
        }
        pointCharge.set((pointCharge.value += amount));
      };
    },
  };


  return (
    <PointSection title={ title }>
      <div className="flex flex-grow justify-center">
        <PointInnerSection title={ "포인트 충전하기" }>
          <div className="relative flex w-full justify-end">
            <input
              onChange={ actions.inputChangeHandler }
              className="w-1/2 min-w-[272px] h-16
                              border-2 border-gray-300 rounded-xl
                              p-4 pl-6
                              text-2xl"
              value={ formatNumber(pointCharge.value) }
              maxLength="7"
            />
            <span className="absolute inset-y-4 right-4 text-2xl">{ '\u20A9' }</span>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={ actions.addAmount(10_000) }
              className="box-border border-2 rounded-xl px-4 py-2 bg-gray-300"
            >
              +1만
            </button>
            <button
              onClick={ actions.addAmount(30_000) }
              className="box-border border-2 rounded-xl px-4 py-2 bg-gray-300"
            >
              +3만
            </button>
            <button
              onClick={ actions.addAmount(50_000) }
              className="box-border border-2 rounded-xl px-4 py-2 bg-gray-300"
            >
              +5만
            </button>
            <button
              onClick={ actions.addAmount(100_000) }
              className="box-border border-2 rounded-xl px-4 py-2 bg-gray-300"
            >
              +10만
            </button>
            <button
              onClick={ () => pointCharge.set(0) }
              className="box-border border-2 rounded-xl px-4 py-2 bg-gray-400"
            >
              초기화
            </button>
          </div>
          <div className="w-full space-y-4">
            <h2 className="text-xl">간편결제</h2>
            <div className="w-full">
              <div className="flex w-full space-x-2">
                <div className="w-1/4">
                  <button
                    onClick={ actions.requestPointCharge }
                    className="w-full box-border border-2 border-[#3182f6] rounded py-4"
                  >
                    토스페이
                  </button>
                </div>
                <div className="w-1/4"></div>
                <div className="w-1/4"></div>
                <div className="w-1/4"></div>
              </div>
            </div>
            <h2 className="text-xl">일반결제</h2>
            <div className="flex w-full space-x-2">
              <div className="w-1/4">
                <button className="w-full box-border border-2 border-gray-400 rounded py-4">신용카드</button>
              </div>
              <div className="w-1/4">
                <button className="w-full box-border border-2 border-gray-400 rounded py-4">휴대폰</button>
              </div>
              <div className="w-1/4">
                <button className="w-full box-border border-2 border-gray-400 rounded py-4">계좌이체</button>
              </div>
              <div className="w-1/4">
                <button className="w-full box-border border-2 border-gray-400 rounded py-4">가상계좌</button>
              </div>
            </div>
          </div>
        </PointInnerSection>
      </div>
    </PointSection>
  );
}

// test
const Payment = (amount) => {
  return {
    // TODO: Zustand에 사용자명, 휴대전화, 이메일 등록
    customer: {
      fullName: "테스트2",
      phoneNumber: "010-0000-9000",
      email: "wsk221e@gmail.com",
    },
    storeId: "store-86a44338-ed36-4c07-bc18-58e7256789ba", // Store ID, 아임포트 고유키
    channelKey: "channel-key-a626044e-69e3-4140-9de5-4b516a8099d6", // 채널 키, 토스페이
    paymentId: `pay-${ crypto.randomUUID() }`,
    orderName: "포인트 충전",
    totalAmount: amount,
    currency: "CURRENCY_KRW",
    payMethod: "CARD",
  };
};
