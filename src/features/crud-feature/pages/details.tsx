import { PageHeader } from "@/shared/components/groups/main-header";
import { Alert, Badge, Grid, Group, LoadingOverlay, Paper, Stack, Text, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { TaskService } from "../services/taskService";
import { useEffect, useState } from "react";
import type { Task } from "../data/schema";
import { categories, labels, statuses, teams, userRoles } from "@/shared/utils/constants/data";
import { SvgIcon } from "@/shared/components/ui/icon";

export const EntityDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return;
      try {
        const taskService = new TaskService();
        const taskData = await taskService.getTask(id);
        if (!taskData) {
          setError("Task not found");
          return;
        }
        setTask(taskData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  if (error) {
    return (
      <Paper p="md">
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Paper>
    );
  }

  const status = statuses.find(s => s.value === task?.status);
  const label = labels.find(l => l.value === task?.label);
  const team = teams.find(t => t.value === task?.assignedTeam);
  const role = userRoles.find(r => r.value === task?.assignedUserRole);
  const category = categories.find(c => c.value === task?.category);

  return (
    <Paper p="md" pos="relative">
      <LoadingOverlay visible={loading} />
      <Stack>
        <PageHeader
          title={`Task ${task?.id}`}
          subtitle={task?.title}
        >
          <Group>
            <Button variant="light" onClick={() => navigate('../')}>
              Back to List
            </Button>
            <Button onClick={() => navigate(`../edit/${task?.id}`)}>
              Edit Task
            </Button>
          </Group>
        </PageHeader>

        {task && (
          <Grid>
            <Grid.Col span={6}>
              <Stack>
                <Group>
                  <Text fw={500}>Status:</Text>
                  <Group gap={4}>
                    {status?.icon && <SvgIcon name={status.icon} height={16} width={16} />}
                    <Text>{status?.label}</Text>
                  </Group>
                </Group>

                <Group>
                  <Text fw={500}>Label:</Text>
                  <Badge variant="default">{label?.label}</Badge>
                </Group>

                <Group>
                  <Text fw={500}>Priority:</Text>
                  <Badge
                    color={task.priority === 3 ? 'red' : task.priority === 2 ? 'yellow' : 'blue'}
                  >
                    {task.priority === 3 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}
                  </Badge>
                </Group>

                <Group>
                  <Text fw={500}>Story Points:</Text>
                  <Text>{task.storyPoints}</Text>
                </Group>

                <Group>
                  <Text fw={500}>Progress:</Text>
                  <Text>{task.progressPercentage}%</Text>
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={6}>
              <Stack>
                <Group>
                  <Text fw={500}>Assigned To:</Text>
                  <Text>{task.assignedUser}</Text>
                </Group>

                <Group>
                  <Text fw={500}>Role:</Text>
                  <Text>{role?.label}</Text>
                </Group>

                <Group>
                  <Text fw={500}>Team:</Text>
                  <Text>{team?.label}</Text>
                </Group>

                <Group>
                  <Text fw={500}>Category:</Text>
                  <Text>{category?.label}</Text>
                </Group>

                <Group>
                  <Text fw={500}>Tags:</Text>
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

            <Grid.Col span={12}>
              <Stack>
                <Group>
                  <Text fw={500}>Created:</Text>
                  <Text>{task.createdDate}</Text>
                </Group>

                <Group>
                  <Text fw={500}>Updated:</Text>
                  <Text>{task.updatedDate}</Text>
                </Group>

                <Group>
                  <Text fw={500}>Due Date:</Text>
                  <Text>{task.dueDate}</Text>
                </Group>

                <Group>
                  <Text fw={500}>Estimated Time:</Text>
                  <Text>{task.estimatedCompletionTime} hours</Text>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        )}
      </Stack>
    </Paper>
  );
};

export default EntityDetails;
