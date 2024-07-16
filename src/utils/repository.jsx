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
      console.log(
        "Login successful. Access token expires at: ",
        new Date(tokenExpiresIn)
      );

      window.localStorage.setItem("accessToken", token);
      window.localStorage.setItem("refreshToken", refreshToken);
      window.localStorage.setItem("tokenExpiresIn", tokenExpiresIn);
      return response.data; // response.data 반환
    } catch (err) {
      if (err.response.status === 403) {
        return { error: "제재 되었거나 탈퇴된 계정입니다." };
      } else if (err.response.status === 410) {
        return { error: "휴면 계정입니다." };
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
      console.log(
        "Sending Axios request with code:",
        code,
        "and state:",
        state
      );
      const response = await GZAPI.post("/api/naver/token", { code, state });
      console.log("response  : ", response);
      console.log("response.data  : ", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        return { error: "제재 되었거나 탈퇴된 계정입니다." };
      } else if (error.response.status === 410) {
        return { error: "휴면 계정입니다." };
      }
      console.error("Error in Axios request:", error);
      const errorMessage = error.response ? error.response.data : error.message;

      return { error: errorMessage };
    }
  },
  Google: async (code, state) => {
    try {
      console.log(
        "Sending Axios request with code:",
        code,
        "and state:",
        state
      );
      const response = await GZAPI.post("/api/google/token", { code, state });
      console.log("response  : ", response);
      console.log("response.data  : ", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        return { error: "제재 되었거나 탈퇴된 계정입니다." };
      } else if (error.response.status === 410) {
        return { error: "휴면 계정입니다." };
      }
      console.error("Error in Axios request:", error);
      const errorMessage = error.response ? error.response.data : error.message;

      return { error: errorMessage };
    }
  },
  Kakao: async (code, state) => {
    try {
      console.log(
        "Sending Axios request with code:",
        code,
        "and state:",
        state
      );
      const response = await GZAPI.post("/api/kakao/token", { code, state });
      console.log("response  : ", response);
      console.log("response.data  : ", response.data);
      return response.data;
    } catch (error) {
      if (error.response.status === 403) {
        return { error: "제재 되었거나 탈퇴된 계정입니다." };
      } else if (error.response.status === 410) {
        return { error: "휴면 계정입니다." };
      }
      console.error("Error in Axios request:", error);
      const errorMessage = error.response ? error.response.data : error.message;

      return { error: errorMessage };
    }
  },
  Logout: async () => {
    return GZAPI.post("/api/logout")
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
    const url =
      id === "_admin" ? `/api/party/accept/_admin` : `/api/party/accept/${id}`;
    return GZAPI.get(url)
      .then((res) => res)
      .catch((err) => err);
  },
  HandleMember: async (id, partyNo, requestStatus) => {
    return GZAPI.post(`api/alertSSE/party/accept/${id}/Status`, {
      partyNo: partyNo,
      statusCode: requestStatus,
    })
      .then((res) => res)
      .catch((err) => err);
  },
  RequestJoin: async (id, partyNo, requestStatus, requestAmount) => {
    return GZAPI.post(`api/alertSSE/party/accept/${id}/Status`, {
      memberNo: id,
      partyNo: partyNo,
      statusCode: requestStatus,
      requestAmount: requestAmount,
    })
      .then((res) => res)
      .catch((err) => err);
  },
  PartyDetail: async (id) => {
    return GZAPI.get(`api/party/detail/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },
  CompleteParty: async (id) => {
    return GZAPI.post(`api/alertSSE/party/updateStatus/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },
  PurchaseInfo: async (memberNo, partyNo) => {
    return GZAPI.get(`api/party/purchase/${memberNo}/${partyNo}`)
      .then((res) => res)
      .catch((err) => err);
  },
  PartyPurchase: async (partyNo, memberNo, request) => {
    return GZAPI.post(`api/party/${partyNo}/purchase/${memberNo}`, request)
      .then((res) => res)
      .catch((err) => err);
  },
  InsertShipping: async (partyNo, shippingNo, request) => {
    return GZAPI.patch(`api/party/${partyNo}/shipping/${shippingNo}`, request)
      .then((res) => res)
      .catch((err) => err);
  },
  CompleteShipping: async (partyNo, shippingNo) => {
    return GZAPI.post(`api/party/${partyNo}/shipping/${shippingNo}/complete`)
      .then((res) => res)
      .catch((err) => err);
  },
  CompleteReception: async (partyNo, receptionNo, request) => {
    return GZAPI.patch(`api/party/${partyNo}/reception/${receptionNo}`, request)
      .then((res) => res)
      .catch((err) => err);
  },
  SettlementParty: async (partyNo) => {
    return GZAPI.post(`_admin/api/party/${partyNo}/settlement`)
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
  return GZAPI.post(`/api/members/${memberNo}/nickname`, {
    newMemberNick: nickname,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("닉네임 업데이트 중 오류 발생", error);
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
      console.log("받은데이터", response.data);
      return response.data;
    })
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

// 드롭다운 데이터 받기
export const DropDownAPI = {
  getDropDownData: async (memberNo) => {
    console.log("memberNo: ", memberNo);
    if (!memberNo) {
      throw new Error("회원 번호 또는 포인트 번호가 없습니다.");
    }
    return GZAPI.get(`/api/member/dropDown/${memberNo}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching drop down data:", error);
        throw error;
      });
  },
};
// 유저 리스트 업 후 팔로우 차단 API
export const MemberListAPI = {
  getMemberList: async (page = 1, size = 8) => {
    console.log("getMemberList실행: ");
    const params = new URLSearchParams({ page, size });
    return GZAPI.get(`/api/members/interaction?${params.toString()}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("유저데이터 로드 중 에러발생", error);
        throw error;
      });
  },

  searchMemberList: async (page = 1, size = 8, memberName = "") => {
    const params = new URLSearchParams({ page, size, memberName });
    return GZAPI.get(`/api/members/interaction?${params.toString()}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("유저 검색 중 에러 발생", error);
        throw error;
      });
  },

  followMember: (currentUserNo, targetMemberNo) => {
    console.log("타겟멤버", targetMemberNo);
    console.log("현재유저", currentUserNo);
    return GZAPI.post(`/api/members/interaction/follow`, {
      currentUserNo,
      targetMemberNo,
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error("멤버 팔로우 중 에러 발생", error);
        throw error;
      });
  },

  unFollowMember: (currentUserNo, targetMemberNo) => {
    console.log("언팔로우 타겟멤버", targetMemberNo);
    console.log("언팔로우 현재유저", currentUserNo);
    return GZAPI.delete(`/api/members/interaction/follow`, {
      data: { currentUserNo, targetMemberNo },
    })
      .then((response) => {
        console.log("언팔 성공", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("멤버 팔로우 중 에러 발생", error);
        throw error;
      });
  },

  blockMember: (currentUserNo, targetMemberNo) => {
    console.log("차단 타겟멤버", targetMemberNo);
    console.log("차단시도 유저", currentUserNo);
    return GZAPI.post(`/api/members/interaction/block`, {
      currentUserNo,
      targetMemberNo,
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error("멤버 차단 중 에러 발생", error);
        throw error;
      });
  },

  unBlockMember: (currentUserNo, targetMemberNo) => {
    console.log("차단해제 타겟멤버", targetMemberNo);
    console.log("차단해제시도 유저", currentUserNo);
    return GZAPI.delete(`/api/members/interaction/block`, {
      data: { currentUserNo, targetMemberNo },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error("멤버 차단해제 중 에러 발생", error);
        throw error;
      });
  },

  // 추가된 함수
  getFollowList: async (memberNo) => {
    return GZAPI.get(`/api/members/interaction/${memberNo}/follow`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          `${memberNo} 팔로우 리스트를 가져오는 중 오류 발생: `,
          error
        );
        throw error;
      });
  },

  getBlockList: async (memberNo) => {
    return GZAPI.get(`/api/members/interaction/${memberNo}/block`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          `${memberNo} 차단 리스트를 가져오는 중 오류 발생: `,
          error
        );
        throw error;
      });
  },
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
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        throw error;
      });
  },
  getAnnouncementDetail: async (announceNo) => {
    if (!announceNo) {
      throw new Error("공지사항 번호가 없습니다.");
    }
    return GZAPI.get(`/api/announce/detail/${announceNo}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("공지사항 세부조회중 에러 발생[API]", error);
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
    const { memberNo, announceTitle, announceBody, typeCode } =
      announcementData;

    if (!memberNo || !announceTitle || !announceBody || !typeCode) {
      console.log(memberNo);
      console.log(announceTitle);
      console.log(announceBody);
      console.log(typeCode);
      return Promise.reject(new Error("필수 필드가 누락되었습니다."));
    }
    return GZAPI.post("/api/_admin/announce/write", {
      memberNo,
      announceTitle,
      announceBody,
      typeCodeDes: typeCode,
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error("공지사항 작성 중 에러 발생[API]", error);
        throw error;
      });
  },
  updateAnnouncement: (announceNo, announce) => {
    console.log("공지 수정 [API] 번호: ", announceNo);
    return GZAPI.put(`/api/_admin/announce/update/${announceNo}`, announce)
      .then((response) => response.data)
      .catch((error) => {
        console.error("공지사항 수정 중 에러 발생[API]", error);
        throw error;
      });
  },
  deleteAnnouncement: (announceNo) => {
    return GZAPI.delete(`/api/_admin/announce/delete/${announceNo}`)
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

export const Note = {
  NoteCheck: async (noteNo) => {
    return GZAPI.post(`/api/noteCheck/${noteNo}`)
      .then((res) => res)
      .catch((err) => err);
  },
  NoteList: async (data) => {
    const { memberNo, ...rest } = data;
    return GZAPI.get(`/api/note/noteList/${memberNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
  InsertNote: async (data) => {
    return GZAPI.post(`/api/note/insertNote`, data)
      .then((res) => res)
      .catch((err) => err);
  },
  UpdateReadTimeNote: async (noteNo) => {
    return GZAPI.post(`/api/note/updateReadTime/${noteNo}`)
      .then((res) => res)
      .catch((err) => err);
  },
  UpdateDeleteNote: async (noteNo) => {
    return GZAPI.post(`/note/updateDelete/${noteNo}`)
      .then((res) => res)
      .catch((err) => err);
  },
};

export const Alert = {
  AlertList: async (memberNo) => {
    return GZAPI.get(`/api/alertSSE/AlertSSEList/${memberNo}`)
      .then((res) => res)
      .catch((err) => err);
  },
  AlertRead: async (alertNo) => {
    return GZAPI.post(`/api/alertSSE/updateReadTime/${alertNo}`)
      .then((res) => res)
      .catch((err) => err);
  },
  AlertDelete: async (alertNo) => {
    return GZAPI.post(`/api/alertSSE/updateReadTime/${alertNo}`)
      .then((res) => res)
      .catch((err) => err);
  },
};

export const AdminMemberAPI = {
  MemberList: async (data) => {
    return GZAPI.get("/admin/member/listAll", data)
      .then((res) => res)
      .catch((err) => err);
  },
  MemberQuitList: async (data) => {
    return GZAPI.get("/admin/member/quitListALl", data)
      .then((res) => res)
      .catch((err) => err);
  },
  MemberSleepList: async (data) => {
    return GZAPI.get("/admin/member/sleepListALl", data)
      .then((res) => res)
      .catch((err) => err);
  },
  MemberPunishList: async (data) => {
    return GZAPI.get("/admin/member/punishListALl", data)
      .then((res) => res)
      .catch((err) => err);
  },
  PunishUpdate: async (data) => {
    const { memberNo, ...rest } = data;
    return GZAPI.post(`/admin/punish/update/${memberNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
  PunishInsert: async (data) => {
    const { memberNo, ...rest } = data;
    return GZAPI.post(`/admin/punish/insert/${memberNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
  ReportList: async (data) => {
    return GZAPI.get(`/api/ReportMember/listReportAll`, data)
      .then((res) => res)
      .catch((err) => err);
  },
  ReportPunishInsert: async (data) => {
    const { memberNo, ...rest } = data;
    return GZAPI.post(`/api/ReportMember/punish/${memberNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
  ReportMemberInsert: async (data) => {
    return GZAPI.post(`/api/ReportMember/report`, data)
      .then((res) => res)
      .catch((err) => err);
  },
  QuestionList: async (data) => {
    return GZAPI.get(`/api/QuestionMember/listQuestionAll`, data)
      .then((res) => res)
      .catch((err) => err);
  },
  QuestionMemberInsert: async (data) => {
    return GZAPI.post(`/api/QuestionMember/insert`, data)
      .then((res) => res)
      .catch((err) => err);
  },
  QuestionStatusList: async (data) => {
    const { memberQuestionNo, ...rest } = data;
    return GZAPI.post(`/api/QuestionStatusUpdate/${memberQuestionNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
  NoteCheck: async (data) => {
    const { noteNo, ...rest } = data;
    return GZAPI.post(`/api/noteCheck/${noteNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
  NoteList: async (data) => {
    const { memberNo, ...rest } = data;
    return GZAPI.post(`/api/noteList/${memberNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
  InsertNote: async (data) => {
    return GZAPI.post(`/api/insertNote`, data)
      .then((res) => res)
      .catch((err) => err);
  },
  UpdateReadTimeNote: async (data) => {
    const { noteNo, ...rest } = data;
    return GZAPI.post(`/api/updateReadTime/${noteNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
  UpdateDeleteNote: async (data) => {
    const { noteNo, ...rest } = data;
    return GZAPI.post(`/api/updateDelete/${noteNo}`, rest)
      .then((res) => res)
      .catch((err) => err);
  },
};

export const Board = {
  BoardReply: async (boardNo, connectMemberNo, Reply) => {
    return GZAPI.post(`/api/boards/reply/add`, {
      boardNo: boardNo,
      memberNo: connectMemberNo,
      replyBody: Reply,
    })
      .then((res) => res)
      .catch((err) => err);
  },

  UpdateBoardReply: async (replyNo, boardNo, connectMemberNo, updateReply) => {
    return GZAPI.post(`/api/boards/reply/update`, {
      replyNo: replyNo,
      boardNo: boardNo,
      memberNo: connectMemberNo,
      replyBody: updateReply,
    })
      .then((res) => res)
      .catch((err) => err);
  },

  DeleteBoardReply: async (deleteNo, boardNo, connectMemberNo) => {
    return GZAPI.delete(`/api/boards/reply/delete`, {
      data: { replyNo: deleteNo, boardNo: boardNo, memberNo: connectMemberNo },
    })
      .then((res) => res)
      .catch((err) => err);
  },
};
