import React, { useState } from 'react';
import { TextInput, Button, Container, Title, Text, Anchor } from '@mantine/core';
import { useViewNavigate } from '@/shared/utils/routers';

const PasswordReset = () => {
    const navigate = useViewNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add your email sending logic here
        console.log('Email sent to:', email);
    };

    return (
        <  >
            <Text fz={16} fw={600}>Forgot Password</Text>
            <Text size="sm" c="gray" style={{ marginBottom: '20px' }}>
                Enter your registered email and we will send you a link to reset your password.
            </Text>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    required
                />
                <Button type="submit" fullWidth style={{ marginTop: '20px' }}>
                    Continue
                </Button>
            </form>
            <Text size="sm" style={{ marginTop: '20px' }}>
                Don't have an account? <Anchor c="blue" onClick={() => {
                    navigate('/auth/register');
                }}>Sign up</Anchor>.
            </Text>
        </>
    );
};

export default PasswordReset;