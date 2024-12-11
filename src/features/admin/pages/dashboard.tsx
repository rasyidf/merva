import { PageHeader } from "@/shared/components/groups/main-header";
import { StatCardProps, StatsCard } from "@/shared/components/groups/stats-card";
import { SvgIcon } from "@/shared/components/ui/icon";
import { BarChart } from "@mantine/charts";
import { Avatar, Card, Group, Paper, Stack, Table, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

const stats = [
  {
    title: "Total Revenue",
    subtitle: "+20.1% from last month",
    value: "$45,231.89",
    icon: "banknote",
  },
  {
    title: "Subscriptions",
    subtitle: "+180.1% from last month",
    value: "+2350",
    icon: "users"
  },
  {
    title: "Sales",
    subtitle: "+19% from last month",
    value: "+12,234",
    icon: "creditCard"
  },
  {
    title: "Active Now",
    subtitle: "+201 since last hour",
    value: "+573",
    icon: "scale"
  },
] satisfies StatCardProps[];

export const data = [
  { month: 'January', Registered: 1200, Processed: 900, Completed: 200 },
  { month: 'February', Registered: 1900, Processed: 1200, Completed: 400 },
  { month: 'March', Registered: 400, Processed: 1000, Completed: 200 },
  { month: 'April', Registered: 1000, Processed: 200, Completed: 800 },
  { month: 'May', Registered: 800, Processed: 1400, Completed: 1200 },
  { month: 'June', Registered: 750, Processed: 600, Completed: 1000 },
];


const userData = [
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    rate: 22,
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
    rate: 45,
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
    rate: 76,
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    rate: 15,
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    rate: 98,
  },
];


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

        <Group mt={16} w="100%">
          {
            stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))
          }
        </Group>
        <Card withBorder p={16} radius="md">
          <BarChart
            h={300}
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
