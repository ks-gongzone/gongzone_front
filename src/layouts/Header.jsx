import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function LayoutHeader() {
  return (
    <div className="shadow-md z-10">
      <div className="flex items-center h-16 px-20 justify-between">
        <div className="w-full flex items-center max-w-5xl mx-auto gap-20">
          <Link className="text-2xl" to="/">
            LOGO
          </Link>
          <div className="w-96 text-[15px] justify-around items-center flex">
            <Link className="hover:text-red-600" to="/">
              게시판
            </Link>
            <Link className="hover:text-red-600" to="/">
              파티
            </Link>
            <Link className="hover:text-red-600" to="/">
              공지사항
            </Link>
          </div>
          <div>
            <SearchBar />
          </div>
          <div className="text-[10px]">가입 / 로그인</div>
        </div>
      </div>
    </div>
  );
}
