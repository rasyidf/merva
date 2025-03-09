import { Button, Grid, Group, MultiSelect, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { UserFormValues, UserStatus } from "../types";
import { useRoles } from "../hooks";
import { useState } from "react";
import { PasswordInput } from "@mantine/core";

interface UserFormProps {
    initialValues?: Partial<UserFormValues>;
    onSubmit: (values: UserFormValues) => void;
    loading?: boolean;
    mode: "create" | "edit";
}

const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" },
];

const departmentOptions = [
    { value: "Engineering", label: "Engineering" },
    { value: "Marketing", label: "Marketing" },
    { value: "Sales", label: "Sales" },
    { value: "Finance", label: "Finance" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "IT", label: "IT" },
    { value: "Product", label: "Product" },
    { value: "Operations", label: "Operations" },
    { value: "Customer Support", label: "Customer Support" },
];

export const UserForm = ({ initialValues, onSubmit, loading = false, mode }: UserFormProps) => {
    const [passwordVisible, setPasswordVisible] = useState(mode === "create");

    const { data: rolesData } = useRoles();
    const roleOptions = rolesData?.data.map(role => ({
        value: role.id,
        label: role.name,
    })) || [];

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<UserFormValues>({
        defaultValues: {
            username: "",
            email: "",
            fullName: "",
            roles: [],
            status: "active" as UserStatus,
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            department: "",
            position: "",
            bio: "",
            ...initialValues,
        },
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const handleFormSubmit = (values: UserFormValues) => {
        if (mode === "create" && password !== confirmPassword) {
            // Handle password mismatch
            return;
        }

        // If editing and password fields are empty, remove them from the submission
        if (mode === "edit" && !passwordVisible) {
            const { password, confirmPassword, ...rest } = values;
            onSubmit(rest);
        } else {
            onSubmit(values);
        }
    };

    const togglePasswordFields = () => {
        setPasswordVisible(!passwordVisible);
        if (!passwordVisible) {
            setValue("password", "");
            setValue("confirmPassword", "");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Username"
                        placeholder="Enter username"
                        required
                        {...register("username", { required: "Username is required" })}
                        error={errors.username?.message}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Email"
                        placeholder="Enter email address"
                        required
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        error={errors.email?.message}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextInput
                        label="Full Name"
                        placeholder="Enter full name"
                        required
                        {...register("fullName", { required: "Full name is required" })}
                        error={errors.fullName?.message}
                    />
                </Grid.Col>

                {/* Password fields */}
                {(mode === "create" || passwordVisible) && (
                    <>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <PasswordInput
                                label={mode === "create" ? "Password" : "New Password"}
                                placeholder="Enter password"
                                required={mode === "create"}
                                {...register("password", {
                                    required: mode === "create" ? "Password is required" : false,
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                                error={errors.password?.message}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <PasswordInput
                                label="Confirm Password"
                                placeholder="Confirm password"
                                required={mode === "create"}
                                {...register("confirmPassword", {
                                    required: mode === "create" ? "Please confirm password" : false,
                                    validate: value =>
                                        value === password || "Passwords do not match",
                                })}
                                error={errors.confirmPassword?.message}
                            />
                        </Grid.Col>
                    </>
                )}

                {mode === "edit" && (
                    <Grid.Col span={12}>
                        <Button
                            variant="subtle"
                            onClick={togglePasswordFields}
                            type="button"
                            size="compact"
                        >
                            {passwordVisible ? "Cancel Password Change" : "Change Password"}
                        </Button>
                    </Grid.Col>
                )}

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Phone Number"
                        placeholder="Enter phone number"
                        {...register("phoneNumber")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                        label="Department"
                        placeholder="Select department"
                        data={departmentOptions}
                    // {...register("department")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Position"
                        placeholder="Enter position"
                        {...register("position")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                        label="Status"
                        placeholder="Select user status"
                        data={statusOptions}
                        required
                        defaultValue={initialValues?.status || "active"}
                        onChange={(value) => setValue("status", value as UserStatus)}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <MultiSelect
                        label="Roles"
                        placeholder="Select user roles"
                        data={roleOptions}
                        required
                        defaultValue={initialValues?.roles || []}
                        onChange={(value) => setValue("roles", value)}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea
                        label="Bio"
                        placeholder="Enter user bio"
                        minRows={3}
                        {...register("bio")}
                    />
                </Grid.Col>
            </Grid>

            <Group justify="flex-end" mt="lg">
                <Button type="submit" loading={loading}>
                    {mode === "create" ? "Create User" : "Update User"}
                </Button>
            </Group>
        </form>
    );
};