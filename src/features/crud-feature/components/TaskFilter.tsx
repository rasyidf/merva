
import { DatePickerInput, MultiSelect, NumberInput, TextInput } from "@/shared/components/forms/components";
import { SvgIcon } from "@/shared/components/ui/icon";
import { categories, labels, statuses, teams, userRoles } from "@/shared/utils/constants/data";
import { Accordion, Button, Group, Paper, Stack } from "@mantine/core";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface TaskFilterProps {
  onFilter: (filters: Record<string, any>) => void;
  onReset: () => void;
}

interface FilterFormValues {
  title: string;
  status: string[];
  label: string[];
  priority: string[];
  assignedTeam: string[];
  assignedUserRole: string[];
  category: string[];
  progressMin?: number;
  progressMax?: number;
  dueDateFrom: Date | null;
  dueDateTo: Date | null;
}

export function TaskFilter({ onFilter, onReset }: TaskFilterProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<FilterFormValues>({
    defaultValues: {
      title: "",
      status: [],
      label: [],
      priority: [],
      assignedTeam: [],
      assignedUserRole: [],
      category: [],
      progressMin: undefined,
      progressMax: undefined,
      dueDateFrom: null,
      dueDateTo: null,
    }
  });

  const handleFilter: SubmitHandler<FilterFormValues> = (values) => {
    const filters = Object.entries(values).reduce((acc, [key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        acc[key] = value;
      } else if (value !== null && value !== undefined && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    onFilter(filters);
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <Paper p="md">
      <Accordion>
        <Accordion.Item value="filters">
          <Accordion.Control icon={<SvgIcon name="filter" width={16} height={16} />}>
            Advanced Filters
          </Accordion.Control>
          <Accordion.Panel>
            <form onSubmit={handleSubmit(handleFilter)}>
              <Stack>
                <TextInput
                  name="title"
                  control={control}
                  label={t("tasks.form.fields.title")}
                  placeholder="Search by title..."
                />

                <Group grow>
                  <MultiSelect
                    name="status"
                    control={control}
                    label={t("tasks.form.fields.status")}
                    placeholder="Select statuses"
                    data={statuses.map(s => ({ value: s.value, label: s.label }))}
                  />

                  <MultiSelect
                    name="label"
                    control={control}
                    label={t("tasks.form.fields.label")}
                    placeholder="Select labels"
                    data={labels.map(l => ({ value: l.value, label: l.label }))}
                  />
                </Group>

                <Group grow>
                  <MultiSelect
                    name="priority"
                    control={control}
                    label={t("tasks.form.fields.priority")}
                    placeholder="Select priorities"
                    data={[
                      { value: "1", label: t("tasks.form.priorities.low") },
                      { value: "2", label: t("tasks.form.priorities.medium") },
                      { value: "3", label: t("tasks.form.priorities.high") },
                    ]}
                  />

                  <MultiSelect
                    name="assignedTeam"
                    control={control}
                    label={t("tasks.form.fields.team")}
                    placeholder="Select teams"
                    data={teams.map(t => ({ value: t.value, label: t.label }))}
                  />
                </Group>

                <Group grow>
                  <MultiSelect
                    name="assignedUserRole"
                    control={control}
                    label={t("tasks.form.fields.role")}
                    placeholder="Select roles"
                    data={userRoles.map(r => ({ value: r.value, label: r.label }))}
                  />

                  <MultiSelect
                    name="category"
                    control={control}
                    label={t("tasks.form.fields.category")}
                    placeholder="Select categories"
                    data={categories.map(c => ({ value: c.value, label: c.label }))}
                  />
                </Group>

                <Group grow>
                  <NumberInput
                    name="progressMin"
                    control={control}
                    label="Min Progress"
                    placeholder="0%"
                    min={0}
                    max={100}
                  />

                  <NumberInput
                    name="progressMax"
                    control={control}
                    label="Max Progress"
                    placeholder="100%"
                    min={0}
                    max={100}
                  />
                </Group>

                <Group grow>
                  <DatePickerInput
                    name="dueDateFrom"
                    control={control}
                    label="Due Date From"
                    placeholder="Pick date"
                  />

                  <DatePickerInput
                    name="dueDateTo"
                    control={control}
                    label="Due Date To"
                    placeholder="Pick date"
                  />
                </Group>

                <Group justify="flex-end">
                  <Button variant="light" onClick={handleReset}>
                    Reset Filters
                  </Button>
                  <Button type="submit">Apply Filters</Button>
                </Group>
              </Stack>
            </form>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Paper>
  );
}