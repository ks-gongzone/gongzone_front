import axios from "axios";

const GZAPI = axios.create({
  baseURL: "http://localhost:8080/", // API의 기본 URL을 설정
  headers: {
    'Content-Type' : 'application/json'
  }
});

// 아래 주석은 예시 -> 디벨롭해서 개발이 필요합니다.
// const Token = window.localStorage.getItem("accessToken") || null;
// login token
GZAPI.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      //console.log(token);
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// if (Token) {
//   GZAPI.defaults.headers.Authorization = "Bearer " + Token;
// }

GZAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    //console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        window.localStorage.removeItem("accessToken");
        const url = window.location.href;
        window.localStorage.setItem("redirect", url);
        //이 부분때문에 안돼서 일단 주석처리 해놨습니다
        window.location.href = "/";
      }
    }
    // error.response -> error로 변경
    return Promise.reject(error);
  }
);

export default GZAPI;
