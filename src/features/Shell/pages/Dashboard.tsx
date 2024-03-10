import { PageHeader } from "@/components/groups/Header";
import { Stack } from "@mantine/core";

type Props = {};

export const Dashboard = (props: Props) => {
  return (
    <Stack gap={16}>
      <PageHeader title="Dashboard" subtitle="Welcome to Merva Codebase" />
    </Stack>
  );
};

export default Dashboard;
