import axios from "axios";

const GZAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // API의 기본 URL을 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 아래 주석은 예시 -> 디벨롭해서 개발이 필요합니다.
// const Token = window.localStorage.getItem("accessToken") || null;
// login token
GZAPI.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem("accessToken");
      if (token) {
        //console.log(token);
        config.headers["Authorization"] = `Bearer ${ token }`;
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

/*GZAPI.interceptors.response.use(
    (response) => response,
    (error) => {
      //console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          window.localStorage.removeItem("accessToken");
          const url = window.location.href;
          window.localStorage.setItem("redirect", url);
          //window.location.href = "/";
        }
      }
      // error.response -> error로 변경
      return Promise.reject(error);
    }
);*/

GZAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const firstRequest = error.config;


    if (error.response && error.response.status === 401 && !firstRequest._retry) {
      firstRequest._retry = true;

      const refreshToken = window.localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/refresh`, {
            refreshToken: refreshToken,
          });

          if (response.status === 200) {
            const newAccessToken = response.data.newAccessToken;
            window.localStorage.setItem("accessToken", newAccessToken);
            firstRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(firstRequest);
          }
        } catch (err) {
          console.error("리프레시 토큰 요청 실패", err);
          // 토큰이 유효하지 않거나 다른 이유로 실패한 경우, 사용자 로그아웃 처리
          handleLogout();
        }
      } else {
        // 리프레시 토큰이 없는 경우, 사용자 로그아웃 처리
        handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

function handleLogout() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.setItem("redirect", window.location.href);
  window.location.href = "/login";
}

export default GZAPI;
