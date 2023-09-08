export type NavigationConfig = {
	id: string;
	title: string;
	enabled: boolean;
	visible: boolean;
	path: string;
	icon: string;
	children?: NavigationConfig[];
};
