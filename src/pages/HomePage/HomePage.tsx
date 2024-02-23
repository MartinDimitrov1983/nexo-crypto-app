import React, { useState, MouseEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    PageLayout,
    Form,
    Button,
    PairCard,
    Modal,
    TradeCard,
    Loading,
} from '../../components';
import { Sort, SORTING_TYPES } from '../../types';
import {
    usePairData,
    useTradeData,
    useRefresh,
    useMapDisptchTrades,
} from '../../hooks/';
import { CRYPTO_EXCHANGE_APP, sortOrder } from '../../constants';
import styles from './HomePage.module.css';

export const INITIAL_SORT_STATE: Sort = {
    shouldSort: false,
    order: SORTING_TYPES.ASCENDING,
};

const HomePage = ({ urlParams }: { urlParams: Boolean }) => {
    const [sort, setSort] = useState<Sort>(INITIAL_SORT_STATE);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pair, setPair] = useState<string>('');
    const [exchange, setExchange] = useState<string>('');
    const params = useParams();

    const { exchanges, isLoading, isLoaded, loadPair, symbol } = usePairData(
        pair?.toUpperCase(),
        sort,
    );
    const { getExchange } = useTradeData(pair.toUpperCase());
    const dispatchTrade = useMapDisptchTrades();

    useEffect(() => {
        if (params.pair) {
            setPair(params.pair);
            loadPair();
        }
    }, [params]);

    useRefresh(
        () => {
            loadPair();
        },
        20000,
        !!pair,
    );

    const orderHandler = () => {
        setSort((prevState) =>
            prevState.order === SORTING_TYPES.ASCENDING
                ? { order: SORTING_TYPES.DESCENDING, shouldSort: true }
                : { order: SORTING_TYPES.ASCENDING, shouldSort: true },
        );
    };

    const handleSearch = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSort(INITIAL_SORT_STATE);
        loadPair();
    };

    const handleOnChange = (value: string) => {
        setPair(value);
    };

    const handlePriceClick = (name: string) => {
        setExchange(name);
        setIsOpen(true);
        dispatchTrade(name, pair);
    };

    return (
        <PageLayout title={CRYPTO_EXCHANGE_APP} loading={false}>
            {!urlParams && (
                <Form
                    handleSearch={handleSearch}
                    handleOnChange={handleOnChange}
                    value={pair}
                />
            )}
            <div className={styles.cards}>
                {isLoading && <Loading />}
                {isLoaded && (
                    <>
                        <Button
                            className={styles.button}
                            onClick={orderHandler}
                        >
                            {sortOrder(sort.order)}
                        </Button>
                        {exchanges.map((exchnage) => {
                            return (
                                <PairCard
                                    key={exchnage.id}
                                    name={exchnage.name}
                                    pair={symbol}
                                    price={exchnage.price}
                                    onClick={() =>
                                        handlePriceClick(exchnage.name)
                                    }
                                />
                            );
                        })}
                    </>
                )}
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                header="Historical Trades"
                isLoading={getExchange(exchange)?.length === 0}
            >
                {getExchange(exchange)?.map((data) => {
                    return (
                        <TradeCard
                            key={data.id}
                            tradeType={data.type}
                            price={data.price?.toString()}
                            amount={data.qty?.toString()}
                        />
                    );
                })}
            </Modal>
        </PageLayout>
    );
};

export default HomePage;
