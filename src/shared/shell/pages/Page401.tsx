
import { AppLogo } from '@/shared/components/ui/icon';
import { Button, Group, Text, Title, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Page401: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('../');
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <Center style={{ height: '100vh', flexDirection: 'column' }}>
      
      <AppLogo />
      <Title order={1} style={{ fontSize: '10rem' }}>401</Title>
      <Title order={2} style={{ fontWeight: 'bold' }}>Unauthorized Access</Title>
      <Text>Please log in with the appropriate credentials to access this resource.</Text>
      <Group style={{ marginTop: '20px' }}>
        <Button onClick={goBack} variant="outline">Go Back</Button>
        <Button onClick={goHome}>Back to Home</Button>
      </Group>
    </Center>
  );
};

export default Page401;