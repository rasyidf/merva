
import {
  Button,
  Card,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useColorScheme, useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Link } from 'react-router-dom';

const PATH_DASHBOARD = {
  default: '/app/dashboard',
  root: '/app',
};

function Page() {

  return (
    <>
      <Title ta="center">Welcome!</Title>
      <Text ta="center">Create your account to continue</Text>

      <Card withBorder>
        <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'md' }}>
          <TextInput
            label="First name"
            placeholder="John"
            required
          />
          <TextInput
            label="Last name"
            placeholder="Doe"
            required
          />
        </Flex>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          mt="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          required
          mt="md"
        />
        <Button
          fullWidth
          mt="xl"
          component={Link}
          to={PATH_DASHBOARD.default}
        >
          Create account
        </Button>
      </Card>
    </>
  );
}

export default Page;