export const APP_NAME = import.meta.env.MERVA_APP_NAME ?? "MERVA";

export const APP_NAME_SHORT = import.meta.env.MERVA_APP_NAME_SHORT ?? "MERVA";

export const APP_VERSION = import.meta.env.MERVA_APP_VERSION ?? "0.2.0";

export const APP_URL = import.meta.env.MERVA_APP_URL ?? "https://merva.vercel.app";

export const APP_URL_API = import.meta.env.MERVA_API_URL ?? "https://merva-api.vercel.app";

export const URL_LOGIN = "/auth/login";

export const URL_REGISTER = "/auth/register";

export const URL_REFRESH = "auth/refresh";

export const AUTH_BASIC_API = import.meta.env.MERVA_API_BASIC_AUTH ?? "Basic {token}";

export const DATABASE_URL = import.meta.env.MERVA_DATABASE_URL ?? "./database.sqlite";

export const isDev = import.meta.env.MODE === "development";
