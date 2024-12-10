import { PageHeader } from "@/shared/components/groups/main-header";
import { StatsCard } from "@/shared/components/groups/stats-card";
import { SvgIcon } from "@/shared/components/ui/icon";
import { Group, Paper, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

export const Dashboard = () => {
  return (
    <Paper p={16}>
      <Stack gap={16}>
        <Group justify="space-between">
          <PageHeader title="Dashboard" subtitle="Welcome to Merva Codebase" />
          <SvgIcon name="calendar" />
        </Group>

        <Group mt={16} w="100%">
          <StatsCard title={"Menunggu"} value={"2"} />
          <StatsCard title={"Diterima"} value={"3"} />
          <StatsCard title={"Ditolak"} value={"1"} />
          <StatsCard title={"Total"} value={"6"} />
        </Group>
      </Stack>
    </Paper>
  );
};
