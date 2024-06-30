import { useNavigate } from "react-router-dom";

export default function AnnounceDetailWrapper() {
  const navigate = useNavigate();

  return (
    <div className="flex w-[1150px] justify-between pt-12 pb-5">
      <div className="text-[2vw]">공지사항</div>
      <button
        type="button"
        className="flex h-[50px] items-center border-2 px-4 shadow-sm hover:bg-gray-100"
        onClick={() => navigate("/announce")}
      >
        <div className="mr-2">≡</div>목록가기
      </button>
    </div>
  );
}
