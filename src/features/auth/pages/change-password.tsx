import { useForm } from 'react-hook-form';
import { PasswordInput, Button, Box, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const ChangePassword: React.FC = () => {
    const { t } = useTranslation("auth");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const newPassword = watch('newPassword');
    const confirmPassword = watch('confirmPassword');

    const onSubmit = async (data: any) => {
        if (data.newPassword !== data.confirmPassword) {
            alert('New passwords do not match');
            return;
        }

        // Add your password change logic here
        // Example: await changePassword(data.oldPassword, data.newPassword);

        alert('Password changed successfully');
    };

    return (
        <Box mx="auto">
            <Text fz={16} fw={600}>{t('change_password.title')}</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput
                    label={t('change_password.old_password')}
                    {...register('oldPassword', { required: true })}
                    error={errors.oldPassword && t('change_password.errors.old_password_required')}
                />
                <PasswordInput
                    label={t('change_password.new_password')}
                    {...register('newPassword', { required: true })}
                    error={errors.newPassword && t('change_password.errors.new_password_required')}
                />
                <PasswordInput
                    label={t('change_password.confirm_password')}
                    {...register('confirmPassword', { required: true })}
                    error={errors.confirmPassword && t('change_password.errors.confirm_password_required')}
                />
                {newPassword !== confirmPassword && 
                    <Text c="red">{t('change_password.password_mismatch')}</Text>
                }
                <Button type="submit" mt="md">{t('change_password.submit')}</Button>
            </form>
        </Box>
    );
};

export default ChangePassword;
