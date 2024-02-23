import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
    getBinancePairPrice,
    getBitfinexPairPrice,
    getHuobiPairPrice,
    getKrakenPairPrice,
} from '../redux/slices';
import { useParams } from 'react-router-dom';
import { sortArray } from '../utils';
import { TRADING_PROVIDERS, Sort, Exchange } from '../types/commonTypes';
import { parsePrice } from '../utils';

const usePairData = (pair: string, sort: Sort) => {
    const binance = useAppSelector((state) => state.binance);
    const bitfinex = useAppSelector((state) => state.bitfinex);
    const huobi = useAppSelector((state) => state.huobi);
    const kraken = useAppSelector((state) => state.kraken);
    const dispatch = useAppDispatch();

    const exchanges = useMemo(() => {
        let arr: Exchange[] = [
            {
                id: TRADING_PROVIDERS.binance,
                name: TRADING_PROVIDERS.binance,
                price: parsePrice(binance.data?.price),
                loading: binance.isLoading,
            },
            {
                id: 'bitfinex',
                name: 'bitfinex',
                price: parsePrice(bitfinex.data?.price),
                loading: bitfinex.isLoading,
            },
            {
                id: 'huobi',
                name: 'huobi',
                price: parsePrice(huobi.data?.price),
                loading: huobi.isLoading,
            },
            {
                id: 'kraken',
                name: 'kraken',
                price: parsePrice(kraken.data?.price),
                loading: kraken.isLoading,
            },
        ];

        if (sort.shouldSort === true) {
            sortArray(arr, sort);
        }

        return arr;
    }, [
        binance.data?.price,
        bitfinex.data?.price,
        huobi.data?.price,
        kraken.data?.price,
        binance.isLoading,
        bitfinex.isLoading,
        huobi.isLoading,
        kraken.isLoading,
        sort,
    ]);

    const isLoading = useMemo(
        () => exchanges.some((pair) => pair.loading === true),
        [exchanges],
    );

    const isLoaded = useMemo(() => {
        return pair && !isLoading;
    }, [exchanges]);

    const params = useParams();
    const searchValue = params.pair
        ? params.pair.toUpperCase()
        : pair.toUpperCase();

    const loadPair = () => {
        dispatch(getBinancePairPrice(searchValue));
        dispatch(getBitfinexPairPrice(searchValue));
        dispatch(getHuobiPairPrice(searchValue));
        dispatch(getKrakenPairPrice(searchValue));
    };
    const symbol =
        binance.data?.symbol ||
        bitfinex.data?.symbol ||
        huobi.data?.symbol ||
        kraken.data?.symbol;

    return { exchanges, isLoading, isLoaded, loadPair, symbol };
};

export default usePairData;
