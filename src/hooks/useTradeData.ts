import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
    getBinanceTrades,
    getBitfinexTrades,
    getHuobiTrades,
    getKrakenTrades,
} from '../redux/slices';
import { TRADING_PROVIDERS } from '../types';
import {
    mapBinanceTrades,
    mapBitfinexTrades,
    mapHuobiTrades,
    mapKrakenTrades,
} from '../utils';

const useTradeData = (pair: string) => {
    const binance = useAppSelector((state) => state.binance);
    const bitfinex = useAppSelector((state) => state.bitfinex);
    const huobi = useAppSelector((state) => state.huobi);
    const kraken = useAppSelector((state) => state.kraken);
    const params = useParams();
    const dispatch = useAppDispatch();

    const searchValue = params.pair ? params.pair : `${pair}`;

    const exchanges = useMemo(() => {
        const arr = [
            {
                id: TRADING_PROVIDERS.binance,
                name: TRADING_PROVIDERS.binance,
                trades: mapBinanceTrades(binance.trades),
                isLoading:binance.isTradeLoading
            },
            {
                id: TRADING_PROVIDERS.bitfinex,
                name: TRADING_PROVIDERS.bitfinex,
                trades: mapBitfinexTrades(bitfinex.trades),
                isLoading:bitfinex.isTradeLoading
            },
            {
                id: TRADING_PROVIDERS.huobi,
                name: TRADING_PROVIDERS.huobi,
                trades: mapHuobiTrades(huobi.trades),
                isLoading:huobi.isTradeLoading
            },
            {
                id: TRADING_PROVIDERS.kraken,
                name: TRADING_PROVIDERS.kraken,
                trades: mapKrakenTrades(kraken.trades),
                isLoading:kraken.isTradeLoading
            },
        ];

        return arr;
    }, [
        binance.trades,
        bitfinex.trades,
        huobi.trades,
        kraken.trades,
        searchValue,
    ]);

    const getExchange = (name: string) => {
        return exchanges.filter((exchange) => exchange.name === name)?.[0]
            ?.trades;
    };

    const loadExchanges = () => {
        dispatch(getBinanceTrades({ symbol: pair?.toUpperCase() }));
        dispatch(getBitfinexTrades({ symbol: pair?.toUpperCase() }));
        dispatch(getHuobiTrades({ symbol: pair?.toUpperCase() }));
        dispatch(getKrakenTrades({ symbol: pair?.toUpperCase() }));
    };

    return {
        exchanges,
        loadExchanges,
        getExchange,
    };
};

export default useTradeData;
