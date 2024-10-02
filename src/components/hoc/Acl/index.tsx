// acl.tsx
import { ReactElement, ReactNode, useMemo } from "react";
import { Navigate } from "react-router-dom";

export type AclProps = {
  userPolicies: string[];
  children: ReactNode;
  policies: string[];
  redirect?: boolean;
  defaultRedirect?: string;
  forbiddenCallback?: ReactNode;
};

export const Acl = ({
  userPolicies,
  policies,
  children,
  redirect = false,
  defaultRedirect = "/login",
  forbiddenCallback,
}: AclProps): ReactElement | null => {
  const auth = useMemo(() => policies.some((e) => userPolicies.includes(e)), [policies, userPolicies]);

  if (auth) {
    return <>{children}</>;
  }

  if (forbiddenCallback) {
    return <>{forbiddenCallback}</>;
  }

  if (redirect) {
    return <Navigate to={defaultRedirect} replace />;
  }

  return null;
};
