import { FormFields } from "@/shared/components/forms";
import { Alert, Button, Group, LoadingOverlay, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { Task } from "../data/schema";
import { taskSchema } from "../data/schema";
import { useTaskQuery } from "../hooks/useTaskQuery";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categories, labels, statuses, teams, userRoles } from "@/shared/utils/constants/data";
import { useState } from "react";
import { isAxiosError } from "axios";
import { FormBuilder } from "@/shared/components/forms/form-builder";
import { featureId } from "..";

interface TaskFormProps {
    mode: "create" | "edit";
    initialValues?: Partial<Task>;
    onSubmitSuccess?: () => void;
}

export function TaskForm({ mode, initialValues, onSubmitSuccess }: TaskFormProps) {
    const navigate = useNavigate();
    const { t } = useTranslation(featureId);
    const { createTask, updateTask, isMutating } = useTaskQuery();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: Partial<Task>) => {
        setError(null);
        try {
            if (mode === "create") {
                await createTask(values as Omit<Task, "id">);
            } else {
                if (!initialValues?.id) throw new Error("Task ID is required for updates");
                await updateTask({ id: initialValues.id, updates: values });
            }
            onSubmitSuccess?.();
            navigate("../");
        } catch (err) {
            console.error("Form submission error:", err);
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || "An error occurred while saving the task");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }

            notifications.show({
                title: t(`tasks.notifications.${mode}.error`),
                message: error,
                color: "red",
            });
        }
    };

    const validateForm = (values: Partial<Task>) => {
        const errors: Partial<Record<keyof Task, string>> = {};

        if (!values.title?.trim()) {
            errors.title = t("validation.required", { field: t("tasks.form.fields.title") });
        }

        if (!values.assignedUser?.trim()) {
            errors.assignedUser = t("validation.required", { field: t("tasks.form.fields.assignedTo") });
        }

        if (values.storyPoints !== undefined && (values.storyPoints < 0 || values.storyPoints > 100)) {
            errors.storyPoints = t("validation.range", { min: 0, max: 100 });
        }

        if (values.progressPercentage !== undefined && (values.progressPercentage < 0 || values.progressPercentage > 100)) {
            errors.progressPercentage = t("validation.range", { min: 0, max: 100 });
        }

        if (!values.dueDate) {
            errors.dueDate = t("validation.required", { field: t("tasks.form.fields.dueDate") });
        } else {
            const dueDate = new Date(values.dueDate);
            if (isNaN(dueDate.getTime())) {
                errors.dueDate = "Invalid date format";
            }
        }

        return errors;
    };

    return (
        <Stack pos="relative">
            <LoadingOverlay visible={isMutating} />

            {error && (
                <Alert color="red" title="Error" mb="md" withCloseButton onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <FormBuilder
                schema={taskSchema}
                initialData={initialValues}
                onSubmit={handleSubmit}
                validate={validateForm}
            >
                <FormFields
                    meta={[
                        { name: "title", label: t("tasks.form.fields.title"), type: "text", required: true },
                        {
                            name: "status",
                            label: t("tasks.form.fields.status"),
                            type: "select",
                            required: true,
                            data: statuses.map(s => ({ label: s.label, value: s.value }))
                        },
                        {
                            name: "label",
                            label: t("tasks.form.fields.label"),
                            type: "select",
                            required: true,
                            data: labels.map(l => ({ label: l.label, value: l.value }))
                        },
                        {
                            name: "priority",
                            label: t("tasks.form.fields.priority"),
                            type: "select",
                            required: true,
                            data: [
                                { label: t("tasks.form.priorities.low"), value: "1" },
                                { label: t("tasks.form.priorities.medium"), value: "2" },
                                { label: t("tasks.form.priorities.high"), value: "3" }
                            ]
                        },
                        {
                            name: "storyPoints",
                            label: t("tasks.form.fields.storyPoints"),
                            type: "number",
                            required: true,
                            min: 0,
                            max: 100
                        },
                        {
                            name: "dueDate",
                            label: t("tasks.form.fields.dueDate"),
                            type: "date",
                            required: true
                        },
                        {
                            name: "estimatedCompletionTime",
                            label: t("tasks.form.fields.estimatedTime"),
                            type: "number",
                            required: true,
                            min: 0
                        },
                        {
                            name: "assignedUser",
                            label: t("tasks.form.fields.assignedTo"),
                            type: "text",
                            required: true
                        },
                        {
                            name: "assignedUserRole",
                            label: t("tasks.form.fields.role"),
                            type: "select",
                            required: true,
                            data: userRoles.map(r => ({ label: r.label, value: r.value }))
                        },
                        {
                            name: "assignedTeam",
                            label: t("tasks.form.fields.team"),
                            type: "select",
                            required: true,
                            data: teams.map(t => ({ label: t.label, value: t.value }))
                        },
                        {
                            name: "category",
                            label: t("tasks.form.fields.category"),
                            type: "select",
                            required: true,
                            data: categories.map(c => ({ label: c.label, value: c.value }))
                        },
                        {
                            name: "tags",
                            label: t("tasks.form.fields.tags"),
                            type: "tags",
                            required: true
                        },
                        {
                            name: "progressPercentage",
                            label: t("tasks.form.fields.progress"),
                            type: "number",
                            required: true,
                            min: 0,
                            max: 100
                        }
                    ]}
                    columns={2}
                />
                <Group justify="flex-end" mt="xl">
                    <Button variant="light" onClick={() => navigate("../")}>
                        {t("tasks.form.buttons.cancel")}
                    </Button>
                    <Button type="submit" loading={isMutating}>
                        {mode === "create"
                            ? t("tasks.form.buttons.create")
                            : t("tasks.form.buttons.update")
                        }
                    </Button>
                </Group>
            </FormBuilder>
        </Stack>
    );
}