import axios from "axios";
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
      const errorMessage =
        err.response && err.response.data && err.response.data.errorMessage
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

export const Party = {
  PartyAccept: async (id) => {
    return GZAPI.get(`/api/party/accept/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },
};

export const Location = {
  LocationSearch: async (latitude, longitude) => {
    return GZAPI.get(
      `/api/location?latitude=${latitude}&longitude=${longitude}`
    )
      .then((res) => res.data)
      .catch((err) => {
        const errorMessage =
          err.response && err.response.data && err.response.data.errorMessage
            ? err.response.data.errorMessage
            : "위치 검색 중 오류가 발생했습니다.";
        return { error: errorMessage };
      });
  },
};

/**
 * MyPage통신
 * 작성자: 한동환
 * 내용: memberNo를 통해 유저 식별 후 서버와 통신
 */
export const ChangeUserInfo = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/memberInfo`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const MyBoard = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/board`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const MyParty = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/party`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const Myfollow = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/follow`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const BlockUser = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/blockUser`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const SaveUserData = (memberNo, userData) => {
  return GZAPI.post(`/api/members/${memberNo}/memberInfo`, userData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("데이터 저장 중 에러 발생", error);
      throw error;
    });
};

export const GetNickname = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/nickname`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("닉네임 로드 중 에러 발생", error);
      throw error;
    });
};

// DB에 존재하는 장소를 SELECT박스에 넣어둠
export const GetLocationData = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/locations`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("위치 데이터 로드 중 에러 발생", error);
      throw error;
    });
};

export const SaveAddress = (memberNo, address) => {
  return GZAPI.post(`/api/members/${memberNo}/locations`, {
    newMemberAddress: address,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("주소 저장 중 에러 발생", error);
      throw error;
    });
};

export const GetMemberInfo = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/memberInfo`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("회원 정보 로드 중 에러 발생", error);
      throw error;
    });
};

export const UpdatePassword = (memberNo, payload) => {
  return GZAPI.post(`/api/members/${memberNo}/password`, payload)
    .then((response) => response.data)
    .catch((error) => {
      console.error("비밀번호 변경 에러 발생", error);
      throw error;
    });
};

export const GetAlertSetting = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/alerts`)
  .then((response) => response.data)
  .catch((error) => {
    console.error("알림 정보 로드 중 에러 발생", error);
    throw error;
  });
};

export const UpdateAlertSetting = (memberNo, alertData) => {
  return GZAPI.get(`/api/members/${memberNo}/alerts/update`, alertData)
  .then((response) => response.data)
  .catch((error) => {
    console.error("알림 정보 로드 중 에러 발생", error);
    throw error;
  });
};

export const GetPhone = (memberNo) => {
  return GZAPI.get(`/api/members/${memberNo}/phone`)
  .then((response) => response.data)
  .catch((error) => {
    console.error("핸드폰 번호 조회 중 에러 발생", error);
    throw error;
  });
};

export const MemberAPI = {
  Register: async (data) => {
    return GZAPI.post("/api/register", data)
      .then((res) => res)
      .catch((err) => err);
  },
  Check: async (data) => {
    return GZAPI.post("/api/check", data)
      .then((res) => res.data)
      .catch((err) => err);
  },
};
