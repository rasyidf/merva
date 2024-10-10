import { LanguageProvider, QueryProvider, RouteProvider, ThemeProvider } from "../shared";

export function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <LanguageProvider>
          <RouteProvider />
        </LanguageProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
