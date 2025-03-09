import { ActionIcon, Avatar, Badge, Group, Menu, Table, Text } from "@mantine/core";
import { User } from "../types";
import { StatusBadge } from "./StatusBadge";
import { SvgIcon } from "@/shared/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
}

export const UserTable = ({ users, onDelete }: UserTableProps) => {
  const navigate = useNavigate();

  const handleViewUser = (id: string) => {
    navigate(`/app/user-management/users/${id}`);
  };

  const handleEditUser = (id: string) => {
    navigate(`/app/user-management/users/${id}/edit`);
  };

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Username</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Roles</Table.Th>
          <Table.Th>Department</Table.Th>
          <Table.Th>Last Active</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {users.map((user) => (
          <Table.Tr key={user.id}>
            <Table.Td>
              <Group gap="sm">
                <Avatar src={user.avatarUrl} radius="xl" size="sm">
                  {user.fullName.charAt(0)}
                </Avatar>
                <div>
                  <Text size="sm" fw={500}>
                    {user.fullName}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {user.email}
                  </Text>
                </div>
              </Group>
            </Table.Td>
            <Table.Td>{user.username}</Table.Td>
            <Table.Td>
              <StatusBadge status={user.status} />
            </Table.Td>
            <Table.Td>
              <Group gap={4}>
                {user.roles.map((role) => (
                  <Badge key={role.id} size="sm" variant="light">
                    {role.name}
                  </Badge>
                ))}
              </Group>
            </Table.Td>
            <Table.Td>{user.department || "-"}</Table.Td>
            <Table.Td>{user.lastActive ? new Date(user.lastActive).toLocaleDateString() : "Never"}</Table.Td>
            <Table.Td>
              <Group gap={0}>
                <Menu position="bottom-end" shadow="md">
                  <Menu.Target>
                    <ActionIcon variant="subtle" aria-label="User actions">
                      <SvgIcon name="dotsHorizontal" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item 
                      leftSection={<SvgIcon name="eye" />}
                      onClick={() => handleViewUser(user.id)}
                    >
                      View details
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<SvgIcon name="pencil" />}
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit user
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item 
                      leftSection={<SvgIcon name="trash" />} 
                      color="red"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete user
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};