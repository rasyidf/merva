import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roleService } from "../services/roleService";
import { Role, RoleFilters, RoleFormValues, Permission, PaginatedResult } from "../types";
import { notifications } from "@mantine/notifications";

export const useRoles = (filters: RoleFilters = {}) => {
    return useQuery<PaginatedResult<Role>>({
        queryKey: ['roles', filters],
        queryFn: () => roleService.getRoles(filters),
        placeholderData: keepPreviousData,
        staleTime: 5000, // Consider data fresh for 5 seconds
    });
};

export const useRole = (id: string) => {
    return useQuery({
        queryKey: ['role', id],
        queryFn: () => roleService.getRole(id),
        enabled: !!id,
        staleTime: 5000,
    });
};

export const usePermissions = () => {
    return useQuery({
        queryKey: ['permissions'],
        queryFn: () => roleService.getAllPermissions(),
        staleTime: Infinity, // Permissions rarely change, can be cached indefinitely
    });
};

export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (roleData: RoleFormValues) => roleService.createRole(roleData),
        onSuccess: (newRole) => {
            notifications.show({
                title: 'Success',
                message: 'Role created successfully',
                color: 'green',
            });
            // Optimistically update the roles list
            queryClient.setQueryData<PaginatedResult<Role>>(['roles', {}], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    data: [...old.data, newRole],
                    total: old.total + 1,
                    totalPages: Math.ceil((old.total + 1) / old.pageSize),
                };
            });
        },
        onError: (error: Error) => {
            notifications.show({
                title: 'Error',
                message: `Failed to create role: ${error.message}`,
                color: 'red',
            });
        },
    });
};

export const useUpdateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, roleData }: { id: string; roleData: Partial<RoleFormValues> }) =>
            roleService.updateRole(id, roleData),
        onMutate: async ({ id, roleData }) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['role', id] });
            await queryClient.cancelQueries({ queryKey: ['roles'] });

            // Snapshot the previous value
            const previousRole = queryClient.getQueryData(['role', id]);

            // Optimistically update role
            queryClient.setQueryData(['role', id], (old: Role | undefined) => {
                if (!old) return old;
                return {
                    ...old,
                    ...roleData,
                    updatedAt: new Date().toISOString(),
                };
            });

            return { previousRole };
        },
        onSuccess: (updatedRole) => {
            notifications.show({
                title: 'Success',
                message: `Role ${updatedRole.name} updated successfully`,
                color: 'green',
            });
            queryClient.invalidateQueries({ queryKey: ['roles'] });
            queryClient.setQueryData(['role', updatedRole.id], updatedRole);
        },
        onError: (error: Error, variables, context) => {
            // Rollback to previous values if available
            if (context?.previousRole) {
                queryClient.setQueryData(['role', variables.id], context.previousRole);
            }
            notifications.show({
                title: 'Error',
                message: `Failed to update role: ${error.message}`,
                color: 'red',
            });
        },
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => roleService.deleteRole(id),
        onSuccess: (_data, id) => {
            notifications.show({
                title: 'Success',
                message: 'Role deleted successfully',
                color: 'green',
            });
            // Remove the role from cache
            queryClient.removeQueries({ queryKey: ['role', id] });
            // Update roles list
            queryClient.setQueryData<PaginatedResult<Role>>(['roles', {}], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    data: old.data.filter(role => role.id !== id),
                    total: old.total - 1,
                    totalPages: Math.ceil((old.total - 1) / old.pageSize),
                };
            });
        },
        onError: (error: Error) => {
            notifications.show({
                title: 'Error',
                message: `Failed to delete role: ${error.message}`,
                color: 'red',
            });
        },
    });
};