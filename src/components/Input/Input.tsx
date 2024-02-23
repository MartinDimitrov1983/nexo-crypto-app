import React from 'react';
import styles from './Input.module.css';

interface InputProps {
    id: string;
    labelName: string;
    value: string;
    handleOnChange: Function;
}

const Input = ({ labelName, handleOnChange, value, id }: InputProps) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor={id}>
                {labelName}
            </label>
            <input
                className={styles.input}
                id={id}
                type="text"
                value={value}
                onChange={(e) => handleOnChange(e)}
            />
        </div>
    );
};

export default Input;
