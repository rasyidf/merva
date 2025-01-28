
import { AppLogo } from '@/shared/components/ui/icon';
import { Button, Group, Text, Title, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Page500: React.FC = () => {
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
      <Title order={1} style={{ fontSize: '10rem' }}>500</Title>
      <Title order={2} style={{ fontWeight: 'bold' }}>Oops! Something went wrong 😔</Title>
      <Text>We apologize for the inconvenience. Please try again later.</Text>
      <Group style={{ marginTop: '20px' }}>
        <Button onClick={goBack} variant="outline">Go Back</Button>
        <Button onClick={goHome}>Back to Home</Button>
      </Group>
    </Center>
  );
};

export default Page500;