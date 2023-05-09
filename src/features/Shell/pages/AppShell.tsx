import { useFeatureFlags } from '@/contexts/FeatureProvider';
import { AppShell, Badge, Header, NavLink, Navbar } from '@mantine/core';
import { Outlet, Link } from 'react-router-dom';

type Props = {};

export const Dashboard = (props: Props) => {
  const { enabledFeatures } = useFeatureFlags();
  // mantine app shell layout
  return (<AppShell
    padding="md" styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    })}
    header={<Header height={60} p="xs">{/* Header content */}</Header>} navbar={
      <Navbar width={{ base: 200 }} p="sm">
        <NavLink variant="subtle" component={Link} to="/" label='Home'></NavLink>
        {
          enabledFeatures.map((feature, i) => {
            return <NavLink variant="subtle" component={Link} key={`nav-${feature.id}`} to={`${feature.routes?.[0].path ?? ""}`} label={`${feature.name}`}
              rightSection={<Badge color={feature.activeVersion == "dev" ? 'blue' : 'green'}>{feature.activeVersion}</Badge>}></NavLink>;
          })
        }
      </Navbar>} >
    <Outlet />
  </AppShell>);
};

export default Dashboard;