import GZAPI from "./api";

// 해당 파일은 간단한 엑시오스 호출 함수 예시로
// 사용하고자 하는 컴포넌트에서 import 하여 사용할 수 있음

// post, get, patch 형태 API의 예제를 작성해 두었으며
// then, catch 처리가 되어있으므로 각 컴포넌트에서는 try, catch 문을 따로 작성하지 않아도 됨
// 실제 사용 시에는 경로 위치에 작업한 RestAPI 호출 주소를 삽입하여 사용할 수 있음

export const Auth = {
  Login: async (data) => {
    try {
      const response = await GZAPI.post("/api/login", data);
      return response.data; // response.data 반환
    } catch (err) {
      const errorMessage = err.response && err.response.data && err.response.data.errorMessage
        ? err.response.data.errorMessage
        : "로그인 중 오류가 발생했습니다.";
      return { error: errorMessage };
    }
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

/**
 * MyPage통신
 * 작성자: 한동환
 * 내용: memberNo를 통해 유저 식별 후 서버와 통신
 */
export const ChangeUserInfo = (memberNo) => {
  return GZAPI.get(`/api/myPage/${memberNo}/memberInfo`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const MyBoard = (memberNo) => {
  return GZAPI.get(`/api/myPage/${memberNo}/board`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const MyParty = (memberNo) => {
  return GZAPI.get(`/api/myPage/${memberNo}/party`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const MyPoint = (memberNo) => {
  return GZAPI.get(`/api/myPage/${memberNo}/point`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const Myfollow = (memberNo) => {
  return GZAPI.get(`/api/myPage/${memberNo}/follow`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const BlockUser = (memberNo) => {
  return GZAPI.get(`/api/myPage/${memberNo}/blockUser`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const SaveUserData = (memberNo, userData) => {
  return GZAPI.post(`/api/myPage/${memberNo}/memberInfo`, userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 저장 중 에러 발생", error);
      throw error;
    });
};
