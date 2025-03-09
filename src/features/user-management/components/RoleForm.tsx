import { Button, Group, MultiSelect, Textarea, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { RoleFormValues } from "../types";
import { usePermissions } from "../hooks";

interface RoleFormProps {
  initialValues?: Partial<RoleFormValues>;
  onSubmit: (values: RoleFormValues) => void;
  loading?: boolean;
  mode: "create" | "edit";
  disabledFields?: boolean;
}

export const RoleForm = ({ 
  initialValues, 
  onSubmit, 
  loading = false, 
  mode,
  disabledFields = false
}: RoleFormProps) => {
  const { data: permissions } = usePermissions();
  
  const permissionOptions = permissions?.map(permission => ({
    value: permission.id,
    label: permission.name,
    description: permission.description,
    group: permission.resource.charAt(0).toUpperCase() + permission.resource.slice(1),
  })) || [];

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<RoleFormValues>({
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
      ...initialValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Role Name"
        placeholder="Enter role name"
        required
        mb="md"
        {...register("name", { required: "Role name is required" })}
        error={errors.name?.message}
        disabled={disabledFields}
      />
      
      <Textarea
        label="Description"
        placeholder="Enter role description"
        mb="md"
        {...register("description")}
        disabled={disabledFields}
      />
      
      <MultiSelect
        label="Permissions"
        description="Select permissions for this role"
        placeholder="Select permissions"
        data={permissionOptions}
        searchable
        required
        defaultValue={initialValues?.permissions}
        onChange={(value) => setValue("permissions", value)}
        disabled={disabledFields}
      />

      {!disabledFields && (
        <Group justify="flex-end" mt="xl">
          <Button type="submit" loading={loading}>
            {mode === "create" ? "Create Role" : "Update Role"}
          </Button>
        </Group>
      )}
    </form>
  );
};