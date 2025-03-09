import { Card, Group, Radio, Stack, Text } from "@mantine/core";
import type { TaskTemplate } from "../data/taskTemplates";
import { taskTemplates } from "../data/taskTemplates";
import { SvgIcon } from "@/shared/components/ui/icon";

interface TaskTemplateSelectorProps {
  value?: string;
  onChange: (templateId: string) => void;
}

export function TaskTemplateSelector({ value, onChange }: TaskTemplateSelectorProps) {
  return (
    <Radio.Group
      value={value}
      onChange={onChange}
      name="taskTemplate"
      label="Choose a template"
    >
      <Stack gap="sm">
        {taskTemplates.map((template) => (
          <Card key={template.id} withBorder>
            <Radio value={template.id} label={null} />
            <Group mt="xs">
              {template.id === "bug-report" && (
                <SvgIcon name="alertTriangle" width={16} height={16} color="red" />
              )}
              {template.id === "feature-request" && (
                <SvgIcon name="star" width={16} height={16} color="yellow" />
              )}
              {template.id === "maintenance" && (
                <SvgIcon name="settings" width={16} height={16} color="blue" />
              )}
              <Text fw={500}>{template.name}</Text>
            </Group>
            <Text size="sm" c="dimmed" mt={4}>
              {template.description}
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              Default tags: {template.template.tags?.join(", ")}
            </Text>
          </Card>
        ))}
      </Stack>
    </Radio.Group>
  );
}