import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/home/SearchBar";
import { useState } from 'react';
import ModalLogin from "../components/modal/ModalLogin";
import { Auth } from "../utils/repository";

export default function LayoutHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const statusLogin = async (data) => {
    try {
      const response = await Auth.Login(data);
      if (response && response.status === 200) {
        setIsLogin(true);
        closeModal();
        navigate('/');
      } else {
        console.error('로그인 실패:', response.data);
      }
    } catch (err) {
      console.error('로그인 에러:', err);
    }
  };

  const statusLogout = () => {
    console.log('로그아웃')
    setIsLogin(false);
  };

  return (
    <div className="shadow-md z-10">
      <div className="flex items-center h-16 px-20 justify-between">
        <div className="w-full flex items-center max-w-6xl mx-auto gap-20">
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
            <SearchBar/>
          </div>
          <div>
            {isLogin ? (
              <button onClick={statusLogout} className="text-[10px] bg-white text-blue-500 px-4 py-2 rounded-lg">
                로그아웃
              </button>
            ) : (
            <button onClick={openModal} className="text-[10px] bg-white text-blue-500 px-4 py-2 rounded-lg">
              가입 / 로그인
            </button>
              )}
            <ModalLogin isOpen={isModalOpen} onClose={closeModal} onLogin={statusLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
