import { Link } from "react-router-dom";
import logo from "../../src/assets/logo/GONGZONE_logo_blue.png";
import QuestionModal from "../components/modal/QuestionModal";

export default function LayoutFooter() {
  return (
    <div className="bg-white">
      <div className="flex flex-col md:flex-row items-start md:items-center h-auto md:h-80 justify-between max-w-5xl mx-auto p-4 md:p-0">
        <div className="flex flex-col gap-2 mb-4 md:mb-0">
          <Link className="whitespace-nowrap" to="/home">
            <img alt="logo" src={logo} className="h-10 pr-0 md:pr-20" />
          </Link>
          <QuestionModal />

          <Link
            to="mailto:hanokfairy@gmail.com"
            className="text-xs text-gray-500 hover:underline"
          >
            운영자 문의
          </Link>
          <Link
            to="mailto:hanokfairy@gmail.com"
            className="text-xs text-gray-500 hover:underline"
          >
            제휴문의
          </Link>
        </div>
        <div className="flex flex-wrap justify-between gap-10 md:gap-20 w-full md:w-auto">
          <div className="flex flex-col gap-3">
            <div className="font-bold">바로가기</div>
            <div className="flex flex-col gap-2">
              <Link
                to="/board/list"
                className="text-xs text-gray-500 hover:underline"
              >
                게시판
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">이용안내</div>
            <div className="flex flex-col gap-2">
              <Link
                to="/announce"
                className="text-xs text-gray-500 hover:underline"
              >
                공지사항
              </Link>
              <Link
                to="/announce"
                className="text-xs text-gray-500 hover:underline"
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">관련 사이트</div>
            <div className="flex flex-col gap-2">
              <Link className="text-xs text-gray-500 hover:underline">
                네이버 블로그
              </Link>
              <Link className="text-xs text-gray-500 hover:underline">
                티스토리 블로그
              </Link>
              <Link className="text-xs text-gray-500 hover:underline">
                인스타그램
              </Link>
              <Link className="text-xs text-gray-500 hover:underline">
                Velog
              </Link>
              <Link className="text-xs text-gray-500 hover:underline">
                Medium
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">서비스약관</div>
            <div className="flex flex-col gap-2">
              <Link className="text-xs text-gray-500 hover:underline">
                서비스 이용약관
              </Link>
              <Link className="text-xs text-gray-500 hover:underline">
                개인정보취급방침
              </Link>
              <Link className="text-xs text-gray-500 hover:underline">
                전자금융거래약관
              </Link>
              <Link className="text-xs text-gray-500 hover:underline">
                결제/환불약관
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="flex flex-col lg:flex-row h-auto lg:h-60 max-w-5xl mx-auto py-7 justify-between items-start lg:items-center px-4 lg:px-0">
          <div className="text-xs ">
            <div>[지존팀]</div>
            <div className="flex gap-2">
              <span>대표자 : 고윤영</span>
            </div>
            <div className="flex gap-2">
              <span>개인정보담당자 : 고윤영</span> |{" "}
              <span>이메일 : hanokfairy@gmail.com</span>
            </div>
            <div className="flex gap-2">
              <span>광고/서비스문의</span> |{" "}
              <span>이메일 : hanokfairy@gmail.com</span>
            </div>
            <br />
            All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
