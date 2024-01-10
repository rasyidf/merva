import React from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/inter";
import "@fontsource/poppins";

import "@/styles/index.scss";
import RootComponent from "./App";

createRoot(document.getElementById("root") as HTMLElement)
	.render(
		<React.StrictMode>
			<RootComponent />
		</React.StrictMode>,
	);
