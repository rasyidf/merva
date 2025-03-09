import { useTranslation } from "react-i18next";
import { Grid, Paper, Text, RingProgress, Group, Stack, ThemeIcon } from "@mantine/core";
import type { Task } from "../data/schema";
import { SvgIcon } from "@/shared/components/ui/icon";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const { t } = useTranslation();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "done").length;
  const inProgressTasks = tasks.filter(task => task.status === "in progress").length;
  const highPriorityTasks = tasks.filter(task => task.priority === 3).length;

  const averageProgress = Math.round(
    tasks.reduce((sum, task) => sum + task.progressPercentage, 0) / totalTasks
  );

  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <Paper p="md" radius="md">
          <Group>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: completionRate, color: "blue" }]}
              label={
                <Text ta="center" fz="lg" fw={700}>
                  {completionRate}%
                </Text>
              }
            />
            <Stack gap={0}>
              <Text c="dimmed" fz="sm">
                Completion Rate
              </Text>
              <Text fw={500}>
                {completedTasks} / {totalTasks} Tasks
              </Text>
            </Stack>
          </Group>
        </Paper>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <Paper p="md" radius="md">
          <Group>
            <ThemeIcon size={80} radius="md" variant="light" color="yellow">
              <SvgIcon name="clock-5" width={36} height={36} />
            </ThemeIcon>
            <Stack gap={0}>
              <Text c="dimmed" fz="sm">
                In Progress
              </Text>
              <Text fw={500}>{inProgressTasks} Tasks</Text>
            </Stack>
          </Group>
        </Paper>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <Paper p="md" radius="md">
          <Group>
            <ThemeIcon size={80} radius="md" variant="light" color="red">
              <SvgIcon name="alertTriangle" width={36} height={36} />
            </ThemeIcon>
            <Stack gap={0}>
              <Text c="dimmed" fz="sm">
                High Priority
              </Text>
              <Text fw={500}>{highPriorityTasks} Tasks</Text>
            </Stack>
          </Group>
        </Paper>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <Paper p="md" radius="md">
          <Group>
            <RingProgress
              size={80}
              roundCaps
              thickness={8}
              sections={[{ value: averageProgress, color: "green" }]}
              label={
                <Text ta="center" fz="lg" fw={700}>
                  {averageProgress}%
                </Text>
              }
            />
            <Stack gap={0}>
              <Text c="dimmed" fz="sm">
                Average Progress
              </Text>
              <Text fw={500}>Across All Tasks</Text>
            </Stack>
          </Group>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}