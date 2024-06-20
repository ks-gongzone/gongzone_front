// 숫자 포맷팅 함수 - 3자리 단위로 끊어준다.
export function formatNumber(number) {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(number);
}
