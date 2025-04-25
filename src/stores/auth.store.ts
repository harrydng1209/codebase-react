import { profile, refreshToken as refreshTokenApi } from '@/apis/auth.api';
import { STORAGE_KEYS } from '@/constants/shared.const';
import { IUserInfo } from '@/models/interfaces/auth.interface';
import store2 from 'store2';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IState {
  accessToken: null | string;
  initialize: () => Promise<void>;
  isAuthenticated: boolean;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  setToken: (token: string) => void;
  setUser: (data: IUserInfo) => void;
  userInfo?: IUserInfo;
}

export const useAuthStore = create<IState>()(
  devtools((set, get) => ({
    accessToken: store2.get(STORAGE_KEYS.ACCESS_TOKEN),

    initialize: async () => {
      if (get().isAuthenticated) return;

      const isLoggedIn = Boolean(get().accessToken);
      if (!isLoggedIn) return;

      try {
        const response = await profile();
        get().setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    },

    isAuthenticated: false,

    logout: () => {
      set({
        accessToken: null,
        isAuthenticated: false,
        userInfo: undefined,
      });
      store2.remove(STORAGE_KEYS.ACCESS_TOKEN);
    },

    refreshToken: async (): Promise<boolean> => {
      let result = true;
      try {
        const response = await refreshTokenApi();
        get().setToken(response.data.accessToken);
      } catch (error) {
        result = false;
        console.error(error);
      }
      return result;
    },

    setToken: (token: string) => {
      store2.set(STORAGE_KEYS.ACCESS_TOKEN, token);
      set({ accessToken: token });
    },

    setUser: (data: IUserInfo) =>
      set({ isAuthenticated: true, userInfo: data }),

    userInfo: undefined,
  })),
);
