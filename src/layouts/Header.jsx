import { Link } from "react-router-dom";
import SearchBar from "../components/page/home/SearchBar";
import { useEffect } from "react";
import ModalLogin from "../components/modal/ModalLogin";
import ModalSignup from "../components/modal/ModalRegister";
import AuthStore from "../utils/zustand/AuthStore";
import ModalStore from "../utils/zustand/ModalStore";

export default function LayoutHeader() {
/*  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);*/

  const { isLogin, statusLogout, statusLogin, setIsLogin } = AuthStore();
  const { isModalOpen, isRegisterModalOpen, setIsModalOpen, setIsRegisterModalOpen } = ModalStore();

  //const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    }
  }, [setIsLogin]);
// setIsLogin
 /* const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const statusLogin = async (data) => {
    const response = await Auth.Login(data);
    if (response && response.accessToken) {
      setIsLogin(true);
      window.localStorage.setItem("accessToken", response.accessToken);
      closeModal();
      //navigate("/");
    } else {
      return response;
    }
  };

  const statusLogout = () => {
    //console.log("로그아웃");
    window.localStorage.removeItem("accessToken");
    setIsLogin(false);
  };*/

  return (
    <div className="shadow-md z-10">
      <div className="flex items-center h-16 px-20 justify-between">
        <div className="w-full flex items-center max-w-6xl mx-auto gap-20">
          <Link className="text-2xl" to="/">
            LOGO
          </Link>
          <div className="w-96 text-[15px] justify-around items-center flex">
            <Link className="hover:text-red-600" to="/board/list">
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
          <div>
            {isLogin ? (
              <button
                onClick={statusLogout}
                className="text-[10px] bg-white text-blue-500 px-4 py-2 rounded-lg"
              >
                로그아웃
              </button>
            ) : (
              <>
                <div className="flex items-center">
                  <button
                    onClick={setIsModalOpen(true)}
                    /*onClick={openModal}*/
                    className="text-[10px] bg-white text-blue-500 px-2 py-2 rounded-l-lg hover:bg-gray-200"
                  >
                    로그인
                  </button>
                  <span className="text-[10px] text-blue-500 px-1">/</span>
                  <button
                    onClick={setIsRegisterModalOpen(true)}
                    /*onClick={openRegisterModal}*/
                    className="text-[10px] bg-white text-blue-500 py-2 px-2 rounded-r-lg hover:bg-gray-200"
                  >
                    가입
                  </button>
                </div>
              </>
            )}
            <ModalLogin
              isOpen={isModalOpen}
              onClose={setIsModalOpen(false)}
              /*onClose={closeModal}*/
              onLogin={statusLogin}
            />
            <ModalSignup
              isOpen={isRegisterModalOpen}
              onClose={() => setIsRegisterModalOpen(false)}
              /*onClose={openModal}*/
            />
          </div>
        </div>
      </div>
    </div>
  );
}
