import { Card, LoadingOverlay, Paper, Stack, Text, Button } from "@mantine/core";
import { PageHeader } from "@/shared/components/groups/main-header";
import { RoleForm } from "../../components";
import { useRole, useUpdateRole } from "../../hooks";
import { RoleFormValues } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { SvgIcon } from "@/shared/components/ui/icon";

export const RoleEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: role, isLoading: isLoadingRole, error } = useRole(id || "");
  const updateRoleMutation = useUpdateRole();

  const handleUpdateRole = (roleData: RoleFormValues) => {
    if (!id) return;
    
    updateRoleMutation.mutate({ 
      id,
      roleData 
    }, {
      onSuccess: () => {
        navigate(`/app/user-management/roles/${id}`);
      }
    });
  };

  if (isLoadingRole) {
    return (
      <Paper p="md" pos="relative">
        <LoadingOverlay visible={true} />
      </Paper>
    );
  }

  if (error || !role) {
    return (
      <Paper p="md">
        <Text c="red">Error loading role. Role might not exist.</Text>
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

  // Don't allow editing system roles
  if (role.isSystem) {
    return (
      <Paper p="md">
        <Text c="red">System roles cannot be edited.</Text>
        <Button
          mt="md"
          onClick={() => navigate(`/app/user-management/roles/${id}`)}
          leftSection={<SvgIcon name="arrowLeft" />}
        >
          Back to Role Details
        </Button>
      </Paper>
    );
  }

  // Convert role to form values
  const initialValues: RoleFormValues = {
    name: role.name,
    description: role.description,
    permissions: role.permissions.map(permission => permission.id),
  };

  return (
    <Stack gap="md">
      <PageHeader 
        title="Edit Role"
        subtitle={`Edit information for ${role.name} role`}
        withBackButton
        onBackClick={() => navigate(`/app/user-management/roles/${id}`)}
      />

      <Paper p="md" shadow="xs">
        <Card withBorder p="lg">
          <RoleForm 
            mode="edit"
            initialValues={initialValues}
            onSubmit={handleUpdateRole}
            loading={updateRoleMutation.isPending}
          />
        </Card>
      </Paper>
    </Stack>
  );
};