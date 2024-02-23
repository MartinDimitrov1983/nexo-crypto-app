import { TRADE_TYPES, TRADING_PROVIDERS } from '../types';

export interface Trade {
    id: string;
    price: number;
    qty: number;
    type: TRADE_TYPES;
}

export interface TradesData {
    id: TRADING_PROVIDERS;
    name: TRADING_PROVIDERS;
    trades: Trade[];
}

export const mapBinanceTrades = (trades: any[]): Trade[] =>
    trades?.map((trade) => ({
        id: trade.id,
        price: trade.price,
        qty: trade.qty,
        type: trade.isBuyerMaker ? TRADE_TYPES.buy : TRADE_TYPES.sell,
    })) || [];

export const mapBitfinexTrades = (
    trades: [string, string, number, number][],
): Trade[] =>
    trades?.map((trade) => ({
        id: trade[0],
        price: trade[3],
        qty: Math.abs(trade[2]),
        type: trade[2] > 0 ? TRADE_TYPES.buy : TRADE_TYPES.sell,
    })) || [];

export const mapHuobiTrades = (trades: any): Trade[] =>
    trades?.map((trade: { data: any[] }) => {
        const { id, amount, price, direction } = trade?.data?.[0] || {};
        return {
            id,
            price,
            qty: amount,
            type:
                direction === TRADE_TYPES.buy
                    ? TRADE_TYPES.buy
                    : TRADE_TYPES.sell,
        };
    }) || [];

export const mapKrakenTrades = (trades: any[]): Trade[] =>
    trades?.map((trade, index) => ({
        id: `${trade[5]}-${index}`,
        price: trade[0],
        qty: trade[1],
        type: trade[3] === 'b' ? TRADE_TYPES.buy : TRADE_TYPES.sell,
    })) || [];

const MAPPER = {
    [TRADING_PROVIDERS.binance]: mapBinanceTrades,
    [TRADING_PROVIDERS.bitfinex]: mapBinanceTrades,
    [TRADING_PROVIDERS.huobi]: mapHuobiTrades,
    [TRADING_PROVIDERS.kraken]: mapKrakenTrades,
};

export const createTradeData = (
    provider: TRADING_PROVIDERS,
    trades: any,
): TradesData => {
    return {
        id: provider,
        name: provider,
        trades: MAPPER[provider](trades),
    };
};
