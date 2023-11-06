import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Input, Text } from "@mantine/core";

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) => {
        setIsLoading(true);

        setIsLoading(false);
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card shadow="sm" padding="lg" style={{ width: 400 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Text ta="center" fw={700} size="lg" style={{ marginBottom: 20 }}>
                        Login
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
                        error={formState.errors.password && "Password is required"}
                        disabled={isLoading}
                        style={{ marginBottom: 20 }}
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" variant="gradient" fullWidth disabled={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
