import { SvgIcon } from "@/shared/components/ui/icon";
import type { FeatureMetadata } from "@/shared/types";
import { Navigate, type RouteObject } from "react-router-dom";

export const featureId = "user-management";

const baseUri = "/app/user-management";

const FeatureMetadata = {
  id: featureId,
  name: "User Management",
  group: "Administration",
  enabled: true,
  icon: "users",
  placement: "app",
  routes: [
    {
      path: `${baseUri}`,
      children: [
        { // Redirect to users list
          index: true,
          element: <Navigate to={`${baseUri}/users`} replace />,
        },
        {
          path: "users",
          async lazy() {
            const { UserList } = await import("./pages/users/list");
            return { Component: UserList };
          },
        },
        {
          path: "users/create",
          async lazy() {
            const { UserCreate } = await import("./pages/users/create");
            return { Component: UserCreate };
          },
        },
        {
          path: "users/:id",
          async lazy() {
            const { UserDetails } = await import("./pages/users/details");
            return { Component: UserDetails };
          },
        },
        {
          path: "users/:id/edit",
          async lazy() {
            const { UserEdit } = await import("./pages/users/edit");
            return { Component: UserEdit };
          },
        },
        {
          path: "roles",
          async lazy() {
            const { RoleList } = await import("./pages/roles/list");
            return { Component: RoleList };
          },
        },
        {
          path: "roles/create",
          async lazy() {
            const { RoleCreate } = await import("./pages/roles/create");
            return { Component: RoleCreate };
          },
        },
        {
          path: "roles/:id",
          async lazy() {
            const { RoleDetails } = await import("./pages/roles/details");
            return { Component: RoleDetails };
          },
        },
        {
          path: "roles/:id/edit",
          async lazy() {
            const { RoleEdit } = await import("./pages/roles/edit");
            return { Component: RoleEdit };
          },
        },
      ],
    },
  ] as RouteObject[],
  navigation: [
    {
      id: "user-management",
      title: "User Management",
      path: `${baseUri}/users`,
      icon: "users",
      placement: "top", 
    },
    {
      id: "user-management-roles",
      title: "Roles & Permissions",
      path: `${baseUri}/roles`,
      placement: "top", 
      icon: "key",

    }
  ],
  locales: [
    {
      lang: "en",
      resources: async () => await import("./locales/en.json"),
    },
    {
      lang: "id",
      resources: async () => await import("./locales/id.json"),
    },
  ],
} satisfies FeatureMetadata;

export default FeatureMetadata;