import React from 'react';
import Button, { BaseButtonProps } from './Button';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EntryButtonProps extends BaseButtonProps {}

const EntryButton: React.FC<EntryButtonProps> = ({ children, ...props }) => {
    return (
        <Button variant="entry" {...props}>
            {children}
        </Button>
    );
};

export default EntryButton;
