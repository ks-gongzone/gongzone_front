import create from 'zustand';
import { Auth } from "../repository";
import { persist } from "zustand/middleware";

const AuthStore = create(
  persist(
    (set) => ({
      isLogin: false,
      userInfo: {
        token: null,
        memberNo: null,
        pointNo: null,
      },

      setIsLogin: (status) => set({ isLogin: status }),
      setUserInfo: (info) => set((state) => ({
        userInfo: {
          ...state.userInfo,
          ...info,
        },
    })),

  statusLogin: async (data) => {
    const response = await Auth.Login(data);
    if (response && response.accessToken) {
      set({ isLogin: true });
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          token: response.accessToken,
          memberNo: response.memberNo,
          pointNo: response.pointNo,
        },
      }));
      window.localStorage.setItem("accessToken", response.accessToken);
      return response;
    } else {
      return response;
    }
  },

  statusLogout: () => {
    window.localStorage.removeItem("accessToken");
    //window.sessionStorage.removeItem("auth-storage");
    set({ isLogin: false });
    set({
      userInfo: {
        token: null,
        memberNo: null,
        pointNo: null,
      },
    });
    // 주스탠드 상태 리셋 (초기화)
    sessionStorage.clear();
    localStorage.clear();
  },
}),
    {
      name: 'auth-storage', // localStorage에 저장되는 이름
      getStorage: () => localStorage, // 기본 스토리지는 localStorage
    }
  )
);

export default AuthStore;
