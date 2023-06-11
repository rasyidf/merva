import { FeatureFlagsProvider } from "./contexts/FeatureProvider";
import MainRouter from "./utils/MainRouter";

function App() {
	return (
		<FeatureFlagsProvider>
			<MainRouter />
		</FeatureFlagsProvider>
	);
}

export default App;
