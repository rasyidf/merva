import { ReactElement, ReactNode, useMemo } from "react";
import { Navigate } from "react-router-dom";

export type AclProps = {
  userPolices: string[];
  children: ReactNode;
  policies: string[];
  redirect?: boolean;
  defaultRedirect?: string;
  forbiddenCallback?: ReactNode;
};

export const Acl = ({
  userPolices,
  policies,
  children,
  redirect = false,
  defaultRedirect = "/login",
  forbiddenCallback,
}: AclProps): ReactElement | null => {
  const auth = useMemo(() => policies.some((e) => userPolices.includes(e)), [policies, userPolices]);

  if (!auth) {
    if (forbiddenCallback) {
      return <>{forbiddenCallback}</>;
    }
    if (redirect) {
      return <Navigate to={defaultRedirect} replace />;
    }
    return null;
  }
  return <>{children}</>;
};
