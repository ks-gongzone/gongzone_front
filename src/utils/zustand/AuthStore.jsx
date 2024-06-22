import create from 'zustand';
import { Auth } from "../repository";
import { persist } from "zustand/middleware";

const AuthStore = create(
  persist(
    (set) => ({
      isLogin: false,
      userInfo: {
        token: null,
        memberId: null,
        points: 0,
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
          memberId: response.memberId,
          points: response.points,
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
    set({ isLogin: false });
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        token: null,
        memberId: null,
        points: 0,
      },
    }));
  },
}),
    {
      name: 'auth-storage', // localStorage에 저장되는 이름
      getStorage: () => localStorage, // 기본 스토리지는 localStorage
    }
  )
);

export default AuthStore;
