import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import './TextField.css';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

const TextField: React.FC<TextFieldProps> = ({ type, className, value, onChange, ...props }) => {
    return (
        <input
            type={type}
            className={classnames('text-field__input', className)}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
};

export default TextField;
