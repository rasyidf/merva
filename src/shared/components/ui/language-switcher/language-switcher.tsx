import React from 'react';
import { Select } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { I18nService } from '@/shared/services/i18n/i18n.service';
import { localeConfig } from '@/core/configs';
import { SupportedLanguage } from '@/core/configs/locale';

const LanguageSwitcher: React.FC = () => { 
    const { i18n } = useTranslation();
    const handleLanguageChange = I18nService((state) => state.handleLanguageChange);

    return (
        <Select
            data={localeConfig.supportedLanguages}
            onChange={(value) => handleLanguageChange(value as SupportedLanguage)}
            value={i18n.language}
        />
    );
};

export default LanguageSwitcher;