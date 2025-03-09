import { 
  Badge, 
  Button, 
  Card, 
  Grid, 
  Group, 
  Stack, 
  Text, 
  TextInput, 
  Select, 
  SimpleGrid,
  Paper,
  ThemeIcon,
  Divider,
  Table,
  ActionIcon,
  Tooltip
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { SvgIcon } from "@/shared/components/ui/icon";

interface BillingFormValues {
  paymentMethod: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  taxId: string;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  recommended?: boolean;
}

export const BillingTab = () => {
  const [saving, setSaving] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>('pro');
  
  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 9,
      period: 'month',
      features: [
        'Up to 5 users',
        '5GB storage',
        'Basic support',
        'Basic features'
      ]
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 29,
      period: 'month',
      features: [
        'Up to 20 users',
        '20GB storage',
        'Priority support',
        'Advanced features',
        'API access'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      period: 'month',
      features: [
        'Unlimited users',
        '100GB storage',
        '24/7 dedicated support',
        'All features',
        'Custom integrations',
        'SSO & advanced security'
      ]
    }
  ];
  
  const invoices: Invoice[] = [
    { id: 'INV-2023-001', date: '2023-12-01', amount: 29, status: 'paid' },
    { id: 'INV-2023-002', date: '2023-11-01', amount: 29, status: 'paid' },
    { id: 'INV-2023-003', date: '2023-10-01', amount: 29, status: 'paid' },
    { id: 'INV-2023-004', date: '2023-09-01', amount: 29, status: 'paid' },
  ];

  const form = useForm<BillingFormValues>({
    defaultValues: {
      paymentMethod: 'credit-card',
      cardholderName: 'John Smith',
      cardNumber: '•••• •••• •••• 4242',
      expiryDate: '12/24',
      cvv: '•••',
      billingAddress: '123 Main St',
      billingCity: 'New York',
      billingState: 'NY',
      billingZip: '10001',
      billingCountry: 'US',
      taxId: '',
    },
  });

  const handleSubmit = (values: BillingFormValues) => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setSaving(false);
      notifications.show({
        title: 'Success',
        message: 'Billing information updated successfully',
        color: 'green',
      });
    }, 1000);
  };

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    notifications.show({
      title: 'Plan Changed',
      message: `Your subscription has been updated to ${planId.charAt(0).toUpperCase() + planId.slice(1)}`,
      color: 'blue',
    });
  };

  const statusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'green';
      case 'pending': return 'yellow';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Stack w="100%" px="lg">
      <Card withBorder mb="md">
        <Group justify="space-between" mb="md">
          <div>
            <Text fw={500} size="lg">Current Plan</Text>
            <Text size="sm" c="dimmed">Your current subscription plan</Text>
          </div>
          <Badge size="lg" variant="outline" color="blue">Professional Plan</Badge>
        </Group>
        <Text>Your subscription renews on January 1, 2024</Text>
        <Divider my="md" />
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <div>
            <Text size="sm" c="dimmed">Users</Text>
            <Text fw={500}>12 / 20</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">Storage Used</Text>
            <Text fw={500}>8.2GB / 20GB</Text>
          </div>
          <div>
            <Text size="sm" c="dimmed">Monthly Cost</Text>
            <Text fw={500}>$29/month</Text>
          </div>
        </SimpleGrid>
      </Card>

      <Text fw={500} size="lg" mb="sm">Available Plans</Text>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" mb="xl">
        {plans.map((plan) => (
          <Paper 
            key={plan.id} 
            withBorder 
            p="md" 
            radius="md"
            style={{ 
              borderColor: selectedPlan === plan.id ? 'var(--mantine-color-blue-6)' : undefined,
              borderWidth: selectedPlan === plan.id ? 2 : 1
            }}
          >
            {plan.recommended && (
              <Badge color="blue" variant="filled" fullWidth mb="sm">
                Recommended
              </Badge>
            )}
            <Text fw={700} size="lg">{plan.name}</Text>
            <Group align="flex-end" gap={5} mb="md">
              <Text fw={700} size="xl">${plan.price}</Text>
              <Text size="sm" c="dimmed">/{plan.period}</Text>
            </Group>
            
            <Stack gap="xs" mb="xl">
              {plan.features.map((feature, i) => (
                <Group key={i} gap="xs" align="flex-start">
                  <ThemeIcon color="green" variant="light" size={24} radius="xl">
                    <SvgIcon name="check" />
                  </ThemeIcon>
                  <Text size="sm">{feature}</Text>
                </Group>
              ))}
            </Stack>
            
            <Button 
              variant={selectedPlan === plan.id ? "filled" : "outline"}
              color="blue"
              fullWidth
              onClick={() => handleUpgrade(plan.id)}
              disabled={selectedPlan === plan.id}
            >
              {selectedPlan === plan.id ? "Current Plan" : "Upgrade"}
            </Button>
          </Paper>
        ))}
      </SimpleGrid>

      <Card withBorder mb="xl">
        <Text fw={500} size="lg" mb="md">Payment Method</Text>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Payment Method"
                placeholder="Select payment method"
                data={[
                  { value: 'credit-card', label: 'Credit Card' },
                  { value: 'paypal', label: 'PayPal' },
                  { value: 'bank-transfer', label: 'Bank Transfer' },
                ]}
                leftSection={<SvgIcon name="credit-card" />}
                {...form.register('paymentMethod')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Cardholder Name"
                placeholder="Enter cardholder name"
                {...form.register('cardholderName')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Card Number"
                placeholder="Enter card number"
                {...form.register('cardNumber')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3 }}>
              <TextInput
                label="Expiry Date"
                placeholder="MM/YY"
                {...form.register('expiryDate')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3 }}>
              <TextInput
                label="CVV"
                placeholder="***"
                {...form.register('cvv')}
              />
            </Grid.Col>
          </Grid>

          <Text fw={500} size="lg" mt="xl" mb="md">Billing Address</Text>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Street Address"
                placeholder="Enter your address"
                {...form.register('billingAddress')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="City"
                placeholder="Enter city"
                {...form.register('billingCity')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="State/Province"
                placeholder="Enter state"
                {...form.register('billingState')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                label="ZIP/Postal Code"
                placeholder="Enter postal code"
                {...form.register('billingZip')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Country"
                placeholder="Select country"
                data={[
                  { value: 'US', label: 'United States' },
                  { value: 'CA', label: 'Canada' },
                  { value: 'UK', label: 'United Kingdom' },
                  { value: 'AU', label: 'Australia' },
                ]}
                {...form.register('billingCountry')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                label="Tax ID / VAT Number (Optional)"
                placeholder="Enter tax ID"
                {...form.register('taxId')}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              size="md"
              loading={saving}
            >
              Update Billing Information
            </Button>
          </Group>
        </form>
      </Card>

      <Card withBorder>
        <Text fw={500} size="lg" mb="md">Billing History</Text>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Invoice</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {invoices.map((invoice) => (
              <Table.Tr key={invoice.id}>
                <Table.Td>{invoice.id}</Table.Td>
                <Table.Td>{invoice.date}</Table.Td>
                <Table.Td>${invoice.amount.toFixed(2)}</Table.Td>
                <Table.Td>
                  <Badge color={statusColor(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Tooltip label="View Invoice">
                      <ActionIcon variant="subtle" color="gray">
                        <SvgIcon name="eye" />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Download PDF">
                      <ActionIcon variant="subtle" color="gray">
                        <SvgIcon name="file-down" />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  );
};