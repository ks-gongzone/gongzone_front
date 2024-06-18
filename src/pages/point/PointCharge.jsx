import { useEffect } from "react";
import PointSection from "../../layouts/point/PointSection";
import State from "../../utils/state/State";
import PointInnerSection from "../../layouts/point/PointInnerSection";
import { formatNumber } from "../../libs/utilities";
import GZAPI from "../../utils/api";
import { useNavigate } from "react-router-dom";


// test: 로그인 기능 구현 후 제거
sessionStorage.setItem("memberNo", "M000002");
const memberNo = sessionStorage.getItem('memberNo');
const title = `${ memberNo }님의 포인트 충전 페이지`;
export default function PointCharge() {
  const pointCharge = State('pointCharge', 0);
  const isLoaded = State('loaded', false)
  const navigate = useNavigate();

  useEffect(() => {
    isLoaded.set(true);
  }, []);

  const actions = {
    requestPointCharge: async () => {
      const url = `/api/members/${ memberNo }/point/charge`;
      const data = { amount: pointCharge.value };
      const response = await GZAPI.post(url, data);
      const result = response.data.result;
      if (result === 'SUCCESS') {
        alert('충전이 완료되었습니다.');
        navigate('/point');
      } else {
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    },
    inputChangeHandler: (e) => {
      const value = e.target.value.replace(/,/g, '');
      const numericValue = Number(value);
      if (!isNaN(numericValue)) {
        pointCharge.set(numericValue);
      }
    },
    addAmount: (amount) => {
      return () => {
        if (pointCharge.value + amount > 999_999) {
          alert('최대 충전 가능 금액을 초과했습니다.\n(최대 충전 가능 금액: 100만 원)');
          pointCharge.set(999_999);
          return;
        }
        pointCharge.set(pointCharge.value += amount);
      }
    },
  }


  if (!isLoaded.value) {
    return (
      <PointSection title={ title }>
        <div className="text-center">
          잠시만 기다려주세요..
        </div>
      </PointSection>
    );
  }
  return (
    <PointSection title={ title }>
      <div className="flex flex-grow justify-center">
        <PointInnerSection title={ "포인트 충전하기" }>
          <div className="relative flex w-full justify-end">
            <input onChange={ actions.inputChangeHandler }
                   className="w-1/2 h-16
                              border-2 border-gray-300 rounded-xl
                              p-4 pl-6
                              text-2xl"
                   value={ formatNumber(pointCharge.value) }
                   maxLength="7"
            />
            <span className="absolute inset-y-4 right-4 text-2xl">\</span>
          </div>
          <div className="flex justify-end">
            <button onClick={ actions.addAmount(10_000) }
                    className="box-border border-2 rounded-xl px-2 py-1 bg-gray-300">+1만
            </button>
            <button onClick={ actions.addAmount(30_000) }
                    className="box-border border-2 rounded-xl px-2 py-1 bg-gray-300">+3만
            </button>
            <button onClick={ actions.addAmount(50_000) }
                    className="box-border border-2 rounded-xl px-2 py-1 bg-gray-300">+5만
            </button>
            <button onClick={ actions.addAmount(100_000) }
                    className="box-border border-2 rounded-xl px-2 py-1 bg-gray-300">+10만
            </button>
            <button onClick={ actions.requestPointCharge }
                    className="box-border border-2 rounded-xl px-4 py-2 bg-gray-400">!충전
            </button>
          </div>
        </PointInnerSection>
      </div>
    </PointSection>
  );
}
