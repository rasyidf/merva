import React from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/inter";
import "@fontsource/poppins";

import "@/shared/styles/index.scss";
import RootComponent from "./components/root";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
);
