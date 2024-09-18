import { FeatureMetadata } from "@/shared/types/FeatureMetadata";
import { NavigationConfig } from "@/shared/types/NavigationConfig";
import { BookOpen } from "@phosphor-icons/react";
import { RouteObject } from "react-router-dom";

const baseUri = "/app/product";
const FeatureAMetadata = {
  id: "feature-a",
  name: "Entity A",
  group: "Products",
  enabled: true, // Feature flag to enable/disable the entire feature
  routes: [
    {
      path: `${baseUri}/entity-a/`,
      children: [
        {
          index: true,
          async lazy() {
            const { EntityList } = await import("./pages/List");
            return { Component: EntityList };
          },
        },
        {
          path: "details/:id",
          async lazy() {
            const { EntityDetails } = await import("./pages/Details");
            return { Component: EntityDetails };
          },
        },
        {
          path: "create",
          async lazy() {
            const { EntityCreate } = await import("./pages/Create");
            return { Component: EntityCreate };
          },
        },
        {
          path: "edit/:id",
          async lazy() {
            const { EntityEdit } = await import("./pages/Edit");
            return { Component: EntityEdit };
          },
        },
      ],
    },
  ] as RouteObject[],
  navigation: [
    {
      id: "entity-a",
      path: `${baseUri}/entity-a/`,
      title: "Table Feature",
      icon: <BookOpen weight="duotone" />,
    },
  ] as NavigationConfig[],
} satisfies FeatureMetadata;

export default FeatureAMetadata;
