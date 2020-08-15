import React from 'react';
import Button, { BaseButtonProps } from './Button';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteButtonProps extends BaseButtonProps {}

const DeleteButton: React.FC<DeleteButtonProps> = ({ children, ...props }) => {
    return (
        <Button variant="delete" {...props}>
            {children}
        </Button>
    );
};

export default DeleteButton;
