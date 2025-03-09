import {
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Select,
  Table,
  ActionIcon,
  Menu,
  Modal,
  MultiSelect,
  Tooltip,
  Checkbox,
  Divider
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { SvgIcon } from "@/shared/components/ui/icon";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  status: 'active' | 'pending' | 'inactive';
  lastActive: string;
  permissions: string[];
}

interface InviteFormValues {
  email: string;
  role: string;
  permissions: string[];
}

export const TeamTab = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'Admin',
      avatarUrl: '',
      status: 'active',
      lastActive: '2 hours ago',
      permissions: ['admin', 'edit', 'delete', 'invite']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      role: 'Editor',
      avatarUrl: '',
      status: 'active',
      lastActive: 'Just now',
      permissions: ['edit', 'delete']
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      role: 'Viewer',
      avatarUrl: '',
      status: 'active',
      lastActive: '1 day ago',
      permissions: ['view']
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'Editor',
      avatarUrl: '',
      status: 'pending',
      lastActive: 'Never',
      permissions: ['edit']
    },
    {
      id: '5',
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      role: 'Viewer',
      avatarUrl: '',
      status: 'inactive',
      lastActive: '2 months ago',
      permissions: ['view']
    }
  ];

  const inviteForm = useForm<InviteFormValues>({
    defaultValues: {
      email: '',
      role: 'editor',
      permissions: ['view', 'edit']
    }
  });

  const editForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      permissions: [] as string[]
    }
  });

  const handleInvite = (values: InviteFormValues) => {
    console.log('Inviting:', values);
    notifications.show({
      title: 'Invitation Sent',
      message: `An invitation has been sent to ${values.email}`,
      color: 'green',
    });
    setInviteModalOpen(false);
    inviteForm.reset();
  };

  const handleEdit = (values: any) => {
    console.log('Editing member:', values);
    notifications.show({
      title: 'Member Updated',
      message: `Team member ${values.name} has been updated`,
      color: 'blue',
    });
    setEditingMember(null);
    editForm.reset();
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    editForm.reset({
      name: member.name,
      email: member.email,
      role: member.role.toLowerCase(),
      permissions: member.permissions
    });
  };

  const handleRemoveMember = (member: TeamMember) => {
    notifications.show({
      title: 'Member Removed',
      message: `${member.name} has been removed from the team`,
      color: 'red',
    });
  };

  const handleResendInvite = (member: TeamMember) => {
    notifications.show({
      title: 'Invitation Resent',
      message: `An invitation has been resent to ${member.email}`,
      color: 'blue',
    });
  };

  const statusColor = (status: string) => {
    switch(status) {
      case 'active': return 'green';
      case 'pending': return 'yellow';
      case 'inactive': return 'gray';
      default: return 'gray';
    }
  };

  const availablePermissions = [
    { value: 'view', label: 'View Content' },
    { value: 'edit', label: 'Edit Content' },
    { value: 'delete', label: 'Delete Content' },
    { value: 'admin', label: 'Admin Access' },
    { value: 'invite', label: 'Invite Users' },
    { value: 'billing', label: 'Manage Billing' },
  ];

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
    { value: 'billing', label: 'Billing Admin' },
    { value: 'custom', label: 'Custom Role' },
  ];

  return (
    <Stack w="100%" px="lg">
      <Card withBorder mb="md">
        <Group justify="space-between" mb="lg">
          <div>
            <Text fw={500} size="lg">Team Members</Text>
            <Text size="sm" c="dimmed">Manage your team members and their access</Text>
          </div>
          <Button leftSection={<SvgIcon name="plus" />} onClick={() => setInviteModalOpen(true)}>
            Invite Team Member
          </Button>
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Member</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Last Active</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {teamMembers.map((member) => (
              <Table.Tr key={member.id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size="sm" radius="xl" color="blue" src={member.avatarUrl}>
                      {member.name.charAt(0)}
                    </Avatar>
                    <div>
                      <Text size="sm" fw={500}>{member.name}</Text>
                      <Text size="xs" c="dimmed">{member.email}</Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={member.role === 'Admin' ? 'blue' : member.role === 'Editor' ? 'green' : 'gray'}>
                    {member.role}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={statusColor(member.status)}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                </Table.Td>
                <Table.Td>{member.lastActive}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Menu position="bottom-end" shadow="md">
                      <Menu.Target>
                        <ActionIcon variant="subtle">
                          <SvgIcon name="dotsHorizontal" />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item leftSection={<SvgIcon name="eye" />} onClick={() => openEditModal(member)}>
                          View details
                        </Menu.Item>
                        <Menu.Item leftSection={<SvgIcon name="pencil" />} onClick={() => openEditModal(member)}>
                          Edit member
                        </Menu.Item>
                        {member.status === 'pending' && (
                          <Menu.Item leftSection={<SvgIcon name="send" />} onClick={() => handleResendInvite(member)}>
                            Resend invite
                          </Menu.Item>
                        )}
                        <Menu.Divider />
                        <Menu.Item 
                          leftSection={<SvgIcon name="trash" />} 
                          color="red"
                          onClick={() => handleRemoveMember(member)}
                        >
                          Remove member
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Card withBorder>
        <Text fw={500} size="lg" mb="sm">Role Permissions</Text>
        <Text size="sm" c="dimmed" mb="md">Default permissions assigned to each role</Text>
        
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder p="md">
              <Text fw={500}>Admin</Text>
              <Text size="xs" c="dimmed" mb="md">Full access to all features</Text>
              <Stack gap="xs">
                {availablePermissions.map((perm) => (
                  <Checkbox 
                    key={perm.value}
                    label={perm.label}
                    defaultChecked
                    readOnly
                  />
                ))}
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder p="md">
              <Text fw={500}>Editor</Text>
              <Text size="xs" c="dimmed" mb="md">Can manage content but not settings</Text>
              <Stack gap="xs">
                {availablePermissions.map((perm) => (
                  <Checkbox 
                    key={perm.value}
                    label={perm.label}
                    defaultChecked={['view', 'edit', 'delete'].includes(perm.value)}
                    readOnly
                  />
                ))}
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder p="md">
              <Text fw={500}>Viewer</Text>
              <Text size="xs" c="dimmed" mb="md">Read-only access to content</Text>
              <Stack gap="xs">
                {availablePermissions.map((perm) => (
                  <Checkbox 
                    key={perm.value}
                    label={perm.label}
                    defaultChecked={['view'].includes(perm.value)}
                    readOnly
                  />
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Invite New Member Modal */}
      <Modal 
        opened={inviteModalOpen} 
        onClose={() => setInviteModalOpen(false)}
        title={<Text fw={700} size="lg">Invite Team Member</Text>}
        size="md"
      >
        <form onSubmit={inviteForm.handleSubmit(handleInvite)}>
          <Stack>
            <TextInput
              label="Email Address"
              placeholder="Enter email address"
              required
              {...inviteForm.register('email')}
            />
            <Select
              label="Role"
              placeholder="Select a role"
              data={roleOptions}
              required
              // {...inviteForm.register('role')}
            />
            <MultiSelect
              label="Permissions"
              placeholder="Select permissions"
              data={availablePermissions}
              // {...inviteForm.register('permissions')}
            />
            <Divider my="sm" />
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setInviteModalOpen(false)}>Cancel</Button>
              <Button type="submit">Send Invitation</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Edit Member Modal */}
      <Modal 
        opened={!!editingMember} 
        onClose={() => setEditingMember(null)}
        title={<Text fw={700} size="lg">Edit Team Member</Text>}
        size="md"
      >
        {editingMember && (
          <form onSubmit={editForm.handleSubmit(handleEdit)}>
            <Stack>
              <TextInput
                label="Full Name"
                placeholder="Enter full name"
                required
                {...editForm.register('name')}
              />
              <TextInput
                label="Email Address"
                placeholder="Enter email address"
                required
                {...editForm.register('email')}
              />
              <Select
                label="Role"
                placeholder="Select a role"
                data={roleOptions}
                required
                // {...editForm.register('role')}
              />
              <MultiSelect
                label="Permissions"
                placeholder="Select permissions"
                data={availablePermissions}
                // {...editForm.register('permissions')}
              />
              <Divider my="sm" />
              <Group justify="flex-end" mt="md">
                <Button variant="light" onClick={() => setEditingMember(null)}>Cancel</Button>
                <Button color="red" variant="light" onClick={() => handleRemoveMember(editingMember)}>
                  Remove Member
                </Button>
                <Button type="submit">Save Changes</Button>
              </Group>
            </Stack>
          </form>
        )}
      </Modal>
    </Stack>
  );
};