import { Navigate, RouteObject } from "react-router-dom";
import { FeatureMetadata } from "@/shared/types";
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
        return compose(await import("./pages/Layout"));
      },
      children: [
        {
          path: "login",
          async lazy() {
            return compose(await import("./pages/Login"));
          },
        },
        {
          path: 'register',
          async lazy() {
            return compose(await import("./pages/Register"));
          }
        },
        {
          path: "logout",
          element: <Navigate to="/auth/login" />,
        }
      ],
    },
  ] as RouteObject[],
} satisfies FeatureMetadata;

export default AuthFeatureMetadata;
