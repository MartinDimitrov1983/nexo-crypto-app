import React, { ReactNode, MouseEvent } from 'react';
import { Search } from '../../assets';
import styles from './Button.module.css';

export enum ButttonType {
    SUBMIT = 'submit',
    RESET = 'reset',
    BUTTON = 'button',
}
interface ButtonProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    type?: ButttonType;
    children?: ReactNode;
    shouldShowIcon?: boolean;
    className?: string;
    isDisabled?: boolean;
}

const Button = ({
    onClick,
    type = ButttonType.BUTTON,
    shouldShowIcon = false,
    children,
    className,
    isDisabled = false,
}: ButtonProps) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick}
            type={type}
            disabled={isDisabled}
        >
            <div className={styles.content}>
                {shouldShowIcon && (
                    <Search fill="white" style={{ marginRight: '5px' }} />
                )}
                <div>{children}</div>
            </div>
        </button>
    );
};

export default Button;
