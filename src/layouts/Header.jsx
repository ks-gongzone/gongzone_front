import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ModalLogin from "../components/modal/ModalLogin";
import ModalSignup from "../components/modal/ModalRegister";
import AuthStore from "../utils/zustand/AuthStore";
import ModalStore from "../utils/zustand/ModalStore";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import logo from "../../src/assets/logo/GONGZONE_logo_blue.png";
import MyDropdownMenu from "../components/menu/MyDropdownMenu";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function LayoutHeader() {
  const { isLogin, statusLogout, statusLogin, setIsLogin } = AuthStore();
  const memberNo = AuthStore((state) => state.userInfo.memberNo);
  const {
    isModalOpen,
    isRegisterModalOpen,
    setIsModalOpen,
    setIsRegisterModalOpen,
  } = ModalStore();
  const navigate = useNavigate();
  const borderRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const handleTabHover = (e) => {
    const { offsetLeft, offsetWidth } = e.target;
    borderRef.current.style.transform = `translateX(${offsetLeft}px)`;
    borderRef.current.style.width = `${offsetWidth}px`;
  };

  const handleTabLeave = () => {
    borderRef.current.style.width = "0px";
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePartyClick = (e) => {
    if (!memberNo) {
      e.preventDefault();
      showLoginAlertModal();
    } else {
      navigate(`/party/detail/${memberNo}`);
    }
  };

  const showLoginAlertModal = () => {
    const event = new Event("showLoginAlertModal");
    window.dispatchEvent(event);
  };

  return (
    <div className="shadow-md z-50 sticky top-0 bg-white xl:h-20 lg:h-20 h-auto">
      <div className="flex flex-wrap items-center relative h-full">
        <div className="flex items-center max-w-5xl mx-auto gap-4 justify-between flex-wrap md: xl:flex-wrap w-full p-4 md:p-0">
          <Link className="text-2xl whitespace-nowrap" to="/home">
            <img alt="logo" src={logo} className="h-10" />
          </Link>
          <div className="flex flex-grow justify-start text-[15px] whitespace-nowrap font-semibold relative py-2">
            <div
              ref={borderRef}
              className="absolute bottom-0 h-0.5 bg-[#1d5091] transition-all duration-300"
              style={{ width: "0px", transform: "translateX(0px)" }}
            ></div>
            <Link
              onMouseEnter={handleTabHover}
              onMouseLeave={handleTabLeave}
              className="hover:text-[#1d5091] px-3 md:px-5"
              to="/board/list"
            >
              게시판
            </Link>
            <div className="px-4 md:px-8"></div>
            <button
              type="button"
              onMouseEnter={handleTabHover}
              onMouseLeave={handleTabLeave}
              className="hover:text-[#1d5091] px-3 md:px-5"
              onClick={handlePartyClick}
            >
              파티
            </button>
            <div className="px-4 md:px-8"></div>
            <Link
              onMouseEnter={handleTabHover}
              onMouseLeave={handleTabLeave}
              className="hover:text-[#1d5091] px-3 md:px-5"
              to="/announce"
            >
              공지사항
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                navigate("/board/list");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="flex items-center bg-[#6ea2d4] text-white px-4 py-2 mr-2 rounded-md hover:bg-[#14396a] whitespace-nowrap text-xs gap-2"
            >
              검색
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center">
              {isLogin ? (
                <div className="flex items-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/board/write/${memberNo}`);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="flex items-center bg-[#1d5091] text-white px-4 py-2 rounded-md hover:bg-[#0d2544] whitespace-nowrap gap-2 text-xs"
                  >
                    글쓰기
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <div className="relative inline-block">
                    <button
                      onClick={toggleDropdown}
                      className="p-2 text-black rounded"
                      type="button"
                    >
                      <UserCircleIcon className="w-10 h-10 text-[#1d5091]" />
                    </button>
                    <MyDropdownMenu
                      isOpen={isOpen}
                      onClose={() => setIsOpen(false)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center whitespace-nowrap ">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="text-[14px] bg-white text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-200"
                  >
                    로그인
                  </button>
                  <span className="text-[10px] text-blue-500 px-1">/</span>
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="text-[14px] bg-white text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-200"
                  >
                    가입
                  </button>
                </div>
              )}
              <ModalLogin
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLogin={statusLogin}
              />
              <ModalSignup
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
