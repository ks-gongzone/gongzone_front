import axios from "axios";

const GZAPI = axios.create({
  baseURL: "http://localhost:8088/", // API의 기본 URL을 설정
  headers: {
    "Content-Type": "application/json",
  },
});

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

GZAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const firstRequest = error.config;

    if (error.response && error.response.status === 401 && !firstRequest._retry) {
      firstRequest._retry = true;

      const tokenExpired = error.response.headers["token-expired"];
      if (tokenExpired) {
        console.log("tokenExpired 들어옴", tokenExpired);
        const refreshToken = window.localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            console.log("Attempting to refresh token with refresh token: ", refreshToken);
            const response = await axios.post('http://localhost:8088/api/refresh', {
              refreshToken: refreshToken,
            });

            if (response.status === 200) {
              const newAccessToken = response.data.newAccessToken;
              console.log("리프레시 토큰 요청 성공", newAccessToken);
              window.localStorage.setItem("accessToken", newAccessToken);
              firstRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axios(firstRequest);
            } else {
              console.error("리프레시 토큰 요청 실패", response);
              handleLogout();
            }
          } catch (err) {
            console.error("리프레시 토큰 요청 실패", err);
            handleLogout();
          }
        } else {
          handleLogout();
        }
      }
    }

    // 404 Not Found 처리
    if (error.response && error.response.status === 404) {
      console.error("404 Not Found", error.response);
      window.location.href = "/404";
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
