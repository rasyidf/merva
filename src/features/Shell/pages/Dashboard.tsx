import { PageHeader } from "@/components/groups/Header";
import { Paper, Stack } from "@mantine/core";

export const Dashboard = () => {
  return (
    <Paper p={16}>
      <Stack gap={16}>
        <PageHeader title="Dashboard" subtitle="Welcome to Merva Codebase" />


      </Stack>
    </Paper>
  );
};

export default Dashboard;
