import React, { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import './Button.css';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

interface ButtonProps extends BaseButtonProps {
    variant?: 'delete' | 'entry' | 'normal';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'normal',
    type,
    className,
    children,
    onClick,
    ...props
}) => {
    return (
        <button
            // eslint-disable-next-line react/button-has-type
            type={type ?? 'button'}
            className={classnames(className, `${variant}-button`)}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
