
import "@fontsource-variable/inter";

import "@/shared/libs";
import "@/shared/styles/index.css";
import "@mantine/core/styles.css";

import { MainApp } from "./shared/components/root";

import { createRoot } from "react-dom/client";
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(<MainApp />);
