import React, { ChangeEvent, FormEventHandler } from 'react';
import { Input, Button } from '../';
import { ButttonType } from '../Button/Button';
import { SEARCH_LABEL, CURRENCY_LABEL } from '../../constants';
import styles from './Form.module.css';

export interface FormProps {
    handleSearch: FormEventHandler;
    handleOnChange: Function;
    value: string;
}

const Form = ({ handleSearch, handleOnChange, value }: FormProps) => {
    return (
        <form onSubmit={handleSearch}>
            <div className={styles.container}>
                <Input
                    id="pair"
                    labelName={CURRENCY_LABEL}
                    value={value}
                    handleOnChange={(e: ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault();
                        handleOnChange(e!.target!.value);
                    }}
                />
                <Button
                    type={ButttonType.SUBMIT}
                    shouldShowIcon={true}
                    isDisabled={!value}
                    className={`${!value && styles.buttonDisabled}`}
                >
                    {SEARCH_LABEL}
                </Button>
            </div>
        </form>
    );
};

export default Form;
