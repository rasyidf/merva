import { ActionIcon, Badge, Chip, Group, Menu, Table, Text } from "@mantine/core";
import { Role } from "../types";
import { SvgIcon } from "@/shared/components/ui/icon";
import { useNavigate } from "react-router-dom";

interface RoleTableProps {
  roles: Role[];
  onDelete: (id: string) => void;
}

export const RoleTable = ({ roles, onDelete }: RoleTableProps) => {
  const navigate = useNavigate();

  const handleViewRole = (id: string) => {
    navigate(`/app/user-management/roles/${id}`);
  };

  const handleEditRole = (id: string, isSystem: boolean = false) => {
    if (isSystem) return; // Don't allow editing system roles
    navigate(`/app/user-management/roles/${id}/edit`);
  };

  const handleDeleteRole = (id: string, isSystem: boolean = false) => {
    if (isSystem) return; // Don't allow deleting system roles
    onDelete(id);
  };

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Description</Table.Th>
          <Table.Th>Permissions</Table.Th>
          <Table.Th>Type</Table.Th>
          <Table.Th>Created At</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {roles.map((role) => (
          <Table.Tr key={role.id}>
            <Table.Td>
              <Text fw={500}>{role.name}</Text>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{role.description || "No description"}</Text>
            </Table.Td>
            <Table.Td>
              <Group gap={4}>
                <Badge>{role.permissions.length}</Badge>
                {role.permissions.length > 0 && (
                  <Text size="xs" c="dimmed">
                    {role.permissions.length === 1
                      ? "permission"
                      : "permissions"}
                  </Text>
                )}
              </Group>
            </Table.Td>
            <Table.Td>
              {role.isSystem ? (
                <Badge color="blue" variant="light">
                  System
                </Badge>
              ) : (
                <Badge color="green" variant="light">
                  Custom
                </Badge>
              )}
            </Table.Td>
            <Table.Td>
              {new Date(role.createdAt).toLocaleDateString()}
            </Table.Td>
            <Table.Td>
              <Group gap={0}>
                <Menu position="bottom-end" shadow="md">
                  <Menu.Target>
                    <ActionIcon variant="subtle" aria-label="Role actions">
                      <SvgIcon name="dotsHorizontal" />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item 
                      leftSection={<SvgIcon name="eye" />}
                      onClick={() => handleViewRole(role.id)}
                    >
                      View details
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<SvgIcon name="pencil" />}
                      onClick={() => handleEditRole(role.id, role.isSystem)}
                      disabled={role.isSystem}
                    >
                      {role.isSystem ? "View only" : "Edit role"}
                    </Menu.Item>
                    {!role.isSystem && (
                      <>
                        <Menu.Divider />
                        <Menu.Item 
                          leftSection={<SvgIcon name="trash" />} 
                          color="red"
                          onClick={() => handleDeleteRole(role.id, role.isSystem)}
                          disabled={role.isSystem}
                        >
                          Delete role
                        </Menu.Item>
                      </>
                    )}
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