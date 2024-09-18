import { Navigate, RouteObject } from "react-router-dom";
import { FeatureMetadata } from "@/shared/types/FeatureMetadata";

const AuthFeatureMetadata = {
  id: "Auth",
  name: "Authentication Feature",
  enabled: true,
  placement: "shell",
  routes: [
    {
      path: "auth",
      async lazy() {
        const { default: AuthPage } = await import("./pages/Layout");
        return { Component: AuthPage };
      },
      children: [
        {
          path: "login",
          async lazy() {
            const { default: LoginPage } = await import("./pages/Login");
            return { Component: LoginPage };
          },
        },
        {
          path: 'register',
          async lazy() {
            const { default: RegisterPage } = await import("./pages/Register");
            return { Component: RegisterPage };
          }
        },
        {
          path: "logout",
          element: <Navigate to="/app/login" />,
        }
      ],
    },
  ] as RouteObject[],
} satisfies FeatureMetadata;

export default AuthFeatureMetadata;
