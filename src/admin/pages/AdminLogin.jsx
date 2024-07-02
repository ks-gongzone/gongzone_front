import { useState } from "react";
import AuthStore from "../../utils/zustand/AuthStore";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { statusLogin } = AuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginRequest = { loginId, loginPw };
    const response = await statusLogin(loginRequest);

    if (response && response.error) {
      setErrorMessage(response.error);
    } else if (response && response.memberNo === "M000001") {
      setErrorMessage("");
      navigate("/_admin/main");
    } else {
      setErrorMessage("관리자 권한이 없습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="text-xl font-bold mb-4 text-center">관리자 로그인</div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="loginId"
              className="block text-sm font-medium text-gray-700"
            >
              아이디
            </label>
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="loginPw"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="loginPw"
              value={loginPw}
              onChange={(e) => setLoginPw(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
          <div className="flex justify-between items-center mt-4">
            <div>
              <button type="submit" className="text-sm text-blue-500">
                로그인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
