
import { AppLogo } from '@/shared/components/ui/icon';
import { Button, Group, Text, Title, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Page503: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('../');
  };


  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      
      <AppLogo />
      <Title order={1} style={{ fontSize: '10rem' }}>503</Title>
      <Title order={2} style={{ fontWeight: 'bold' }}>Website is under maintenance!</Title>
      <Text>The site is not available at the moment. We'll be back online shortly.</Text>
      <Group style={{ marginTop: '20px' }}>
        <Button onClick={goBack} variant="outline">Learn more</Button>
      </Group>
    </Center>
  );
};

export default Page503;