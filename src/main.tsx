
import "@fontsource-variable/inter";

import "@mantine/core/styles.css";
import "@/shared/styles/index.css";

import "@/shared/libs"; 

import { MainApp } from "./shared/components/root";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root") as HTMLElement).render(<MainApp />);
