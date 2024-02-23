import axios from 'axios';
import {
    BINANCE_PAIR_API,
    BINANCE_TRADES_API,
    BITFINEX_PAIR_API,
    BITFINEX_TRADES_API,
    HUOBI_PAIR_API,
    HUOBI_TRADES_API,
    KRAKEN_PAIR_API,
    KRAKEN_TRADES_API,
} from '../constants';
import { TradeActionParams } from '../types';

const Api = {
    binance: {
        async getPair(symbol: string) {
            return await axios(`${BINANCE_PAIR_API}?symbol=${symbol}`);
        },
        async getTrades({ symbol, limit }: TradeActionParams) {
            return await axios(
                `${BINANCE_TRADES_API}?symbol=${symbol}&limit=${limit}`,
            );
        },
    },
    bitfinex: {
        async getPair(symbol: string) {
            return await axios(`${BITFINEX_PAIR_API}/t${symbol}`);
        },
        async getTrades({ symbol, limit }: TradeActionParams) {
            return await axios(
                `${BITFINEX_TRADES_API}/t${symbol}/hist?limit=${limit}`,
            );
        },
    },
    huobi: {
        async getPair(symbol: string) {
            return await axios(
                `${HUOBI_PAIR_API}?symbol=${symbol.toLowerCase()}`,
            );
        },
        async getTrades({ symbol, limit }: TradeActionParams) {
            return await axios(
                `${HUOBI_TRADES_API}?symbol=${symbol?.toLowerCase()}&size=${limit}`,
            );
        },
    },
    kraken: {
        async getPair(symbol: string) {
            return await axios(`${KRAKEN_PAIR_API}?pair=${symbol}`);
        },
        async getTrades({ symbol, limit }: TradeActionParams) {
            return await axios(`${KRAKEN_TRADES_API}?pair=${symbol}`);
        },
    },
};

export { Api };
