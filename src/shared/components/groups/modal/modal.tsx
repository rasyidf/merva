import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Modal, Drawer } from '@mantine/core';

interface ResponsiveModalProps {
    opened: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({ opened, onClose, children }) => {
    const isLargeScreen = useMediaQuery('(min-width: 62em)');

    return (
        <>
            {isLargeScreen ? (
                <Modal opened={opened} onClose={onClose}>
                    {children}
                </Modal>
            ) : (
                <Drawer opened={opened} onClose={onClose} position="bottom">
                    {children}
                </Drawer>
            )}
        </>
    );
};

export default ResponsiveModal;