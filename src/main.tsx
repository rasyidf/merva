import React from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/inter";
import "@fontsource/poppins";

import "@/styles/index.scss";
import RootComponent from "./contexts/RootComponent";


const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <RootComponent />
    </React.Suspense>
  </React.StrictMode>,
);
