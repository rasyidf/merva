import { StrictMode } from "react";
import { LanguageProvider, QueryProvider, RouteProvider, ThemeProvider } from "..";


export function MainApp() {
  return (
    <StrictMode>
      <QueryProvider>
        <ThemeProvider>
          <LanguageProvider>
            <RouteProvider />
          </LanguageProvider>
        </ThemeProvider>
      </QueryProvider>
    </StrictMode>
  );
}
