import { PageHeader } from "@/shared/components/groups/main-header";
import { StatsCard } from "@/shared/components/groups/stats-card";
import { IconName, SvgIcon } from "@/shared/components/ui/icon";
import { BarChart } from "@mantine/charts";
import { Avatar, Card, Group, Loader, Paper, SegmentedControl, SimpleGrid, Stack, Table, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useSearchParams } from "react-router-dom";
import { useDashboardData } from "../services/dashboardService";

export function UsersStack({ data }: { data: any[] }) {
  const rows = data.map((item) => (
    <Table.Tr key={item.name || item.property || item.student || item.pet}>
      <Table.Td>
        <Group gap="sm">
          {item.avatar && <Avatar size={40} src={item.avatar} radius={40} />}
          <div>
            <Text fz="sm" fw={500}>
              {item.name || item.property || item.student || item.pet}
            </Text>
            <Text c="dimmed" fz="xs">
              {item.job || item.units || item.grade || item.type}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.email || item.revenue || item.attendance || item.owner}</Text>
        <Text fz="xs" c="dimmed">
          {item.avatar ? 'Email' : item.revenue ? 'Revenue' : item.attendance ? 'Attendance' : 'Owner'}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">
          {item.rate ? `$${item.rate.toFixed(1)} / hr` :
            item.status || item.lastSubmission || item.appointment}
        </Text>
        <Text fz="xs" c="dimmed">
          {item.rate ? 'Rate' : 'Status'}
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get('type') || 'default';
  const { data: dashboardData, isLoading, error } = useDashboardData(currentType);

  const dashboardTypes = [
    { label: 'Default', value: 'default' },
    { label: 'Property', value: 'property' },
    { label: 'Teaching', value: 'teaching' },
    { label: 'Vet Store', value: 'vet' }
  ];

  const handleTypeChange = (value: string) => {
    setSearchParams({ type: value });
  };

  if (isLoading) {
    return (
      <Paper p={16}>
        <Stack align="center" justify="center" h={400}>
          <Loader size="lg" />
          <Text>Loading dashboard data...</Text>
        </Stack>
      </Paper>
    );
  }

  if (error || !dashboardData) {
    return (
      <Paper p={16}>
        <Stack align="center" justify="center" h={400}>
          <SvgIcon name="alertTriangle" size={48} />
          <Text>Failed to load dashboard data. Please try again later.</Text>
        </Stack>
      </Paper>
    );
  }

  const chartSeries = Object.keys(dashboardData.chartData[0] ?? [])
    .filter(key => key !== 'month' && key !== 'week' && key !== 'day')
    .map((key, index) => ({
      name: key,
      color: `var(--mantine-primary-color-${6 + index})`
    }));

  const timeKey =
    'month' in (dashboardData.chartData[0] ?? [])
      ? 'month'
      : 'week' in (dashboardData.chartData?.[0] ?? [])
        ? 'week'
        : 'day';

  return (
    <Paper >
      <Stack gap={16}>
        <Group justify="space-between">
          <PageHeader
            title={currentType === 'default' ? 'Task Management' :
              currentType === 'property' ? 'Property Management' :
                currentType === 'teaching' ? 'Teaching Portal' :
                  'Vet Store'}
            subtitle="Dashboard Overview"
          />
          <Group>
            <SegmentedControl
              value={currentType}
              onChange={handleTypeChange}
              data={dashboardTypes}
            />
            <DatePickerInput type="range" rightSection={<SvgIcon name="calendar" />} miw={320} />
          </Group>
        </Group>

        <SimpleGrid mt={16} w="100%" cols={{ xs: 1, md: 2, lg: 4 }} spacing={16}>
          {dashboardData.stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              subtitle={stat.subtitle}
              value={stat.value}
              icon={stat.icon as IconName}
            />
          ))}
        </SimpleGrid>

        <Card withBorder p={16} radius="md">
          <BarChart
            h={300}
            w="100%"
            data={dashboardData.chartData}
            dataKey={timeKey}
            withLegend
            series={chartSeries}
          />
        </Card>

        <Card withBorder p={16} radius="md">
          <Text fz={20} fw={500} mb={16}>
            {currentType === 'default' ? 'Available Talents' :
              currentType === 'property' ? 'Properties Overview' :
                currentType === 'teaching' ? 'Student Performance' :
                  'Patient Records'}
          </Text>
          <UsersStack data={dashboardData.tableData} />
        </Card>
      </Stack>
    </Paper>
  );
};
