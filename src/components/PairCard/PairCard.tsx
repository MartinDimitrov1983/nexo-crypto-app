import React, { MouseEventHandler } from 'react';
import styles from './PairCard.module.css';
import { Kraken, Bitfinex, Huobi, Binance } from '../../assets';
import { INFO_NOT_AVAILABLE, pricePair } from '../../constants';
import { TRADING_PROVIDERS } from '../../types';

interface PairCardProps {
    name: string;
    pair: string | undefined;
    price: number;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const EXCHANGES = {
    [TRADING_PROVIDERS.binance]: <Binance className={styles.mainIcon} />,
    [TRADING_PROVIDERS.bitfinex]: <Bitfinex className={styles.mainIcon} />,
    [TRADING_PROVIDERS.huobi]: <Huobi className={styles.mainIcon} />,
    [TRADING_PROVIDERS.kraken]: <Kraken className={styles.mainIcon} />,
};

const PairCard = ({ name, pair, price, onClick = () => {} }: PairCardProps) => {
    return (
        <div className={styles.cardWrapper}>
            {EXCHANGES[name as keyof typeof EXCHANGES]}

            <div className={styles.cardContent}>
                <div className={styles.name}>{name}</div>

                <div
                    className={`${styles.info} ${price && styles.pointer}`}
                    onClick={price ? onClick : () => {}}
                >
                    {price ? pricePair(pair, price) : INFO_NOT_AVAILABLE}
                </div>
            </div>
        </div>
    );
};

export default PairCard;
