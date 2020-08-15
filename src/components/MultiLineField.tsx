import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import './TextField.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MultiLineFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

const MultiLineField: React.FC<MultiLineFieldProps> = ({
    className,
    value,
    onChange,
    ...props
}) => {
    return (
        <textarea
            className={classnames('text-field__input', className)}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
};

export default MultiLineField;
