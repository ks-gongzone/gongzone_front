import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthStore from "../../utils/zustand/AuthStore";
import sample1 from "../../assets/images/sample1.PNG";
import { DropDownAPI } from "../../utils/repository";

/**
 * @수정일: 2024-07-10
 * @수정내용: 드롭다운 박스 노출 시 데이터 로드
 */
export default function MyDropdownMenu({ isOpen, onClose }) {
  const { userInfo } = AuthStore((state) => ({ userInfo: state.userInfo }));
  const { memberNo, pointNo } = userInfo;
  const { statusLogout } = AuthStore();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropDownData, setDropDownData] = useState({
    memberNo: "",
    memberName: "",
    pointNo: "",
    memberPoint: 0,
  });

  const handleLogout = () => {
    statusLogout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      console.log("memberNo", memberNo);
      console.log("pointNo", pointNo);
      // 2024-07-10 한동환 추가
      if (memberNo && pointNo) {
        DropDownAPI.getDropDownData(memberNo)
          .then((data) => {
            console.log("데이터 받는 형식: ", data);
            setDropDownData(data);
          })
          .catch((error) => {
            console.error("드롭다운 메뉴 로드 중 에러발생", error);
          });
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, memberNo, pointNo]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 mt-2 w-[20em] bg-white rounded-md shadow-lg z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="absolute top-[-0.5rem] right-[1.5rem] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
      <div className="flex justify-end w-full">
        <button
          type="button"
          className="text-[13px] rounded-xl bg-gray-400 text-white mt-3 mr-3 py-1 px-4"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
      <div className="flex items-center px-8">
        <Link to="/myPage/point" className="flex items-center">
          <img
            className="w-20 h-20 rounded-full"
            src={sample1}
            alt="User avatar"
          />
          <div className="ml-3">
            <div className="text-gray-900 font-semibold">
              {dropDownData.memberName}
            </div>
            <p className="text-red-500 text-sm mt-2">보유 포인트</p>
            <div className="flex justify-between">
              <div className="flex w-[8em] rounded-lg justify-end items-center pr-4 text-[13px]">
                {dropDownData.memberPoint}P
              </div>
              <button
                type="button"
                className="ml-4 px-2 py-1 rounded-lg bg-red-200 hover:font-semibold hover:bg-red-400"
              >
                충전
              </button>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="w-[18em] pt-8 border-gray-200 border-b" />
      </div>
      <div className="px-8 pt-8">
        <div className="font-semibold text-gray-900">내 정보</div>
        <div className="flex justify-between items-center border rounded-lg mt-4 py-1 px-8">
          <button
            onClick={() => navigate("/myPage")}
            type="button"
            className="hover:font-semibold text-[12px]"
          >
            마이페이지
          </button>
          <div className="h-4 border-l" />
          <button type="button" className="hover:font-semibold text-[12px]">
            모임 현황
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[18em] pt-8 border-gray-200 border-b" />
      </div>
      <div className="px-8 pt-8">
        <div className="font-semibold text-gray-900">신규 알림 (2)</div>
        <div className="mt-2">
          <button
            type="button"
            className="w-full text-left text-gray-500 break-words overflow-hidden"
          >
            [쪽지] 안녕하세요
          </button>
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="w-full text-left text-gray-500 break-words overflow-hidden"
          >
            [공지] 공지사항
          </button>
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="w-full text-left text-blue-500 text-[12px]"
          >
            이 외 0개의 메시지가 있습니다.
          </button>
        </div>
      </div>
      <button
        type="button"
        className="w-full text-right text-[13px] mt-4 pr-4 text-red-500"
        onClick={onClose}
      >
        확인하러 가기 &gt;
      </button>

      <div className="p-4 "></div>
    </div>
  );
}
