import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { BASE_URL_API, BASIC_API_AUTH } from "@/shared/utils/constants";
import { modals } from "@mantine/modals";
import { AuthProps, AuthStore } from "../../types/auth";
import { authApiFetch, queryClient } from "../api";
import { decodeBase64 } from "../crypto/utils";
import { loggerset } from "./logger";

const defaultValues = {
  baseUrl: BASE_URL_API,
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
} satisfies AuthProps;

export const useAuth = create<AuthStore>()(
  loggerset(
    devtools(
      persist<AuthStore>(
        (set, get) => ({
          ...defaultValues,
          isTokenExpired: () => {
            const expired = get().expired;
            const now = new Date().getTime() / 1000;
            return now > expired;
          },
          login: async ({ email, password }) => {
            const { data } = await authApiFetch({
              method: "POST",
              path: "user/auth/login",
              data: {
                email,
                password,
              },
              headers: {
                Authorization: BASIC_API_AUTH,
              },
            }).then((res) => res.data);
            const jwtPayload = data.tokens.accessToken.split(".")[1];
            const decodedBase = decodeBase64(jwtPayload);
            const decoded = JSON.parse(String.fromCharCode(...decodedBase));

            // set axios.defaults.headers.common.Authorization
            axios.defaults.headers.common.Authorization = `Bearer ${data.tokens.accessToken}`;

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
          register: async ({ email, password, name, gender }) => {
            const response = await authApiFetch({
              method: "POST",
              path: "user/auth/register",
              data: {
                email,
                password,
                name,
                gender,
              },
              headers: {
                Authorization: BASIC_API_AUTH,
              },
            });
            set((state) => ({
              ...state,
              ...response.data,
            }));
          },
          logout: () => {
            // remove axios.defaults.headers.common.Authorization
            axios.defaults.headers.common.Authorization = undefined;
            // clear sessionStorage and localStorage
            sessionStorage.clear();
            localStorage.clear();
            queryClient.invalidateQueries();
            queryClient.cancelQueries();
            queryClient.resetQueries();
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

            const data = await authApiFetch({
              method: "GET",
              path: "user/auth/refresh",

              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            })
              .then((res) => res.data)
              .catch((err) => {
                set((state) => ({ ...state, isRefreshingToken: false }));
                throw err;
              });
            const jwtPayload = data.accessToken.split(".")[1];
            const decodedBase = decodeBase64(jwtPayload);
            const decoded = JSON.parse(String.fromCharCode(...decodedBase));
            axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

            set((state) => {
              return {
                ...state,
                expired: decoded.exp,
                refreshToken: data.refreshToken,
                isRefreshingToken: false,
                ...data,
              };
            });
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
          name: "cheese",
          storage: createJSONStorage(() => localStorage),
        },
      ),
    ),
  ),
);
