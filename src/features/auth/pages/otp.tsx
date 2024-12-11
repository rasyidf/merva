import { PinInput } from '@/shared/components/forms';
import { Box, Button, Group, Text } from '@mantine/core';
import { useForm } from 'react-hook-form';

export default function OtpForm() {
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
                <Text fz={16} fw={600}>Two-factor Authentication</Text>
                <Text fz={14} ta="center">Please enter the authentication code that we have sent to your email.</Text>
                <Group justify="center" gap="xs" my={24}>
                    <PinInput name='otp' control={form.control} size="lg" length={6} />
                </Group>

                <Button type="submit" fullWidth >Verify</Button>
                <Text fz={14} ta="center" mt="md">
                    Didn't receive the code? <a href="#">Resend code</a>
                </Text>

            </form>
        </Box>
    );
};
