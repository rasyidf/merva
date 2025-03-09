import { SvgIcon } from "@/shared/components/ui/icon";
import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Group,
    Menu,
    Modal,
    Paper,
    Progress,
    SegmentedControl,
    Select,
    Stack,
    Switch,
    Table,
    Tabs,
    Text,
    TextInput
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Tenant {
    id: string;
    name: string;
    domain: string;
    plan: string;
    status: 'active' | 'suspended' | 'trial';
    usersCount: number;
    createdAt: string;
    storageUsed: number;
    storageLimit: number;
    logo?: string;
}

interface TenantFormValues {
    name: string;
    domain: string;
    plan: string;
    storageLimit: number;
    userLimit: number;
    customDomain: boolean;
    whiteLabel: boolean;
}

export const TenantsTab = () => {
    const [tenantModalOpen, setTenantModalOpen] = useState(false);
    const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
    const [viewMode, setViewMode] = useState<string>('list');

    const tenants: Tenant[] = [
        {
            id: '1',
            name: 'Acme Corporation',
            domain: 'acme',
            plan: 'Enterprise',
            status: 'active',
            usersCount: 45,
            createdAt: '2023-01-15',
            storageUsed: 15.8,
            storageLimit: 100
        },
        {
            id: '2',
            name: 'Startup Labs',
            domain: 'startuplabs',
            plan: 'Pro',
            status: 'active',
            usersCount: 12,
            createdAt: '2023-03-22',
            storageUsed: 7.2,
            storageLimit: 20
        },
        {
            id: '3',
            name: 'Tech Innovators',
            domain: 'techinnovate',
            plan: 'Enterprise',
            status: 'active',
            usersCount: 67,
            createdAt: '2022-11-05',
            storageUsed: 54.3,
            storageLimit: 100
        },
        {
            id: '4',
            name: 'New Ventures',
            domain: 'newventures',
            plan: 'Starter',
            status: 'trial',
            usersCount: 5,
            createdAt: '2023-11-28',
            storageUsed: 1.2,
            storageLimit: 5
        },
        {
            id: '5',
            name: 'Global Solutions',
            domain: 'globalsolutions',
            plan: 'Pro',
            status: 'suspended',
            usersCount: 23,
            createdAt: '2023-02-10',
            storageUsed: 18.5,
            storageLimit: 20
        }
    ];

    const tenantForm = useForm<TenantFormValues>({
        defaultValues: {
            name: '',
            domain: '',
            plan: 'pro',
            storageLimit: 20,
            userLimit: 20,
            customDomain: false,
            whiteLabel: false
        }
    });

    const handleCreateTenant = (values: TenantFormValues) => {
        console.log('Creating tenant:', values);
        notifications.show({
            title: 'Tenant Created',
            message: `New tenant ${values.name} has been created`,
            color: 'green',
        });
        setTenantModalOpen(false);
        tenantForm.reset();
    };

    const handleEditTenant = (values: TenantFormValues) => {
        console.log('Editing tenant:', values);
        notifications.show({
            title: 'Tenant Updated',
            message: `Tenant ${values.name} has been updated`,
            color: 'blue',
        });
        setEditingTenant(null);
    };

    const openEditTenantModal = (tenant: Tenant) => {
        setEditingTenant(tenant);
        tenantForm.reset({
            name: tenant.name,
            domain: tenant.domain,
            plan: tenant.plan.toLowerCase(),
            storageLimit: tenant.storageLimit,
            userLimit: tenant.usersCount,
            customDomain: tenant.plan === 'Enterprise',
            whiteLabel: tenant.plan === 'Enterprise'
        });
    };

    const handleSuspendTenant = (tenant: Tenant) => {
        notifications.show({
            title: 'Tenant Suspended',
            message: `${tenant.name} has been suspended`,
            color: 'yellow',
        });
    };

    const handleDeleteTenant = (tenant: Tenant) => {
        notifications.show({
            title: 'Tenant Deleted',
            message: `${tenant.name} has been deleted`,
            color: 'red',
        });
    };

    const statusColor = (status: string) => {
        switch (status) {
            case 'active': return 'green';
            case 'trial': return 'blue';
            case 'suspended': return 'red';
            default: return 'gray';
        }
    };

    const planOptions = [
        { value: 'starter', label: 'Starter' },
        { value: 'pro', label: 'Professional' },
        { value: 'enterprise', label: 'Enterprise' },
    ];

    const storagePercentage = (used: number, limit: number) => {
        return Math.round((used / limit) * 100);
    };

    const storageColor = (percentage: number) => {
        if (percentage > 90) return 'red';
        if (percentage > 70) return 'yellow';
        return 'blue';
    };

    return (
        <Stack w="100%" px="lg">
            <Group justify="space-between" mb="md">
                <div>
                    <Text fw={500} size="lg">Tenants</Text>
                    <Text size="sm" c="dimmed">Manage all your SaaS tenants</Text>
                </div>
                <Group>
                    <SegmentedControl
                        value={viewMode}
                        onChange={setViewMode}
                        data={[
                            {
                                value: 'list',
                                label: (
                                    <Group gap={5} wrap="nowrap">
                                        <SvgIcon name="layoutList" />
                                        <Box>List</Box>
                                    </Group>
                                ),
                            },
                            {
                                value: 'grid',
                                label: (
                                    <Group gap={5} wrap="nowrap">
                                        <SvgIcon name="layoutGrid" />
                                        <Box>Grid</Box>
                                    </Group>
                                ),
                            },
                        ]}
                    />
                    <Button leftSection={<SvgIcon name="plus" />} onClick={() => setTenantModalOpen(true)}>
                        Add Tenant
                    </Button>
                </Group>
            </Group>

            {viewMode === 'list' ? (
                <Card withBorder>
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Organization</Table.Th>
                                <Table.Th>Domain</Table.Th>
                                <Table.Th>Plan</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Users</Table.Th>
                                <Table.Th>Storage</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {tenants.map((tenant) => (
                                <Table.Tr key={tenant.id}>
                                    <Table.Td>
                                        <Group gap="sm">
                                            <Avatar size="sm" radius="sm" color="blue" src={tenant.logo}>
                                                {tenant.name.charAt(0)}
                                            </Avatar>
                                            <Text size="sm" fw={500}>{tenant.name}</Text>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Text size="sm">{tenant.domain}.app.example.com</Text>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge variant="light" color={
                                            tenant.plan === 'Enterprise' ? 'violet' :
                                                tenant.plan === 'Pro' ? 'blue' : 'gray'
                                        }>
                                            {tenant.plan}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge color={statusColor(tenant.status)}>
                                            {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>{tenant.usersCount}</Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <Text size="xs" w={55}>
                                                {tenant.storageUsed}GB / {tenant.storageLimit}GB
                                            </Text>
                                            <Progress
                                                value={storagePercentage(tenant.storageUsed, tenant.storageLimit)}
                                                color={storageColor(storagePercentage(tenant.storageUsed, tenant.storageLimit))}
                                                size="sm"
                                                w={60}
                                            />
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Menu position="bottom-end" shadow="md">
                                            <Menu.Target>
                                                <ActionIcon variant="subtle">
                                                    <SvgIcon name="dotsHorizontal" />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item leftSection={<SvgIcon name="eye" />} onClick={() => openEditTenantModal(tenant)}>
                                                    View details
                                                </Menu.Item>
                                                <Menu.Item leftSection={<SvgIcon name="pencil" />} onClick={() => openEditTenantModal(tenant)}>
                                                    Edit tenant
                                                </Menu.Item>
                                                <Menu.Item leftSection={<SvgIcon name="users" />}>
                                                    Manage users
                                                </Menu.Item>
                                                <Menu.Divider />
                                                {tenant.status !== 'suspended' ? (
                                                    <Menu.Item
                                                        leftSection={<SvgIcon name="circleX" />}
                                                        color="yellow"
                                                        onClick={() => handleSuspendTenant(tenant)}
                                                    >
                                                        Suspend tenant
                                                    </Menu.Item>
                                                ) : (
                                                    <Menu.Item
                                                        leftSection={<SvgIcon name="circleCheck" />}
                                                        color="green"
                                                    >
                                                        Reactivate tenant
                                                    </Menu.Item>
                                                )}
                                                <Menu.Item
                                                    leftSection={<SvgIcon name="trash" />}
                                                    color="red"
                                                    onClick={() => handleDeleteTenant(tenant)}
                                                >
                                                    Delete tenant
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Card>
            ) : (
                <Grid>
                    {tenants.map((tenant) => (
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={tenant.id}>
                            <Card withBorder p="md">
                                <Card.Section p="md">
                                    <Group justify="space-between">
                                        <Group gap="sm">
                                            <Avatar size="md" radius="sm" color="blue" src={tenant.logo}>
                                                {tenant.name.charAt(0)}
                                            </Avatar>
                                            <div>
                                                <Text fw={500}>{tenant.name}</Text>
                                                <Text size="xs" c="dimmed">{tenant.domain}.app.example.com</Text>
                                            </div>
                                        </Group>
                                        <Badge color={statusColor(tenant.status)}>
                                            {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                                        </Badge>
                                    </Group>
                                </Card.Section>

                                <Stack mt="md" gap="sm">
                                    <Group justify="space-between">
                                        <Text size="sm" c="dimmed">Plan:</Text>
                                        <Badge variant="light" color={
                                            tenant.plan === 'Enterprise' ? 'violet' :
                                                tenant.plan === 'Pro' ? 'blue' : 'gray'
                                        }>
                                            {tenant.plan}
                                        </Badge>
                                    </Group>

                                    <Group justify="space-between">
                                        <Text size="sm" c="dimmed">Users:</Text>
                                        <Text size="sm">{tenant.usersCount}</Text>
                                    </Group>

                                    <div>
                                        <Group justify="space-between">
                                            <Text size="sm" c="dimmed">Storage:</Text>
                                            <Text size="sm">{tenant.storageUsed}GB / {tenant.storageLimit}GB</Text>
                                        </Group>
                                        <Progress
                                            value={storagePercentage(tenant.storageUsed, tenant.storageLimit)}
                                            color={storageColor(storagePercentage(tenant.storageUsed, tenant.storageLimit))}
                                            size="sm"
                                            mt={5}
                                        />
                                    </div>

                                    <Group justify="space-between">
                                        <Text size="sm" c="dimmed">Created:</Text>
                                        <Text size="sm">{tenant.createdAt}</Text>
                                    </Group>
                                </Stack>

                                <Group mt="md" gap="xs">
                                    <Button variant="light" size="xs" onClick={() => openEditTenantModal(tenant)}>
                                        Edit
                                    </Button>
                                    {tenant.status !== 'suspended' ? (
                                        <Button variant="light" color="yellow" size="xs" onClick={() => handleSuspendTenant(tenant)}>
                                            Suspend
                                        </Button>
                                    ) : (
                                        <Button variant="light" color="green" size="xs">
                                            Reactivate
                                        </Button>
                                    )}
                                    <Button variant="light" color="red" size="xs" onClick={() => handleDeleteTenant(tenant)}>
                                        Delete
                                    </Button>
                                </Group>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            )}

            <Card withBorder mt="xl">
                <Tabs defaultValue="domains">
                    <Tabs.List mb="md">
                        <Tabs.Tab value="domains" leftSection={<SvgIcon name="globe" />}>Domain Settings</Tabs.Tab>
                        <Tabs.Tab value="branding" leftSection={<SvgIcon name="paintbrush" />}>Branding</Tabs.Tab>
                        <Tabs.Tab value="limits" leftSection={<SvgIcon name="gauge" />}>Resource Limits</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="domains">
                        <Stack>
                            <Text fw={500} size="md">Default Domain Configuration</Text>
                            <Text size="sm" c="dimmed">Configure the default domain settings for all tenants</Text>

                            <Grid>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label="Base Domain"
                                        placeholder="app.example.com"
                                        defaultValue="app.example.com"
                                    />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 6 }}>
                                    <TextInput
                                        label="Subdomain Format"
                                        placeholder="{tenant}.app.example.com"
                                        defaultValue="{tenant}.app.example.com"
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Switch
                                        label="Allow custom domains for Enterprise plan"
                                        description="Enterprise tenants can configure their own domains"
                                        defaultChecked
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Switch
                                        label="Automatic SSL certificate generation"
                                        description="Automatically generate SSL certificates for tenant domains"
                                        defaultChecked
                                    />
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="branding">
                        <Stack>
                            <Text fw={500} size="md">Multi-tenant Branding</Text>
                            <Text size="sm" c="dimmed">Configure branding options available to tenants</Text>

                            <Grid>
                                <Grid.Col span={12}>
                                    <Switch
                                        label="Allow custom logo uploads"
                                        description="Tenants can upload their own logos"
                                        defaultChecked
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Switch
                                        label="Allow theme customization"
                                        description="Tenants can customize colors and theme settings"
                                        defaultChecked
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Switch
                                        label="White labeling for Enterprise plans"
                                        description="Enterprise tenants can remove all references to your brand"
                                        defaultChecked
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Switch
                                        label="Custom CSS for Enterprise plans"
                                        description="Enterprise tenants can add custom CSS"
                                        defaultChecked
                                    />
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="limits">
                        <Stack>
                            <Text fw={500} size="md">Default Resource Limits</Text>
                            <Text size="sm" c="dimmed">Configure default resource limits by plan</Text>

                            <Grid>
                                <Grid.Col span={{ base: 12, md: 4 }}>
                                    <Paper withBorder p="md">
                                        <Text fw={500} mb="sm">Starter Plan</Text>
                                        <Stack gap="xs">
                                            <Group justify="space-between">
                                                <Text size="sm">Storage:</Text>
                                                <Text size="sm">5GB</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">Users:</Text>
                                                <Text size="sm">5</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">API Rate Limit:</Text>
                                                <Text size="sm">60 req/min</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">Custom Domains:</Text>
                                                <Text size="sm">No</Text>
                                            </Group>
                                        </Stack>
                                    </Paper>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 4 }}>
                                    <Paper withBorder p="md">
                                        <Text fw={500} mb="sm">Professional Plan</Text>
                                        <Stack gap="xs">
                                            <Group justify="space-between">
                                                <Text size="sm">Storage:</Text>
                                                <Text size="sm">20GB</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">Users:</Text>
                                                <Text size="sm">20</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">API Rate Limit:</Text>
                                                <Text size="sm">300 req/min</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">Custom Domains:</Text>
                                                <Text size="sm">No</Text>
                                            </Group>
                                        </Stack>
                                    </Paper>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 4 }}>
                                    <Paper withBorder p="md">
                                        <Text fw={500} mb="sm">Enterprise Plan</Text>
                                        <Stack gap="xs">
                                            <Group justify="space-between">
                                                <Text size="sm">Storage:</Text>
                                                <Text size="sm">100GB</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">Users:</Text>
                                                <Text size="sm">Unlimited</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">API Rate Limit:</Text>
                                                <Text size="sm">1000 req/min</Text>
                                            </Group>
                                            <Group justify="space-between">
                                                <Text size="sm">Custom Domains:</Text>
                                                <Text size="sm">Yes</Text>
                                            </Group>
                                        </Stack>
                                    </Paper>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Card>

            {/* Create Tenant Modal */}
            <Modal
                opened={tenantModalOpen}
                onClose={() => setTenantModalOpen(false)}
                title={<Text fw={700} size="lg">Create New Tenant</Text>}
                size="lg"
            >
                <form onSubmit={tenantForm.handleSubmit(handleCreateTenant)}>
                    <Stack>
                        <TextInput
                            label="Organization Name"
                            placeholder="Enter organization name"
                            required
                            {...tenantForm.register('name')}
                        />
                        <TextInput
                            label="Subdomain"
                            placeholder="Enter subdomain (e.g. acme)"
                            description="This will create a URL like subdomain.app.example.com"
                            required
                            {...tenantForm.register('domain')}
                        />
                        <Select
                            label="Plan"
                            placeholder="Select a plan"
                            data={planOptions}
                            required
                            // {...tenantForm.register('plan')}
                        />

                        <Grid>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="Storage Limit (GB)"
                                    placeholder="Enter storage limit"
                                    type="number"
                                    {...tenantForm.register('storageLimit', { valueAsNumber: true })}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <TextInput
                                    label="User Limit"
                                    placeholder="Enter user limit"
                                    type="number"
                                    {...tenantForm.register('userLimit', { valueAsNumber: true })}
                                />
                            </Grid.Col>
                        </Grid>

                        <Switch
                            label="Allow Custom Domain"
                            description="Tenant can configure their own custom domain"
                            {...tenantForm.register('customDomain')}
                        />

                        <Switch
                            label="Enable White Labeling"
                            description="Tenant can remove all branding and use their own"
                            {...tenantForm.register('whiteLabel')}
                        />

                        <Divider my="sm" />
                        <Group justify="flex-end" mt="md">
                            <Button variant="light" onClick={() => setTenantModalOpen(false)}>Cancel</Button>
                            <Button type="submit">Create Tenant</Button>
                        </Group>
                    </Stack>
                </form>
            </Modal>

            {/* Edit Tenant Modal */}
            <Modal
                opened={!!editingTenant}
                onClose={() => setEditingTenant(null)}
                title={<Text fw={700} size="lg">Edit Tenant</Text>}
                size="lg"
            >
                {editingTenant && (
                    <form onSubmit={tenantForm.handleSubmit(handleEditTenant)}>
                        <Stack>
                            <TextInput
                                label="Organization Name"
                                placeholder="Enter organization name"
                                required
                                {...tenantForm.register('name')}
                            />
                            <TextInput
                                label="Subdomain"
                                placeholder="Enter subdomain (e.g. acme)"
                                description="This will create a URL like subdomain.app.example.com"
                                required
                                {...tenantForm.register('domain')}
                            />
                            <Select
                                label="Plan"
                                placeholder="Select a plan"
                                data={planOptions}
                                required
                                // {...tenantForm.register('plan')}
                            />

                            <Grid>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Storage Limit (GB)"
                                        placeholder="Enter storage limit"
                                        type="number"
                                        {...tenantForm.register('storageLimit', { valueAsNumber: true })}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="User Limit"
                                        placeholder="Enter user limit"
                                        type="number"
                                        {...tenantForm.register('userLimit', { valueAsNumber: true })}
                                    />
                                </Grid.Col>
                            </Grid>

                            <Switch
                                label="Allow Custom Domain"
                                description="Tenant can configure their own custom domain"
                                {...tenantForm.register('customDomain')}
                            />

                            <Switch
                                label="Enable White Labeling"
                                description="Tenant can remove all branding and use their own"
                                {...tenantForm.register('whiteLabel')}
                            />

                            <Divider my="sm" />
                            <Group justify="flex-end" mt="md">
                                <Button
                                    variant="light"
                                    color="red"
                                    onClick={() => {
                                        handleDeleteTenant(editingTenant);
                                        setEditingTenant(null);
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button variant="light" onClick={() => setEditingTenant(null)}>Cancel</Button>
                                <Button type="submit">Save Changes</Button>
                            </Group>
                        </Stack>
                    </form>
                )}
            </Modal>
        </Stack>
    );
};