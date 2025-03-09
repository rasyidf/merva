import { Button, Card, Group, LoadingOverlay, Paper, Stack, Text, Badge, Table } from "@mantine/core";
import { PageHeader } from "@/shared/components/groups/main-header";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteRole, useRole } from "../../hooks";
import { SvgIcon } from "@/shared/components/ui/icon";
import { modals } from "@mantine/modals";

export const RoleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: role, isLoading, error } = useRole(id || "");
  const deleteRoleMutation = useDeleteRole();

  const handleDeleteRole = () => {
    if (role?.isSystem) {
      modals.openContextModal({
        modal: "alert",
        title: "Cannot Delete System Role",
        innerProps: {
          children: (
            <Text size="sm">
              This is a system-defined role and cannot be deleted. System roles are essential for the application to function correctly.
            </Text>
          ),
        },
      });
      return;
    }

    modals.openConfirmModal({
      title: "Confirm deletion",
      children: (
        <Text size="sm">
          Are you sure you want to delete this role? Users assigned to this role will lose these permissions.
          This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteRoleMutation.mutate(id || "", {
        onSuccess: () => {
          navigate("/app/user-management/roles");
        }
      }),
    });
  };

  const handleEditRole = () => {
    if (role?.isSystem) {
      // Show modal explaining that system roles cannot be edited
      modals.openContextModal({
        modal: "alert",
        title: "Cannot Edit System Role",
        innerProps: {
          children: (
            <Text size="sm">
              This is a system-defined role and cannot be edited. System roles are essential for the application to function correctly.
            </Text>
          ),
        },
      });
      return;
    }
    navigate(`/app/user-management/roles/${id}/edit`);
  };

  if (isLoading) {
    return (
      <Paper p="md" pos="relative">
        <LoadingOverlay visible={true} />
      </Paper>
    );
  }

  if (error || !role) {
    return (
      <Paper p="md">
        <Text c="red">Error loading role details. Role might not exist.</Text>
        <Button
          mt="md"
          onClick={() => navigate("/app/user-management/roles")}
          leftSection={<SvgIcon name="arrowLeft" />}
        >
          Back to Roles
        </Button>
      </Paper>
    );
  }

  // Group permissions by resource
  const groupedPermissions: Record<string, typeof role.permissions> = {};
  role.permissions.forEach(permission => {
    if (!groupedPermissions[permission.resource]) {
      groupedPermissions[permission.resource] = [];
    }
    groupedPermissions[permission.resource]?.push(permission);
  });

  return (
    <Stack gap="md">
      <PageHeader
        title="Role Details"
        subtitle={`View information about the ${role.name} role`}
        withBackButton
        onBackClick={() => navigate("/app/user-management/roles")}
       
      >
        <Group>
            <Button
              variant="outline"
              leftSection={<SvgIcon name="pencil" />}
              onClick={handleEditRole}
              disabled={role.isSystem}
            >
              {role.isSystem ? "System Role (Read Only)" : "Edit Role"}
            </Button>
            {!role.isSystem && (
              <Button
                variant="outline"
                color="red"
                leftSection={<SvgIcon name="trash" />}
                onClick={handleDeleteRole}
              >
                Delete Role
              </Button>
            )}
          </Group>
      </PageHeader>

      <Paper p="md" shadow="xs">
        <Card withBorder mb="md">
          <Group justify="space-between" mb="xs">
            <Text fw={600} size="lg">{role.name}</Text>
            {role.isSystem ? (
              <Badge color="blue">System Role</Badge>
            ) : (
              <Badge color="green">Custom Role</Badge>
            )}
          </Group>
          <Text size="sm" mb="md">{role.description || "No description provided"}</Text>
          <Text size="xs" c="dimmed">Created: {new Date(role.createdAt).toLocaleString()}</Text>
          {role.updatedAt && (
            <Text size="xs" c="dimmed">Last updated: {new Date(role.updatedAt).toLocaleString()}</Text>
          )}
        </Card>

        <Card withBorder>
          <Text fw={600} size="lg" mb="md">Permissions ({role.permissions.length})</Text>

          {Object.keys(groupedPermissions).length > 0 ? (
            <>
              {Object.entries(groupedPermissions).map(([resource, permissions]) => (
                <Stack key={resource} mb="lg">
                  <Text fw={500} tt="capitalize">{resource}</Text>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Permission</Table.Th>
                        <Table.Th>Action</Table.Th>
                        <Table.Th>Description</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {permissions.map(permission => (
                        <Table.Tr key={permission.id}>
                          <Table.Td>{permission.name}</Table.Td>
                          <Table.Td>
                            <Badge size="sm" variant="light" tt="capitalize">{permission.action}</Badge>
                          </Table.Td>
                          <Table.Td>{permission.description || '-'}</Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Stack>
              ))}
            </>
          ) : (
            <Text>This role has no assigned permissions.</Text>
          )}
        </Card>
      </Paper>
    </Stack>
  );
};