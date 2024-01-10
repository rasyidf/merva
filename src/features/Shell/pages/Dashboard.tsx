import {
	Card,
	Text,
	Title
} from "@mantine/core";

type Props = {};

export const Dashboard = (props: Props) => {
	return (
		<>
			<Card withBorder>
				<Title order={4}>Merva Codebase</Title>
				<Text>Welcome to Merva Codebase!</Text>
			</Card>
			<Card withBorder>
				<Title order={4}>Merva Codebase</Title>
				<Text>Welcome to Merva Codebase!</Text>
			</Card>
		</>
	);
};

export default Dashboard;
