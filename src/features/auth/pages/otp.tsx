import { PinInput } from '@/shared/components/forms';
import { Box, Button, Group, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function OtpForm() {
    const { t } = useTranslation("auth");
    const form = useForm({
        defaultValues: {
            otp: '',
        },
    });

    const onSubmit = (values: { otp: string }) => {
        console.log('OTP Submitted:', values.otp);
    };

    return (
        <Box mx="auto">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Text fz={16} fw={600}>{t('otp.title')}</Text>
                <Text fz={14} ta="center">{t('otp.subtitle')}</Text>
                <Group justify="center" gap="xs" my={24}>
                    <PinInput name='otp' control={form.control} size="lg" length={6} />
                </Group>

                <Button type="submit" fullWidth>{t('otp.verify')}</Button>
                <Text fz={14} ta="center" mt="md">
                    {t('otp.no_code')}{' '}
                    <a href="#">{t('otp.resend')}</a>
                </Text>

            </form>
        </Box>
    );
};
