import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import cx from "clsx";
import classes from "./theme-switcher.module.scss";
import { SvgIcon } from "@/components/ui/icon";

export function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
        variant="transparent"
        size="md"
        aria-label="Toggle color scheme"
      >
        <SvgIcon name="sun" className={cx(classes.icon, classes.light)} />
        <SvgIcon name="moon" className={cx(classes.icon, classes.dark)} />
      </ActionIcon>
    </Group>
  );
}
