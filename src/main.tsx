import React from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/inter";
import "@/shared/libs/dayjs";
import "@/shared/styles/index.scss";

import { App } from "./components/root";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
