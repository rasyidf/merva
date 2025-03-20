import { Component, type ErrorInfo, type PropsWithChildren } from 'react';
import { Button, Group, Title, Text } from '@mantine/core';
import { logger } from '@/shared/services/logging';
import { isApiError, isValidationError, isAuthError, isNetworkError } from '@/shared/types';
import classes from './ErrorBoundary.module.css';

interface Props extends PropsWithChildren {
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleNavigateHome = () => {
    window.location.href = '/app/dashboard';
  };

  private getErrorDetails() {
    const { error } = this.state;
    if (!error) return { title: 'Error', message: 'An unknown error occurred' };

    if (isApiError(error)) {
      return {
        title: `API Error ${error.status}`,
        message: error.data.message
      };
    }

    if (isValidationError(error)) {
      const messages = Object.entries(error.errors)
        .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
        .join('\n');
      return {
        title: 'Validation Error',
        message: messages
      };
    }

    if (isAuthError(error)) {
      return {
        title: 'Authentication Error',
        message: error.message || 'Please log in to continue'
      };
    }

    if (isNetworkError(error)) {
      return {
        title: 'Network Error',
        message: error.code === 'TIMEOUT' 
          ? 'Request timed out. Please try again.'
          : 'Network connection error. Please check your internet connection.'
      };
    }

    return {
      title: 'Application Error',
      message: error.message
    };
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { title, message } = this.getErrorDetails();

      return (
        <div className={classes.errorContainer}>
          <Title order={1} className={classes.errorTitle}>{title}</Title>
          <Text size="lg" mb="xl">{message}</Text>
          <Group mt="xl">
            <Button variant="light" onClick={this.handleRetry}>
              Try Again
            </Button>
            <Button onClick={this.handleNavigateHome}>
              Back to Dashboard
            </Button>
          </Group>
        </div>
      );
    }

    return this.props.children;
  }
}