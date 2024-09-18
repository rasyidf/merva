export type AuthProps = {
  baseUrl?: string;
  accessToken?: string;
  refreshToken?: string;
  expired: number;
  id?: string;
  username?: string;
  phoneNumber?: string;
  companyId?: string;
  email?: string;
  name: string;
  status: string;
  company?: any;

  isAuthenticated: boolean;
  isRefreshingToken: boolean;
  roles: string[];
};
export type LoginProps = {
  email: string;
  password: string;
};
type RegisProps = {
  email: string;
  password: string;
  name: string;
  gender: string;
};
export type AuthStore = {
  login: (payload: LoginProps) => Promise<void>;
  register: (payload: RegisProps) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<{ accessToken: string; }>;
  setBaseUrl: (url: string) => void;
  isExpired: () => boolean;
} & AuthProps;
