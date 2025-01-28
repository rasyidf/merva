import React, { useState } from 'react';
import { TextInput, Button, Container, Title, Text, Anchor } from '@mantine/core';
import { useViewNavigate } from '@/shared/utils/routers';
import { useTranslation } from 'react-i18next';

const PasswordReset = () => {
    const navigate = useViewNavigate();
    const { t } = useTranslation("auth");
    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add your email sending logic here
        console.log('Email sent to:', email);
    };

    return (
        <>
            <Text fz={16} fw={600}>{t('password_reset.title')}</Text>
            <Text size="sm" c="gray" style={{ marginBottom: '20px' }}>
                {t('password_reset.subtitle')}
            </Text>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label={t('password_reset.email')}
                    placeholder={t('password_reset.email_placeholder')}
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    required
                />
                <Button type="submit" fullWidth style={{ marginTop: '20px' }}>
                    {t('password_reset.continue')}
                </Button>
            </form>
            <Text size="sm" style={{ marginTop: '20px' }}>
                {t('password_reset.no_account')}{' '}
                <Anchor c="blue" onClick={() => navigate('/auth/register')}>
                    {t('password_reset.sign_up')}
                </Anchor>
            </Text>
        </>
    );
};

export default PasswordReset;