import {
  PointInnerSection,
  PointSection,
} from "../../components/page/point/Index";
import State from "../../utils/state/State";
import { formatNumber } from "../../libs/utilities";
import GZAPI from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { usePointData } from "./context/PointContext";

export default function PointCharge() {
  const { memberNo } = usePointData();
  const title = `${memberNo}님의 포인트 인출 페이지`;

  const bank = State("bank", "");
  const account = State("account", "");
  const amount = State("amount", "");
  const name = State("name", "");
  const navigate = useNavigate();

  const actions = {
    requestPointWithdraw: async () => {
      if (!window.confirm("입력하신 정보를 확인하셨습니까?")) {
        return;
      }
      const data = {
        pointChange: -amount.value,
        changeType: "T030301",
        detail: {
          withdrawBank: bank.value,
          withdrawAccount: account.value,
          withdrawAmount: -amount.value,
          withdrawName: name.value,
        },
      };
      const response = await GZAPI.post(
        `/api/members/${memberNo}/point/withdraw`,
        data
      );

      if (response.data.result === "SUCCESS") {
        alert("포인트 인출 요청이 완료되었습니다.");
        navigate("/myPage/point");
      } else {
        alert("포인트 인출 요청에 실패하였습니다. 다시 시도해주세요.");
      }
    },
    inputChangeHandler: (e) => {
      const value = e.target.value.replace(/,/g, "");
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        amount.set(numericValue);
      }
    },
  };

  return (
    <PointSection title={title}>
      <div className="flex flex-grow justify-center">
        <PointInnerSection
          title={"포인트 인출하기"}
          description={"(인출하실 계좌 정보를 정확히 입력해주세요.)"}
        >
          <div className="flex flex-col w-full space-y-2">
            {/* 은행명 */}
            <BankSelect bank={bank} />

            {/* 계좌번호 */}
            <div className="flex items-center justify-end space-x-4">
              <label className="text-2xl">계좌번호</label>
              <input
                className="w-1/2 h-16
                              border-2 border-gray-300 rounded-xl
                              p-4 pl-6
                              text-2xl"
                value={account.value}
                onChange={(e) => account.set(e.target.value)}
              />
            </div>

            {/* 예금주명 */}
            <div className="flex items-center justify-end space-x-4">
              <label className="text-2xl">예금주</label>
              <input
                className="w-1/2 h-16
                              border-2 border-gray-300 rounded-xl
                              p-4 pl-6
                              text-2xl"
                value={name.value}
                onChange={(e) => name.set(e.target.value)}
              />
            </div>

            {/* 인출금액 */}
            <div className="relative flex items-center justify-end space-x-4">
              <label className="text-2xl">금액</label>
              <input
                onChange={actions.inputChangeHandler}
                className="w-1/2 h-16
                              border-2 border-gray-300 rounded-xl
                              p-4 pl-6
                              text-2xl"
                value={formatNumber(amount.value)}
                maxLength="7"
              />
              <span className="absolute inset-y-4 right-4 text-2xl">
                {"\u20A9"}
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={actions.requestPointWithdraw}
              className="box-border border-2 rounded-xl px-4 py-2 bg-[#62c8b3] hover:bg-[#299c9f]"
            >
              인출
            </button>
          </div>
        </PointInnerSection>
      </div>
    </PointSection>
  );
}

const banks = [
  "KB국민은행",
  "신한은행",
  "하나은행",
  "우리은행",
  "SC제일은행",
  "씨티은행",
  "부산은행",
  "대구은행",
  "제주은행",
  "전북은행",
  "광주은행",
  "경남은행",
  "케이뱅크",
  "카카오뱅크",
  "토스뱅크",
];

function BankSelect({ bank }) {
  return (
    <div className="flex items-center justify-end space-x-4">
      <label className="text-2xl">은행</label>
      <select
        onChange={(e) => bank.set(e.target.value)}
        className="w-1/2 h-16 border-2 border-gray-300 rounded-xl p-4 pl-6 text-2xl"
      >
        <option>---선택해주세요---</option>
        {banks.map((bank, index) => (
          <option key={index} value={bank}>
            {bank}
          </option>
        ))}
      </select>
    </div>
  );
}
