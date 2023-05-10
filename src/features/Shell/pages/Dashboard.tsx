import { useFeatureFlags } from '@/contexts/FeatureProvider';
import { AppShell, Badge, Card, Header, NavLink, Navbar, Text, Title } from '@mantine/core';
import { Outlet, Link } from 'react-router-dom';

type Props = {};

export const Dashboard = (props: Props) => {

  return (
    <Card  >
      <Title order={4}>Merva Codebase</Title>
      <Text>
        Welcome to Merva Codebase!
      </Text>
    </Card>
  );
};

export default Dashboard;