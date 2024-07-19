import LayoutHeader from "../../layouts/Header";
import logo from "../../assets/logo/GONGZONE_logo_blue.png";

export default function ErrorPage() {
  return (
    <div className="h-screen bg-gray-100">
      <LayoutHeader />
      <div className="flex flex-col h-[80%] h-auto justify-center items-center">
        <div>
          <img className="w-[20em] p-2 rounded-2xl" src={logo} alt="logo" />
        </div>
        <div className="font-bold text-gray-700 text-2xl mb-6 mt-5">
          원하시는 페이지를 찾을 수 없습니다.
        </div>
        <div className="text-gray-500 mb-2">
          찾으려는 페이지의 주소가 잘못 입력되었거나,
        </div>
        <div className="text-gray-500 mb-2">
          주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
        </div>
        <div className="text-gray-500 mb-2">
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
        </div>
        <button
          className="bg-[#299c9f] text-white text-xl py-4 px-10 mt-8 rounded-xl flex items-center justify-center"
          onClick={() => window.history.back()}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
