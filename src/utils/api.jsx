import axios from "axios";

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
            const response = await axios.post('http://localhost:8088/api/refresh', {
              refreshToken: refreshToken,
            });

            if (response.status === 200) {
              const newAccessToken = response.data.newAccessToken;
              window.localStorage.setItem("accessToken", newAccessToken);
              firstRequest.headers["Authorization"] = `Bearer ${ newAccessToken }`;
              return axios(firstRequest);
            } else {
              handleLogout();
            }
          } catch (err) {
            handleLogout();
          }
        } else {
          handleLogout();
        }
      } else {
        showLoginAlertModal();
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

function handleLogout() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.location.href = "/home";
  window.localStorage.setItem("redirect", window.location.href);
}

function showLoginAlertModal() {
  const event = new Event('showLoginAlertModal');
  window.dispatchEvent(event);
}

export default GZAPI;
