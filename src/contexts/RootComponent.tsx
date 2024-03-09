import { LanguageProvider, QueryProvider, RouteProvider, ThemeProvider } from ".";

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
