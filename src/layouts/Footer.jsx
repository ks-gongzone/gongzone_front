import { Link } from "react-router-dom";
import logo from "../../src/assets/logo/GZlogo.PNG";

export default function LayoutFooter() {
  return (
    <div>
      <div className="flex items-center h-80 justify-between max-w-5xl mx-auto">
        <div className="flex flex-col gap-2">
          <Link className="whitespace-nowrap" to="/home">
            <img alt="logo" src={logo} className="h-10 pr-20" />
          </Link>
          <br></br>
          <div className="text-[13px]">1:1 문의</div>
          <div className="text-[13px]">운영자 상담</div>
          <div className="text-[13px]">오픈 챗</div>
          <div className="text-[13px]">제휴문의</div>
        </div>
        <div className="gap-20 flex justify-between">
          <div className="flex flex-col gap-3">
            <div className="font-bold">바로가기</div>
            <div className="flex flex-col gap-1">
              <Link className="text-[14px]">게시판</Link>
              <Link className="text-[14px]">파티</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">이용안내</div>
            <div className="flex flex-col gap-1">
              <Link className="text-[14px]">공지사항</Link>
              <Link className="text-[14px]">FAQ</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">관련사이트</div>
            <div className="flex flex-col gap-1">
              <Link className="text-[14px]">네이버 블로그</Link>
              <Link className="text-[14px]">티스토리 블로그</Link>
              <Link className="text-[14px]">인스타그램</Link>
              <Link className="text-[14px]">Velog</Link>
              <Link className="text-[14px]">Medium</Link>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold">서비스약관</div>
            <div className="flex flex-col gap-1">
              <Link className="text-[14px]">서비스 이용약관</Link>
              <Link className="text-[14px]">개인정보취급방침</Link>
              <Link className="text-[14px]">전자금융거래약관</Link>
              <Link className="text-[14px]">결제/환불약관</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="flex h-60 max-w-5xl mx-auto py-7 justify-between">
          <div className=" text-[13px] py-10">
            개인정보담당자 : 고윤영 hanokfairy@gmail.com Copyright 2024
            GONGZONE.
            <br></br>
            <br></br>
            All rights reserved.
          </div>
          <div className="py-7">
            <div className="text-2xl">Google</div>
            <div className="text-2xl">App Store</div>
          </div>
        </div>
      </div>
    </div>
  );
}
