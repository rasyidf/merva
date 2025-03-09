import { Card, Paper, Stack } from "@mantine/core";
import { PageHeader } from "@/shared/components/groups/main-header";
import { UserForm } from "../../components";
import { useCreateUser } from "../../hooks";
import { UserFormValues } from "../../types";
import { useNavigate } from "react-router-dom";

export const UserCreate = () => {
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();

  const handleCreateUser = (userData: UserFormValues) => {
    createUserMutation.mutate(userData, {
      onSuccess: () => {
        navigate('/app/user-management');
      }
    });
  };

  return (
    <Stack gap="md">
      <PageHeader 
        title="Create User"
        subtitle="Add a new user to the system"
        withBackButton
        onBackClick={() => navigate('/app/user-management')}
      />

      <Paper p="md" shadow="xs">
        <Card withBorder p="lg">
          <UserForm 
            mode="create"
            onSubmit={handleCreateUser}
            loading={createUserMutation.isPending}
          />
        </Card>
      </Paper>
    </Stack>
  );
};