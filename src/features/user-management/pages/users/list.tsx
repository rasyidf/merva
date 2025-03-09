import { Button, Card, Group, Pagination, Paper, Select, Stack, Text, TextInput } from "@mantine/core";
import { PageHeader } from "@/shared/components/groups/main-header";
import { useNavigate } from "react-router-dom";
import { SvgIcon } from "@/shared/components/ui/icon";
import { useState } from "react";
import { User, UserStatus } from "../../types";
import { useDeleteUser, useUsers } from "../../hooks";
import { UserTable } from "../../components";
import { featureId } from "../..";
import { modals } from "@mantine/modals";

export const UserList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<UserStatus | "all">("all");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const { data, isLoading } = useUsers({
        search,
        status: status !== "all" ? status as UserStatus : undefined,
        page,
        pageSize,
    });

    const usersData = data as {
        data: User[];
        totalPages: number;
        totalCount: number;
    };

    const deleteUserMutation = useDeleteUser();

    const handleDeleteUser = (id: string) => {
        modals.openConfirmModal({
            title: "Confirm deletion",
            children: (
                <Text size="sm">
                    Are you sure you want to delete this user? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onConfirm: () => deleteUserMutation.mutate(id),
        });
    };

    const handleCreateUser = () => {
        navigate('/app/user-management/users/create');
    };

    return (
        <Stack gap="md">
            <PageHeader
                title="User Management"
                subtitle="Manage users and their access permissions"
            />

            <Paper p="md" shadow="xs">
                <Group justify="space-between" mb="md">
                    <Group>
                        <TextInput
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                            leftSection={<SvgIcon name="magnifyingGlass" />}
                        />
                        <Select
                            placeholder="Filter by status"
                            value={status}
                            onChange={(value) => setStatus(value as UserStatus | "all")}
                            data={[
                                { value: "all", label: "All statuses" },
                                { value: "active", label: "Active" },
                                { value: "inactive", label: "Inactive" },
                                { value: "pending", label: "Pending" },
                                { value: "suspended", label: "Suspended" },
                            ]}
                        />
                    </Group>
                    <Button
                        leftSection={<SvgIcon name="plus" />}
                        onClick={handleCreateUser}
                    >
                        Add User
                    </Button>
                </Group>

                <Card withBorder>
                    {isLoading ? (
                        <Text>Loading users...</Text>
                    ) : usersData && usersData.data.length > 0 ? (
                        <>
                            <UserTable
                                users={usersData.data}
                                onDelete={handleDeleteUser}
                            />
                            {usersData.totalPages > 1 && (
                                <Group justify="center" mt="md">
                                    <Pagination
                                        value={page}
                                        onChange={setPage}
                                        total={usersData.totalPages}
                                    />
                                </Group>
                            )}
                        </>
                    ) : (
                        <Text>No users found.</Text>
                    )}
                </Card>
            </Paper>
        </Stack>
    );
};