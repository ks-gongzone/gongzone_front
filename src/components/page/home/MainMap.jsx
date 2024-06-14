export default function MainMap() {
  return (
    <div>
      <div className="w-[1000px] mx-auto mb-6 text-lg font-bold text-[#526688] mt-14">
        내 주변 모임
      </div>
      {/* 추후 지도 API 통해서 지도 출력 예정 */}
      <div className="w-[1000px] h-[600px] mx-auto bg-gray-400"></div>
    </div>
  );
}
