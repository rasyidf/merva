import { Box, Button, Group, Paper, Stack, Title } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useFormArray } from "../hooks";
import { FieldsLayout } from "./fields-layout";
import type { MetaField } from "../form-builder.types";
import { SvgIcon } from "../../ui/icon";

interface RepeatableFieldsProps {
  label?: string;
  description?: string;
  name: string;
  fields: MetaField[];
  min?: number;
  max?: number;
  defaultValues?: Record<string, any>;
  readonly?: boolean;
}

export const RepeatableFields = ({
  label,
  description,
  name,
  fields,
  min = 0,
  max = Infinity,
  defaultValues = {},
  readonly = false,
}: RepeatableFieldsProps) => {
  const form = useFormContext();
  const { items, append, remove, move, isAtMin, isAtMax } = useFormArray(form, {
    name,
    fields,
    min,
    max,
    defaultValues,
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  return (
    <Stack gap="md">
      {label && <Title order={6}>{label}</Title>}
      {description && (
        <Box c="dimmed" fz="sm">
          {description}
        </Box>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={name}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Stack gap="md">
                {items.map((_: any, index: number) => (
                  <Draggable
                    key={`${name}.${index}`}
                    draggableId={`${name}.${index}`}
                    index={index}
                    isDragDisabled={readonly}
                  >
                    {(provided, snapshot) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        withBorder
                        p="md"
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <Group justify="space-between" mb="md">
                          <div {...provided.dragHandleProps}>
                            <SvgIcon
                              name="caretSort"
                              style={{ cursor: readonly ? "default" : "grab" }}
                              color="gray"
                            />
                          </div>
                          {!readonly && !isAtMin && (
                            <Button
                              variant="subtle"
                              color="red"
                              size="xs"
                              leftSection={<SvgIcon name="trash" width={16} />}
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </Group>

                        <FieldsLayout
                          fields={fields.map(field => ({
                            ...field,
                            name: `${name}.${index}.${field.name}`,
                          }))}
                          readonly={readonly}
                        />
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Stack>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {!readonly && !isAtMax && (
        <Button
          variant="light"
          leftSection={<SvgIcon name="plus" width={16} height={16} />}
          onClick={() => append()}
          fullWidth
        >
          Add Item
        </Button>
      )}
    </Stack>
  );
};