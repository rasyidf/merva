import { Card, Paper, Stack } from "@mantine/core";
import { PageHeader } from "@/shared/components/groups/main-header";
import { RoleForm } from "../../components";
import { useCreateRole } from "../../hooks";
import { RoleFormValues } from "../../types";
import { useNavigate } from "react-router-dom";

export const RoleCreate = () => {
  const navigate = useNavigate();
  const createRoleMutation = useCreateRole();

  const handleCreateRole = (roleData: RoleFormValues) => {
    createRoleMutation.mutate(roleData, {
      onSuccess: () => {
        navigate('/app/user-management/roles');
      }
    });
  };

  return (
    <Stack gap="md">
      <PageHeader 
        title="Create Role"
        subtitle="Add a new role with specific permissions"
        withBackButton
        onBackClick={() => navigate('/app/user-management/roles')}
      />

      <Paper p="md" shadow="xs">
        <Card withBorder p="lg">
          <RoleForm 
            mode="create"
            onSubmit={handleCreateRole}
            loading={createRoleMutation.isPending}
          />
        </Card>
      </Paper>
    </Stack>
  );
};