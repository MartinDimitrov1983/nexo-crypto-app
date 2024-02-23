import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout, TradeCard, Loading } from '../../components';
import styles from './DetailsPage.module.css';
import { useTradeData } from '../../hooks';
import { CRYPTO_EXCHANGE_APP, INFO_NOT_AVAILABLE } from '../../constants';
const DetailsPage = () => {
    const { pair } = useParams<{ pair?: string }>();
    const prevParamRef = useRef<string | undefined>();
    const { exchanges, loadExchanges } = useTradeData(
        (pair as string).toUpperCase(),
    );

    useEffect(() => {
        if (pair && pair !== prevParamRef.current) {
            loadExchanges();
            prevParamRef.current = pair!;
        }
    }, [loadExchanges, pair]);

    return (
        <PageLayout title={CRYPTO_EXCHANGE_APP} loading={false}>
            <div className={styles.container}>
                {exchanges.map((exchange) => {
                    return (
                        <div className={styles.exchange} key={exchange.id}>
                            <p className={styles.title}>{exchange.name}</p>
                            {exchange.isLoading ? (
                                <Loading />
                            ) : (
                                <div className={styles.cards}>
                                    {exchange?.trades?.length === 0 ? (
                                        <p>{INFO_NOT_AVAILABLE}</p>
                                    ) : (
                                        exchange.trades?.map((trade) => {
                                            return (
                                                <TradeCard
                                                    key={trade.id}
                                                    tradeType={trade.type}
                                                    price={trade.price.toString()}
                                                    amount={trade.qty.toString()}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </PageLayout>
    );
};

export default DetailsPage;
