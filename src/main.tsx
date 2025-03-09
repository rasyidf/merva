import "@fontsource-variable/inter";

import "@mantine/core/styles.css";
import "@/shared/styles/index.css";

import "@/shared/libs";

import { MainApp } from "./shared/components/root";
import { createRoot } from "react-dom/client";
import { featureRegistry } from "./core/configs";
import { initializeFeatures } from "./shared/services/features/feature.service";

// Initialize features before bootstrapping the app
await initializeFeatures(featureRegistry).catch(console.error);

// Only mount the app after features are initialized
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<MainApp />);
