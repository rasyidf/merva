import { SvgIcon } from "@/shared/components/ui/icon";
import type { FeatureMetadata, NavigationConfig } from "@/shared/types";
import { compose } from "@/shared/utils";
import type { RouteObject } from "react-router-dom";

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
            return compose(await import("./pages/list"));
          },
        },
        {
          path: "details/:id",
          async lazy() {
            return compose(await import("./pages/details"));
          },
        },
        {
          path: "create",
          async lazy() {
            return compose(await import("./pages/create"));
          },
        },
        {
          path: "edit/:id",
          async lazy() {
            return compose(await import("./pages/edit"));
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
      icon: <SvgIcon name="bookMarked" />,
    },
  ] as NavigationConfig[],
  locales: [
    {
      lang: "en",
      resources: async () => await import("./locales/en.json"),
    },
    {
      lang: "id",
      resources: async () => await import("./locales/id.json"),
    }
  ]
} satisfies FeatureMetadata;

export default FeatureAMetadata;
