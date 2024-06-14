import axios from "axios";

const GZAPI = axios.create({
  baseURL: "http://localhost:3000/", // API의 기본 URL을 설정
});

// 아래 주석은 예시 -> 디벨롭해서 개발이 필요합니다.
// const Token = window.localStorage.getItem("accessToken") || null;

// if (Token) {
//   GZAPI.defaults.headers.Authorization = "Bearer " + Token;
// }

GZAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        window.localStorage.removeItem("accessToken");
        const url = window.location.href;
        window.localStorage.setItem("redirect", url);
        window.location.href = "/";
      }
    }
    return Promise.reject(error.response);
  }
);

export default GZAPI;
