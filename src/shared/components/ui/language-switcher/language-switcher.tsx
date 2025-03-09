import React from 'react';
import { Menu, UnstyledButton, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { I18nService } from '@/shared/services/i18n';
import { localeConfig } from '@/core/configs';
import type { SupportedLanguage } from '@/core/configs/locale';
import classes from './language-switcher.module.css';

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  id: 'Indonesia'
};

const LanguageSwitcher: React.FC = () => { 
  const { i18n } = useTranslation();
  const handleLanguageChange = I18nService(state => state.handleLanguageChange);
  const currentLanguage = i18n.language as SupportedLanguage;

  return (
    <Menu
      shadow="md"
      width={200}
      position="bottom-end"
      withArrow
      transitionProps={{ transition: 'pop' }}
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group gap={8}>
            <span className={classes.label}>{LANGUAGE_LABELS[currentLanguage]}</span>
            <Text component="span" size="xs" c="dimmed">
              {currentLanguage.toUpperCase()}
            </Text>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {localeConfig.supportedLanguages.map((lang) => (
          <Menu.Item
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={classes.item}
            data-active={i18n.language === lang || undefined}
          >
            <Group gap={8}>
              <Text fw={500}>{LANGUAGE_LABELS[lang]}</Text>
              <Text size="xs" c="dimmed">
                {lang.toUpperCase()}
              </Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSwitcher;