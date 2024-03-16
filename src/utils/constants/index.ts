export const APP_NAME = import.meta.env.MERVA_APP_NAME ?? "MERVA";

export const APP_NAME_SHORT = import.meta.env.MERVA_APP_NAME_SHORT ?? "MERVA";

export const APP_VERSION = import.meta.env.MERVA_APP_VERSION ?? "0.1.0";

export const APP_URL = import.meta.env.MERVA_APP_URL ?? "https://merva.vercel.app";

export const BASE_URL_API = import.meta.env.MERVA_API_URL ?? "https://merva-api.vercel.app";

export const BASIC_API_AUTH = import.meta.env.MERVA_API_BASIC_AUTH ?? "BASIC {token}";

export const DATABASE_URL = import.meta.env.MERVA_DATABASE_URL ?? "./database.sqlite";

export const isDev = import.meta.env.MODE === "development";
