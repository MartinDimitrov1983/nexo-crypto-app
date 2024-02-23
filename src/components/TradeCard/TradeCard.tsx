import React, { useState } from 'react';
import styles from './TradeCard.module.css';
import { AMOUNT, PRICE, TRADE_TYPE } from '../../constants';
import { TRADE_TYPES } from '../../types/commonTypes';

interface CardInfoProps {
    tradeType: TRADE_TYPES;
    price: string;
    amount: string;
}

const TradeCard = ({ tradeType, price, amount }: CardInfoProps) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardContent}>
                <div className={styles.name}>{TRADE_TYPE}</div>
                <div
                    className={`${
                        tradeType === TRADE_TYPES.sell
                            ? styles.sell
                            : styles.buy
                    }`}
                >
                    {tradeType}
                </div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.info}>{PRICE}</div>
                <div className={styles.info}>{price}</div>
            </div>
            <div className={styles.cardContent}>
                <div className={styles.info}>{AMOUNT}</div>
                <div className={styles.info}>{amount}</div>
            </div>
        </div>
    );
};

export default TradeCard;
