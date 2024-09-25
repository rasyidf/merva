
import { Notify } from '@/shared/services';
import { useViewNavigate } from '@/shared/utils/routers';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


type LoginFormInputs = {
  email: string;
  username: string;
  pw: string;
};

const PATH_AUTH = {
  signup: '/auth/signup',
  passwordReset: '/auth/password-reset',
};

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, setError } = useForm<LoginFormInputs>();

  const navigate = useViewNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);

    // if honey pot is filled, then it's a bot
    if (data.username) {
      setIsLoading(false);
      return;
    }

    if (data.email === "admin@mail.com" && data.pw === "Rahasia123") {
      setTimeout(() => {
        navigate("/app/dashboard");
        setIsLoading(false);
      }, 1000);
    } else {
      Notify.error("Error", "Your credentials are invalid");
      setIsLoading(false);
    }

  };

  return (
    <>
      <Title ta="center">Welcome back!</Title>
      <Text ta="center">Sign in to your account to continue</Text>

      <Card>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input type="text" style={{ display: "none" }}  {...register("username")} />
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required 
            {...register("email", { required: true })}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md" 
            {...register("pw", { required: true })}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label="Remember me" 
            />
            <Text
              component={Link}
              to={PATH_AUTH.passwordReset}
              size="sm" 
            >
              Forgot password?
            </Text>
          </Group>
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Sign in
          </Button>
        </form>
        {formState.errors.root &&
          <Alert color="red" style={{ marginBottom: 20 }}>{formState.errors.root.message}</Alert>
        }
      </Card>
    </>
  );
}

export default Page;