import create from 'zustand';
import { Auth } from "../repository";
import { persist } from "zustand/middleware";

const AuthStore = create(
  persist(
    (set) => ({
      isLogin: false,
      userInfo: {
        accessToken: null,
        refreshToken: null,
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
    if (response && response.accessToken && response.refreshToken) {
      set({ isLogin: true });
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          memberNo: response.memberNo,
          pointNo: response.pointNo,
        },
      }));
      window.localStorage.setItem("accessToken", response.accessToken);
      window.localStorage.setItem("refreshToken", response.refreshToken);
      return response;
    } else {
      return response;
    }
  },

  statusLogout: () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    set({ isLogin: false });
    set({
      userInfo: {
        accessToken: null,
        refreshToken: null,
        memberNo: null,
        pointNo: null,
      },
    });
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
