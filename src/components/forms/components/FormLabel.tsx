import { Group, rem } from "@mantine/core";


export const FormLabel = ({ label, optional }: { label: string; optional?: boolean; }) => (
  <Group justify="space-between" >
    {label}
    {optional && (
      <span style={{ color: 'var(--mantine-color-tertiary-6)', fontWeight: 400, lineHeight: rem(24), fontSize: rem(16) }}>
        Opsional
      </span>)}
  </Group>
);
