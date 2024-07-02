import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import ModalLogin from "../components/modal/ModalLogin";
import ModalSignup from "../components/modal/ModalRegister";
import AuthStore from "../utils/zustand/AuthStore";
import ModalStore from "../utils/zustand/ModalStore";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import logo from "../../src/assets/logo/GZlogo.PNG";
import MyDropdownMenu from "../components/menu/MyDropdownMenu";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function LayoutHeader() {
  const { isLogin, statusLogout, statusLogin, setIsLogin } = AuthStore();
  const {
    isModalOpen,
    isRegisterModalOpen,
    setIsModalOpen,
    setIsRegisterModalOpen,
  } = ModalStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(null);
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

  return (
    <div className="shadow-md z-10">
      <div className="flex items-center h-16 relative">
        <div className="flex items-center max-w-5xl mx-auto gap-4 justify-between flex-wrap w-full">
          <Link className="text-2xl whitespace-nowrap" to="/">
            <img alt="logo" src={logo} className="h-10 pr-20" />
          </Link>
          <div className="flex flex-grow justify-start text-[15px] whitespace-nowrap font-semibold relative py-2">
            <div
              ref={borderRef}
              className="absolute bottom-0 h-0.5 bg-red-600 transition-all duration-300"
              style={{ width: "0px", transform: "translateX(0px)" }}
            ></div>
            <Link
              onMouseEnter={handleTabHover}
              onMouseLeave={handleTabLeave}
              className="hover:text-red-600 px-5"
              to="/board/list"
            >
              게시판
            </Link>
            <div className="px-8"></div>
            <Link
              onMouseEnter={handleTabHover}
              onMouseLeave={handleTabLeave}
              className="hover:text-red-600 px-5"
              to="/"
            >
              파티
            </Link>
            <div className="px-8"></div>
            <Link
              onMouseEnter={handleTabHover}
              onMouseLeave={handleTabLeave}
              className="hover:text-red-600 px-5"
              to="/announce"
            >
              공지사항
            </Link>
          </div>
          <button
            onClick={() => navigate("/board/list")}
            className="flex items-center bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 whitespace-nowrap"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            검색
          </button>

          <div className="flex items-center">
            {isLogin ? (
              <div className="flex items-center whitespace-nowrap">
                <button
                  onClick={() => navigate("/board/write/:memberNo")}
                  className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-black whitespace-nowrap"
                >
                  <PencilIcon className="w-5 h-5 mr-2" />
                  글쓰기
                </button>
                <div className="relative inline-block">
                  <button
                    onClick={toggleDropdown}
                    className="p-2 text-black rounded"
                  >
                    <UserCircleIcon className="w-10 h-10 text-gray-500" />
                  </button>
                  <MyDropdownMenu
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center whitespace-nowrap">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-[14px] bg-white text-gray-500 px-2 py-1 rounded-lg hover:bg-gray-200"
                >
                  로그인
                </button>
                <span className="text-[10px] text-blue-500 px-1">/</span>
                <button
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
  );
}
