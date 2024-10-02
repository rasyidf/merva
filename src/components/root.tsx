import { LanguageProvider, QueryProvider, RouteProvider, ThemeProvider } from "../shared";

function App() {
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

export default App;
