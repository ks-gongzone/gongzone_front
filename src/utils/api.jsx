import axios from "axios";
import AuthStore from "./zustand/AuthStore";

const GZAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // API의 기본 URL을 설정
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
        const refreshToken = window.localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await axios.post('https://gongzone.shop/home/api/refresh', {
              refreshToken: refreshToken,
            });

            if (response.status === 200) {
              const newAccessToken = response.data.newAccessToken;
              window.localStorage.setItem("accessToken", newAccessToken);
              firstRequest.headers["Authorization"] = `Bearer ${ newAccessToken }`;
              return axios(firstRequest);
            } else {
              handleLogout()
            }
          } catch (err) {
            handleLogout()
          }
        } else {
          handleLogout()
        }
      } else {
        await handleLogout();
      }
    }

    // 404 Not Found 처리
    if (error.response && error.response.status === 404) {
      console.error("404 Not Found", error.response);
      alert("페이지를 찾을 수 없습니다.");
      setTimeout(() => {
        window.history.back();
      }, 1000);
    }

    return Promise.reject(error);
  }
);

async function handleLogout() {
  const userAgent = navigator.userAgent;
  const data = { userAgent };

  await AuthStore.getState().statusLogout(data);

  window.location.href = "/home";
}

export default GZAPI;
