// auth.ts
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { APP_URL_API, AUTH_BASIC_API, URL_LOGIN, URL_REFRESH, URL_REGISTER } from "@/shared/utils/constants";
import { modals } from "@mantine/modals";
import type { AuthProps, AuthStore } from "../../types/auth";
import { authApiFetch } from "../api";
import { decodeBase64 } from "../crypto/utils";

const defaultValues: AuthProps = {
  baseUrl: APP_URL_API,
  accessToken: "",
  refreshToken: "",
  expired: 0,
  id: "",
  username: "",
  phoneNumber: "",
  companyId: "",
  email: "",
  roles: [],
  name: "",
  status: "",
  isAuthenticated: false,
  isRefreshingToken: false,
};

export const useAuth = create<AuthStore>()(

  devtools(
    persist<AuthStore>(
      (set, get) => ({
        ...defaultValues,
        isTokenExpired: () => {
          const expired = get().expired;
          const now = new Date().getTime() / 1000;
          return now > expired;
        },
        login: async ({ username, password }) => {
          const data = await authApiFetch<any>({
            method: "POST",
            path: APP_URL_API + URL_LOGIN,
            body: JSON.stringify({
              username,
              password,
            }),
            headers: {
              Authorization: AUTH_BASIC_API,
            },
          });

          const jwtPayload = data.tokens.accessToken.split(".")[1];
          const decodedBase = decodeBase64(jwtPayload);
          const decoded = JSON.parse(String.fromCharCode(...decodedBase));

          set((state) => ({
            ...state,
            isAuthenticated: true,
            expired: decoded.exp,
            roles: decoded.roles,
            refreshToken: data.tokens.refreshToken,
            accessToken: data.tokens.accessToken,
            companyId: data.user?.company.id,
            ...data.user,
          }));
        },
        register: async ({ email, password, name }) => {
          const data = await authApiFetch<any>({
            method: "POST",
            path: APP_URL_API + URL_REGISTER,
            body: JSON.stringify({
              email,
              password,
              name,
            }),
            headers: {
              Authorization: AUTH_BASIC_API,
            },
          });

          set((state) => ({
            ...state,
            ...data,
          }));
        },
        logout: () => {
          // Clear sessionStorage and localStorage
          sessionStorage.clear();
          localStorage.clear();
          // Close all modals and reset state
          modals.closeAll();
          set(() => defaultValues);
        },
        refresh: async () => {
          const isRefreshingToken = get().isRefreshingToken;

          if (isRefreshingToken) {
            return new Promise<{ accessToken: string; }>((resolve) => {
              setTimeout(() => {
                resolve({ accessToken: get().accessToken ?? "" });
              }, 1000);
            });
          }

          const refreshToken = get().refreshToken;

          set((state) => ({ ...state, isRefreshingToken: true }));

          const data = await authApiFetch<any>({
            method: "GET",
            path: APP_URL_API + URL_REFRESH,
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }).catch((err) => {
            set((state) => ({ ...state, isRefreshingToken: false }));
            throw err;
          });

          const jwtPayload = data.accessToken.split(".")[1];
          const decodedBase = decodeBase64(jwtPayload);
          const decoded = JSON.parse(String.fromCharCode(...decodedBase));

          set((state) => ({
            ...state,
            expired: decoded.exp,
            refreshToken: data.refreshToken,
            isRefreshingToken: false,
            ...data,
          }));

          return { accessToken: data.accessToken };
        },
        setBaseUrl: (url) => {
          set((state) => ({ ...state, baseUrl: url }));
        },
        isExpired: () => {
          const expired = get().expired;
          const now = new Date().getTime() / 1000;
          return now > expired;
        },
      }),
      {
        name: "auth",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
