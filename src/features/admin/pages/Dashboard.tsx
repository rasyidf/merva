import { PageHeader } from "@/components/groups/main-header";
import { StatsCard } from "@/components/groups/stats-card/StatisticCard";
import { Group, Paper, Stack } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { CalendarBlank } from "@phosphor-icons/react";

export const Dashboard = () => {
  return (
    <Paper p={16}>
      <Stack gap={16}>
        <Group justify="space-between">
          <PageHeader title="Dashboard" subtitle="Welcome to Merva Codebase" />
          <DatePickerInput miw={200} type="range" leftSection={<CalendarBlank />} />
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
