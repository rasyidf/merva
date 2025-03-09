import { useTranslation } from "react-i18next";
import type { Task } from "../data/schema";
import { Badge, Grid, Group, Paper, Stack, Text } from "@mantine/core";
import { SvgIcon } from "@/shared/components/ui/icon";
import { categories, labels, statuses, teams, userRoles } from "@/shared/utils/constants/data";

interface TaskDetailsProps {
  task: Task;
  variant?: "card" | "full";
}

export function TaskDetails({ task, variant = "full" }: TaskDetailsProps) {
  const { t } = useTranslation();
  const status = statuses.find(s => s.value === task.status);
  const label = labels.find(l => l.value === task.label);
  const team = teams.find(t => t.value === task.assignedTeam);
  const role = userRoles.find(r => r.value === task.assignedUserRole);
  const category = categories.find(c => c.value === task.category);

  const content = (
    <Grid>
      <Grid.Col span={variant === "full" ? 6 : 12}>
        <Stack gap="xs">
          <Group>
            <Text fw={500}>{t("tasks.form.fields.status")}:</Text>
            <Group gap={4}>
              {status?.icon && <SvgIcon name={status.icon} height={16} width={16} />}
              <Text>{status?.label}</Text>
            </Group>
          </Group>

          <Group>
            <Text fw={500}>{t("tasks.form.fields.label")}:</Text>
            <Badge variant="default">{label?.label}</Badge>
          </Group>

          <Group>
            <Text fw={500}>{t("tasks.form.fields.priority")}:</Text>
            <Badge 
              color={task.priority === 3 ? 'red' : task.priority === 2 ? 'yellow' : 'blue'}
            >
              {t(`tasks.form.priorities.${task.priority === 3 ? 'high' : task.priority === 2 ? 'medium' : 'low'}`)}
            </Badge>
          </Group>

          {variant === "full" && (
            <>
              <Group>
                <Text fw={500}>{t("tasks.form.fields.storyPoints")}:</Text>
                <Text>{task.storyPoints}</Text>
              </Group>

              <Group>
                <Text fw={500}>{t("tasks.form.fields.progress")}:</Text>
                <Text>{task.progressPercentage}%</Text>
              </Group>
            </>
          )}
        </Stack>
      </Grid.Col>

      {variant === "full" && (
        <Grid.Col span={6}>
          <Stack gap="xs">
            <Group>
              <Text fw={500}>{t("tasks.form.fields.assignedTo")}:</Text>
              <Text>{task.assignedUser}</Text>
            </Group>

            <Group>
              <Text fw={500}>{t("tasks.form.fields.role")}:</Text>
              <Text>{role?.label}</Text>
            </Group>

            <Group>
              <Text fw={500}>{t("tasks.form.fields.team")}:</Text>
              <Text>{team?.label}</Text>
            </Group>

            <Group>
              <Text fw={500}>{t("tasks.form.fields.category")}:</Text>
              <Text>{category?.label}</Text>
            </Group>

            <Group>
              <Text fw={500}>{t("tasks.form.fields.tags")}:</Text>
              <Group gap={4}>
                {task.tags.map(tag => (
                  <Badge key={tag} variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Group>
          </Stack>
        </Grid.Col>
      )}

      {variant === "full" && (
        <Grid.Col span={12}>
          <Stack gap="xs">
            <Group>
              <Text fw={500}>Created:</Text>
              <Text>{task.createdDate}</Text>
            </Group>

            <Group>
              <Text fw={500}>Updated:</Text>
              <Text>{task.updatedDate}</Text>
            </Group>

            <Group>
              <Text fw={500}>{t("tasks.form.fields.dueDate")}:</Text>
              <Text>{task.dueDate}</Text>
            </Group>

            <Group>
              <Text fw={500}>{t("tasks.form.fields.estimatedTime")}:</Text>
              <Text>{task.estimatedCompletionTime} hours</Text>
            </Group>
          </Stack>
        </Grid.Col>
      )}
    </Grid>
  );

  if (variant === "card") {
    return <Paper p="md">{content}</Paper>;
  }

  return content;
}