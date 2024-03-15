import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Card, Input, Text } from "@mantine/core";
import { useViewNavigate } from "@/utils/routers";
import AppLogo from "@/components/elements/icons/AppLogo";
import { NavLink } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  username: string;
  pw: string;
};

export default function Login() {
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

    if (data.email === "admin@mail.com" && data.pw === "admin") {
      setTimeout(() => {
        navigate("/app/dashboard");
        setIsLoading(false);
      }, 1000);
    } else {
      setError("root", { message: "Invalid email or password" });
      setIsLoading(false);
    }

  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100dvh" }}>
      <Card padding="lg" style={{ width: 400 }}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <NavLink to="/" style={{ display: "block", marginBottom: 20 }}>
            <AppLogo />
          </NavLink>
          {/* Honeypot */}
          <input type="text" name="username" style={{ display: "none" }} />
          <input type="password" name="password" style={{ display: "none" }} />
          <Text fw={700} size="lg" style={{ marginBottom: 20 }}>
            Welcome To Merva
          </Text>
          <Input
            type="email"
            placeholder="Email"
            error={formState.errors.email && "Email is required"}
            disabled={isLoading}
            style={{ marginBottom: 10 }}
            {...register("email", { required: true })}
          />
          <Input
            type="password"
            placeholder="Password"
            error={formState.errors.pw && "Password is required"}
            disabled={isLoading}
            style={{ marginBottom: 20 }}
            {...register("pw", { required: true })}
          />
          {formState.errors.root &&
            <Alert color="red" style={{ marginBottom: 20 }}>{formState.errors.root.message}</Alert>
          }
          <Button type="submit" variant="gradient" disabled={isLoading} loading={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
