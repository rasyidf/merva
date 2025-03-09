import { Button, Card, Group, Pagination, Paper, Stack, Text, TextInput } from "@mantine/core";
import { PageHeader } from "@/shared/components/groups/main-header";
import { useNavigate } from "react-router-dom";
import { SvgIcon } from "@/shared/components/ui/icon";
import { useState } from "react";
import { useDeleteRole, useRoles } from "../../hooks";
import { RoleTable } from "../../components";
import { modals } from "@mantine/modals";

export const RoleList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  
  const { data: rolesData, isLoading } = useRoles({
    search,
    page,
    pageSize,
  });
  
  const deleteRoleMutation = useDeleteRole();

  const handleDeleteRole = (id: string) => {
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
      onConfirm: () => deleteRoleMutation.mutate(id),
    });
  };

  const handleCreateRole = () => {
    navigate('/app/user-management/roles/create');
  };

  return (
    <Stack gap="md">
      <PageHeader 
        title="Role Management" 
        subtitle="Manage roles and their permissions"
      />

      <Paper p="md" shadow="xs">
        <Group justify="space-between" mb="md">
          <TextInput
            placeholder="Search roles..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            leftSection={<SvgIcon name="magnifyingGlass" />}
            style={{ maxWidth: '300px' }}
          />
          <Button 
            leftSection={<SvgIcon name="plus" />}
            onClick={handleCreateRole}
          >
            Add Role
          </Button>
        </Group>

        <Card withBorder>
          {isLoading ? (
            <Text>Loading roles...</Text>
          ) : rolesData && rolesData.data.length > 0 ? (
            <>
              <RoleTable 
                roles={rolesData.data} 
                onDelete={handleDeleteRole}
              />
              {rolesData.totalPages > 1 && (
                <Group justify="center" mt="md">
                  <Pagination
                    value={page}
                    onChange={setPage}
                    total={rolesData.totalPages}
                  />
                </Group>
              )}
            </>
          ) : (
            <Text>No roles found.</Text>
          )}
        </Card>
      </Paper>
    </Stack>
  );
};