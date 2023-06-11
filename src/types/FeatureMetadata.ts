import { RouteConfig } from "./RouteConfig";
import { VersionConfig } from "./VersionConfig";
import { NavigationConfig } from "./NavigationConfig";
export interface FeatureMetadata {
	id: string;
	name: string;
	enabled: boolean;
	routes?: RouteConfig[];
	navigation?: NavigationConfig[];
	versions: VersionConfig[];
	activeVersion: string;
}
