import { PageHeader } from "@/shared/components/groups/main-header";
import { StatsCard } from "@/shared/components/groups/stats-card";
import { SvgIcon } from "@/shared/components/ui/icon";
import { BarChart } from "@mantine/charts";
import { Avatar, Card, Group, Paper, SimpleGrid, Stack, Table, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { userData, stats, data } from "../data/userData";

export function UsersStack() {
  const rows = userData.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text c="dimmed" fz="xs">
              {item.job}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.email}</Text>
        <Text fz="xs" c="dimmed">
          Email
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">${item.rate.toFixed(1)} / hr</Text>
        <Text fz="xs" c="dimmed">
          Rate
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="md">
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

export const Dashboard = () => {
  return (
    <Paper p={16}>
      <Stack gap={16}>
        <Group justify="space-between">
          <PageHeader title="Dashboard" subtitle="Welcome to Merva Codebase" />

          <DatePickerInput type="range" rightSection={<SvgIcon name="calendar" />} miw={320} />
        </Group>

        <SimpleGrid mt={16} w="100%" cols={{ xs: 1, md: 2, lg: 4 }} spacing={16}>
          {
            stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))
          }
        </SimpleGrid>
        <Card withBorder p={16} radius="md">
          <BarChart
          h={300}
          w="100%"
            data={data}
            dataKey="month"
            withLegend
            series={[
              { name: 'Registered', color: 'var(--mantine-primary-color-6)' },
              { name: 'Processed', color: 'var(--mantine-primary-color-7)' },
              { name: 'Completed', color: 'var(--mantine-primary-color-8)' },
            ]}
          />
        </Card>
        <Card withBorder p={16} radius="md">
          <Text fz={20} fw={500} mb={16}>
            Available Talents
          </Text>
          <UsersStack />
        </Card>
      </Stack>
    </Paper>
  );
};
