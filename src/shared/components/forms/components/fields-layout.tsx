import { Grid, Paper, Stack, Title } from "@mantine/core";
import type { MetaField } from "../form-builder.types";
import { RenderField } from "../form-builder.render-field";
import { toTitleCase } from "@/shared/utils";

interface FieldsLayoutProps {
  fields: MetaField[];
  data?: Record<string, any>;
  readonly?: boolean;
  layout?: "grid" | "stack" | "sections";
  columns?: number | { base: number; sm?: number; md?: number; lg?: number };
  spacing?: string | number;
  sectionStyle?: "card" | "divider" | "none";
}

export const FieldsLayout = ({
  fields,
  data,
  readonly,
  layout = "grid",
  columns = { base: 1, sm: 2 },
  spacing = "md",
  sectionStyle = "none",
}: FieldsLayoutProps) => {
  // Group fields by section
  const sections = fields.reduce<Record<string, MetaField[]>>((acc, field) => {
    const section = field.group || "default";
    if (!acc[section]) acc[section] = [];
    acc[section].push(field);
    return acc;
  }, {});

  const renderSection = (sectionFields: MetaField[], sectionName: string) => {
    const content = layout === "stack" ? (
      <Stack gap={spacing}>
        {sectionFields.map((field) => (
          <RenderField
            key={field.name}
            field={field}
            data={data}
            readonly={readonly}
          />
        ))}
      </Stack>
    ) : (
      <Grid columns={typeof columns === "number" ? columns : 12}>
        {sectionFields.map((field) => {
          const colSpan = field.colSpan ??
            (typeof columns === "number"
              ? 1
              : { base: columns.base, sm: columns.sm ?? 6 });

          return (
            <Grid.Col key={field.name} span={colSpan}>
              <RenderField
                field={field}
                data={data}
                readonly={readonly}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    );

    if (sectionStyle === "card" && sectionName !== "default") {
      return (
        <Paper key={sectionName} p="md" radius="sm" withBorder>
          {sectionName !== "default" && (
            <Title order={6} mb="md">
              {toTitleCase(sectionName)}
            </Title>
          )}
          {content}
        </Paper>
      );
    }

    return (
      <Stack key={sectionName} gap={spacing}>
        {sectionName !== "default" && (
          <Title order={6}>
            {toTitleCase(sectionName)}
          </Title>
        )}
        {content}
      </Stack>
    );
  };

  return (
    <Stack gap={spacing}>
      {Object.entries(sections).map(([section, sectionFields]) =>
        renderSection(sectionFields, section)
      )}
    </Stack>
  );
};