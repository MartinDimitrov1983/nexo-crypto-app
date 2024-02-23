import { useCallback } from 'react';
import { useAppDispatch } from '../redux/hooks';
import {
    getBinanceTrades,
    getBitfinexTrades,
    getHuobiTrades,
    getKrakenTrades,
} from '../redux/slices';

interface TradeDispatchMapper {
    [key: string]: (symbol: string) => void;
}

const useMapDispatchTrades = (): ((name: string, pair: string) => void) => {
    const dispatch = useAppDispatch();

    const dispatchers: TradeDispatchMapper = {
        binance: (symbol: string) => {
            dispatch(getBinanceTrades({ symbol: symbol?.toUpperCase() }));
        },
        bitfinex: (symbol: string) => {
            dispatch(getBitfinexTrades({ symbol: symbol?.toUpperCase() }));
        },
        kraken: (symbol: string) => {
            dispatch(getKrakenTrades({ symbol: symbol?.toUpperCase() }));
        },
        huobi: (symbol: string) => {
            dispatch(getHuobiTrades({ symbol: symbol?.toUpperCase() }));
        },
    };

    const dispatchTrade = useCallback(
        (name: string, pair: string) =>
            dispatchers[name as keyof TradeDispatchMapper](pair),
        [dispatchers, dispatch],
    );

    return dispatchTrade;
};

export default useMapDispatchTrades;
