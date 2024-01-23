import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from '@phosphor-icons/react';
import cx from 'clsx';
import classes from './ThemeSwitcher.module.scss';

export function ThemeSwitcher() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <Group justify="center">
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
            >
                <Sun className={cx(classes.icon, classes.light)} weight="duotone" />
                <Moon className={cx(classes.icon, classes.dark)} weight="duotone" />
            </ActionIcon>
        </Group>
    );
}