export type NavigationConfig = {
	id: string;
	title: string;
	enabled: boolean;
	path: string;
	icon: string;
	children?: NavigationConfig[];
};
