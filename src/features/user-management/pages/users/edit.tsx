import { Card, LoadingOverlay, Paper, Stack, Text, Button } from "@mantine/core";
import { PageHeader } from "@/shared/components/groups/main-header";
import { UserForm } from "../../components";
import { useUpdateUser, useUser } from "../../hooks";
import { UserFormValues } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { SvgIcon } from "@/shared/components/ui/icon";

export const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading: isLoadingUser, error } = useUser(id || "");
  const updateUserMutation = useUpdateUser();

  const handleUpdateUser = (userData: UserFormValues) => {
    if (!id) return;
    
    updateUserMutation.mutate({ 
      id,
      userData 
    }, {
      onSuccess: () => {
        navigate(`/app/user-management/users/${id}`);
      }
    });
  };

  if (isLoadingUser) {
    return (
      <Paper p="md" pos="relative">
        <LoadingOverlay visible={true} />
      </Paper>
    );
  }

  if (error || !user) {
    return (
      <Paper p="md">
        <Text c="red">Error loading user. User might not exist.</Text>
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

  // Convert user to form values
  const initialValues: UserFormValues = {
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    roles: user.roles.map(role => role.id),
    status: user.status,
    phoneNumber: user.phoneNumber,
    department: user.department,
    position: user.position,
    bio: user.bio,
  };

  return (
    <Stack gap="md">
      <PageHeader 
        title="Edit User"
        subtitle={`Edit information for ${user.fullName}`}
        withBackButton
        onBackClick={() => navigate(`/app/user-management/users/${id}`)}
      />

      <Paper p="md" shadow="xs">
        <Card withBorder p="lg">
          <UserForm 
            mode="edit"
            initialValues={initialValues}
            onSubmit={handleUpdateUser}
            loading={updateUserMutation.isPending}
          />
        </Card>
      </Paper>
    </Stack>
  );
};