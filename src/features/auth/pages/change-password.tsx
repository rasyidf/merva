
import { useForm } from 'react-hook-form';
import { PasswordInput, Button, Box, Text } from '@mantine/core';

const ChangePassword: React.FC = () => {
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
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput
                    label="Old Password"
                    {...register('oldPassword', { required: true })}
                    error={errors.oldPassword && 'Old Password is required'}
                />
                <PasswordInput
                    label="New Password"
                    {...register('newPassword', { required: true })}
                    error={errors.newPassword && 'New Password is required'}
                />
                <PasswordInput
                    label="Confirm New Password"
                    {...register('confirmPassword', { required: true })}
                    error={errors.confirmPassword && 'Confirm New Password is required'}
                />
                {newPassword !== confirmPassword && <Text c="red">New passwords do not match</Text>}
                <Button type="submit" mt="md">Change Password</Button>
            </form>
        </Box>
    );
};

export default ChangePassword;
