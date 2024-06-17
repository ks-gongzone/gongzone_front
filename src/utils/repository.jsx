import GZAPI from "./api";

// 해당 파일은 간단한 엑시오스 호출 함수 예시로
// 사용하고자 하는 컴포넌트에서 import 하여 사용할 수 있음

// post, get, patch 형태 API의 예제를 작성해 두었으며
// then, catch 처리가 되어있으므로 각 컴포넌트에서는 try, catch 문을 따로 작성하지 않아도 됨
// 실제 사용 시에는 경로 위치에 작업한 RestAPI 호출 주소를 삽입하여 사용할 수 있음

export const Auth = {
  Login: async (data) => {
    return GZAPI.post("/api/login", data)
      .then((res) => res)
      .catch((err) => err);
  },
  Naver: async () => {
    return GZAPI.get("/auth/naver")
      .then((res) => res)
      .catch((err) => err);
  },
  Register: async (data) => {
    return GZAPI.post('/api/register', data)
      .then((res) => res)
      .catch((err) => err);
  }
};

export const User = {
  GetMe: async () => {
    return GZAPI.get("/user/me")
      .then((res) => res)
      .catch((err) => err);
  },
  EditMe: async (data) => {
    return GZAPI.patch("/user/me", data)
      .then((res) => res)
      .catch((err) => err);
  },
};
