import { Anchor, Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const PATH_DASHBOARD = {
  default: "/app/dashboard",
  login: "/auth/login",
  root: "/app",
};

export default function Page() {
  return (
    <>
      <Text fz={16} fw={600} >Welcome!</Text>
      <Text fz={14}>Enter your email and password to create an account.
      </Text>

      <TextInput label="Email" placeholder="you@mantine.dev" required mt="md" />
      <PasswordInput label="Password" placeholder="Your password" required mt="md" />
      <PasswordInput label="Confirm Password" placeholder="Confirm password" required mt="md" />
      <Button fullWidth mt="xl" component={Link} to={PATH_DASHBOARD.default}>
        Create account
      </Button>
      <Text fz={14} ta="center" mt="lg">
        Already have an account? <Anchor component={Link} to={PATH_DASHBOARD.login} fz={14} c="blue" ta="center">
          Sign In
        </Anchor>
      </Text>
    </>
  );
}
