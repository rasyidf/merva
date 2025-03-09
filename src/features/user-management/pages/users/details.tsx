import { Avatar, Button, Card, Grid, Group, LoadingOverlay, Paper, Stack, Text } from "@mantine/core";
import { PageHeader } from "@/shared/components/groups/main-header";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteUser, useUser } from "../../hooks";
import { StatusBadge } from "../../components";
import { SvgIcon } from "@/shared/components/ui/icon";
import { modals } from "@mantine/modals";

export const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(id || "");
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = () => {
    modals.openConfirmModal({
      title: "Confirm deletion",
      children: (
        <Text size="sm">
          Are you sure you want to delete this user? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteUserMutation.mutate(id || "", {
        onSuccess: () => {
          navigate("/app/user-management");
        }
      }),
    });
  };

  const handleEditUser = () => {
    navigate(`/app/user-management/users/${id}/edit`);
  };

  if (isLoading) {
    return (
      <Paper p="md" pos="relative">
        <LoadingOverlay visible={true} />
      </Paper>
    );
  }

  if (error || !user) {
    return (
      <Paper p="md">
        <Text c="red">Error loading user details. User might not exist.</Text>
        <Button
          mt="md"
          onClick={() => navigate("/app/user-management")}
          leftSection={<SvgIcon name="arrowLeft" />}
        >
          Back to Users
        </Button>
      </Paper>
    );
  }

  return (
    <Stack gap="md">
      <PageHeader
        title="User Details"
        subtitle={`View information about ${user.fullName}`}
        withBackButton
        onBackClick={() => navigate("/app/user-management")}

      >
        <Group>
          <Button
            variant="outline"
            leftSection={<SvgIcon name="pencil" />}
            onClick={handleEditUser}
          >
            Edit User
          </Button>
          <Button
            variant="outline"
            color="red"
            leftSection={<SvgIcon name="trash" />}
            onClick={handleDeleteUser}
          >
            Delete User
          </Button>
        </Group>
      </PageHeader>

      <Paper p="md" shadow="xs">
        <Card withBorder>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack align="center" gap="md">
                <Avatar
                  size={120}
                  src={user.avatarUrl}
                  radius={120}
                >
                  {user.fullName.charAt(0)}
                </Avatar>
                <Text fw={500} size="xl">
                  {user.fullName}
                </Text>
                <StatusBadge status={user.status} size="md" />
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="md">
                <Card withBorder p="md">
                  <Text fw={600} mb="xs">Basic Information</Text>
                  <Grid>
                    <Grid.Col span={6}>
                      <Text c="dimmed" size="sm">Username</Text>
                      <Text>{user.username}</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c="dimmed" size="sm">Email</Text>
                      <Text>{user.email}</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c="dimmed" size="sm">Phone</Text>
                      <Text>{user.phoneNumber || "Not provided"}</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c="dimmed" size="sm">Last Active</Text>
                      <Text>
                        {user.lastActive
                          ? new Date(user.lastActive).toLocaleString()
                          : "Never"}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Card>

                <Card withBorder p="md">
                  <Text fw={600} mb="xs">Work Information</Text>
                  <Grid>
                    <Grid.Col span={6}>
                      <Text c="dimmed" size="sm">Department</Text>
                      <Text>{user.department || "Not assigned"}</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text c="dimmed" size="sm">Position</Text>
                      <Text>{user.position || "Not assigned"}</Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Text c="dimmed" size="sm">Bio</Text>
                      <Text>{user.bio || "No bio provided"}</Text>
                    </Grid.Col>
                  </Grid>
                </Card>

                <Card withBorder p="md">
                  <Text fw={600} mb="xs">Roles & Permissions</Text>
                  <Text c="dimmed" size="sm">Assigned Roles</Text>
                  <Group mt="xs">
                    {user.roles.length > 0 ? (
                      user.roles.map((role) => (
                        <Button
                          key={role.id}
                          variant="light"
                          size="compact-sm"
                          onClick={() => navigate(`/app/user-management/roles/${role.id}`)}
                        >
                          {role.name}
                        </Button>
                      ))
                    ) : (
                      <Text>No roles assigned</Text>
                    )}
                  </Group>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      </Paper>
    </Stack>
  );
};