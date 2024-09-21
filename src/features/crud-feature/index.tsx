import { FeatureMetadata } from "@/shared/types/FeatureMetadata";
import { NavigationConfig } from "@/shared/types/NavigationConfig";
import { compose } from "@/shared/utils";
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
            return compose(await import("./pages/List"));
          },
        },
        {
          path: "details/:id",
          async lazy() {
            return compose(await import("./pages/Details"));
          },
        },
        {
          path: "create",
          async lazy() {
            return compose(await import("./pages/Create"));
          },
        },
        {
          path: "edit/:id",
          async lazy() {
            return compose(await import("./pages/Edit"));
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
