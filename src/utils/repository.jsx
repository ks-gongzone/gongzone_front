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
      const { token, refreshToken, tokenExpiresIn } = response.data;
      console.log("Login response data: ", response.data);
      console.log("Login successful. Access token expires at: ", new Date(tokenExpiresIn));

      window.localStorage.setItem("accessToken", token);
      window.localStorage.setItem("refreshToken", refreshToken);
      window.localStorage.setItem("tokenExpiresIn", tokenExpiresIn);
      return response.data; // response.data 반환
    } catch (err) {
      if (err.response.status === 403) {
        return { error: "제재 되었거나 탈퇴된 계정입니다." }
      } else if(err.response.status === 410) {
        return { error: "휴면 계정입니다." }
      }

        const errorMessage =
          err.response && err.response.data && err.response.data.errorMessage
            ? err.response.data.errorMessage
            : "로그인 중 오류가 발생했습니다.";
      return { error: errorMessage };
    }
  },
  Naver: async (code, state) => {
    try {
      console.log("Sending Axios request with code:", code, "and state:", state);
      const response = await GZAPI.post('/api/naver/token', { code, state });
      console.log("response  : ", response);
      console.log("response.data  : ", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        return { error: "제재 되었거나 탈퇴된 계정입니다." }
      } else if(error.response.status === 410) {
        return { error: "휴면 계정입니다." }
      }
      console.error("Error in Axios request:", error);
      const errorMessage = error.response ? error.response.data : error.message;

      return { error: errorMessage };
    }
  },
  Google: async (code, state) => {
    try {
      console.log("Sending Axios request with code:", code, "and state:", state);
      const response = await GZAPI.post('/api/google/token', { code, state });
      console.log("response  : ", response);
      console.log("response.data  : ", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        return { error: "제재 되었거나 탈퇴된 계정입니다." }
      } else if(error.response.status === 410) {
        return { error: "휴면 계정입니다." }
      }
      console.error("Error in Axios request:", error);
      const errorMessage = error.response ? error.response.data : error.message;

      return { error: errorMessage };
    }
  },
  Kakao: async (code, state) => {
    try {
      console.log("Sending Axios request with code:", code, "and state:", state);
      const response = await GZAPI.post('/api/kakao/token', { code, state });
      console.log("response  : ", response);
      console.log("response.data  : ", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        return { error: "제재 되었거나 탈퇴된 계정입니다." }
      } else if(error.response.status === 410) {
        return { error: "휴면 계정입니다." }
      }
      console.error("Error in Axios request:", error);
      const errorMessage = error.response ? error.response.data : error.message;

      return { error: errorMessage };
    }
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

export const UpdateNickname = (memberNo, nickname) => {
  return GZAPI.post(`/api/members/${memberNo}/nickname`, { newMemberNick: nickname })
    .then(response => response.data)
    .catch(error => {
      console.error("닉네임 업데이트 중 오류 발생", error)
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
  .then((response) => {
    console.log('받은데이터', response.data);
    return response.data})
  .catch((error) => {
    console.error("알림 정보 로드 중 에러 발생", error);
    throw error;
  });
};

export const UpdateAlertSetting = (memberNo, alertData) => {
  return GZAPI.post(`/api/members/${memberNo}/alerts/update`, alertData)
  .then((response) => response.data)
  .catch((error) => {
    console.error("알림 정보 로드 중 에러 발생", error);
    throw error;
  });
};

export const InsertAlertSetting = (memberNo, alertData) => {
  return GZAPI.post(`/api/members/${memberNo}/alerts/insert`, alertData)
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

/**
 * @작성자: 한동환
 * @내용: 공지사항 type_code값에 따라 다른 통신
 */
export const AnnounceAPI = {
  getAnnouncements: async (page = 1, size = 10, type = "") => {
    const params = new URLSearchParams({ page, size });
    if (type) params.append("type", type);
    return GZAPI.get(`/api/announce?${params.toString()}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching announcements:", err);
        throw err;
      });
  },
  getAnnouncementDetail: async (announceNo) => {
    if(!announceNo) {
      throw new Error("공지사항 번호가 없습니다.");
    }
    return GZAPI.get(`/api/announce/detail/${announceNo}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("공지사항 세부조회중 에러 발생[API]", error)
        throw error;
      });
  },
  incrementAnnounceViews: async (announceNo, navigate) => {
    console.log("클릭 annonuceNo: ", announceNo);
    return GZAPI.post(`/api/announce/${announceNo}/increment`)
      .then((response) => {
        console.log("조회수 증가 성공", response);
        navigate(`/announce/detail/${announceNo}`);
        return response.data;
      })
      .catch((error) => {
        console.error("조회수 증가 실패", error);
        throw error;
      });
  },

  // 관리자 기능에 해당하여 /api/admin/announce로 변경
  createAnnouncement: (announcementData) => {
    const { memberNo, announceTitle, announceBody, typeCode } = announcementData;

    if (!memberNo || !announceTitle || !announceBody || !typeCode) {
      console.log(memberNo)
      console.log(announceTitle)
      console.log(announceBody)
      console.log(typeCode)
      return Promise.reject(new Error("필수 필드가 누락되었습니다."));
    }
    return GZAPI.post("/api/_admin/announce/write", { memberNo, announceTitle, announceBody, typeCodeDes: typeCode })
      .then((response) => response.data)
      .catch((error) => {
        console.error("공지사항 작성 중 에러 발생[API]", error);
        throw error;
      });
  },
  updateAnnouncement: (announceNo, announcementData) => {
    return GZAPI.put(`/api/_admin/main/announce/${announceNo}`, announcementData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("공지사항 수정 중 에러 발생[API]", error);
      throw error;
    });
  },
  deleteAnnouncement: (announceNo) => {
    return GZAPI.delete(`/api/_admin/main/announce/${announceNo}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("공지사항 삭제 중 에러 발생[API]", error);
        throw error;
      });
  },
};

export const MemberAPI = {
  Register: async (data) => {
    return GZAPI.post("/api/register", data)
      .then((res) => res)
      .catch((err) => err);
  },
  CheckId: async (data) => {
    return GZAPI.post("/api/check/Id", data)
      .then((res) => res.data)
      .catch((err) => err);
  },
  CheckEmail: async (data) => {
    return GZAPI.post("/api/check/Email", data)
      .then((res) => res.data)
      .catch((err) => err);
  },
};
