import { isRouteErrorResponse, useRouteError } from 'react-router';
import { Button, Container, Group, Stack, Title, Text } from '@mantine/core';
import { useViewNavigate } from '@/shared/utils/routers';
import classes from './ErrorBoundary.module.css';

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useViewNavigate();

  let title = 'Something went wrong';
  let message = 'An unexpected error occurred';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} - ${error.statusText}`;
    message = error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <Container size="md">
      <div className={classes.errorContainer}>
        <Title order={1} className={classes.errorTitle}>{title}</Title>
        <Text size="lg" mb="xl">{message}</Text>
        <Group>
          <Button variant="light" onClick={() => navigate(".")}>
            Go Back
          </Button>
          <Button onClick={() => navigate('/app/dashboard')}>
            Back to Dashboard
          </Button>
        </Group>
      </div>
    </Container>
  );
}