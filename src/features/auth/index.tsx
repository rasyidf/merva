import { Navigate, type RouteObject } from "react-router-dom";
import type { FeatureMetadata } from "@/shared/types";
import { compose } from "@/shared/utils";

const AuthFeatureMetadata = {
  id: "Auth",
  name: "Authentication Feature",
  enabled: true,
  placement: "shell",
  routes: [
    {
      path: "auth",
      async lazy() {
        return compose(await import("./pages/layout"));
      },
      children: [
        {
          path: "login",
          async lazy() {
            return compose(await import("./pages/login"));
          },
        },
        {
          path: "register",
          async lazy() {
            return compose(await import("./pages/register"));
          },
        },
        {
          path: "logout",
          element: <Navigate to="/auth/login" />,
        },
      ],
    },
  ] as RouteObject[],
} satisfies FeatureMetadata;

export default AuthFeatureMetadata;
