import { Navigate, type RouteObject } from "react-router-dom";
import type { FeatureMetadata } from "@/shared/types";
import { compose } from "@/shared/utils";

const AuthFeatureMetadata = {
  id: "auth",
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
          path: 'password-reset',
          async lazy() {
            return compose(await import("./pages/password-reset"));
          },
        },
        {
          path: 'password-reset/:token',
          async lazy() {
            return compose(await import("./pages/change-password"));
          },
        },
        {
          path: 'otp',
          async lazy() {
            return compose(await import("./pages/otp"));
          },
        },
        {
          path: "logout",
          element: <Navigate to="/auth/login" />,
        },
      ],
    },
  ] as RouteObject[],
  locales: [
    {
      lang: "id",
      resources: async () => import("./locales/id.json"),
    },
    {
      lang: "en",
      resources: async () => import("./locales/en.json"),
    }
  ]
} satisfies FeatureMetadata;

export default AuthFeatureMetadata;
