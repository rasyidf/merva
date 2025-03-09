import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { User, UserFilters, UserFormValues } from "../types";
import { notifications } from "@mantine/notifications";

export const useUsers = (filters: UserFilters = {}) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => userService.getUsers(filters),
    initialData: keepPreviousData,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserFormValues) => userService.createUser(userData),
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'User created successfully',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: `Failed to create user: ${error.message}`,
        color: 'red',
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: Partial<UserFormValues> }) => 
      userService.updateUser(id, userData),
    onSuccess: (data: User) => {
      notifications.show({
        title: 'Success',
        message: `User ${data.fullName} updated successfully`,
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: `Failed to update user: ${error.message}`,
        color: 'red',
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: (_data, id) => {
      notifications.show({
        title: 'Success',
        message: 'User deleted successfully',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.removeQueries({ queryKey: ['user', id] });
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: `Failed to delete user: ${error.message}`,
        color: 'red',
      });
    },
  });
};