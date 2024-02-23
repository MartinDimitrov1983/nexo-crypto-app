export interface Exchange {
    id: string;
    name: string;
    price: number;
    loading: Boolean;
}

export interface Sort {
    order: string;
    shouldSort: boolean;
}

export enum TRADING_PROVIDERS {
    binance = 'binance',
    bitfinex = 'bitfinex',
    huobi = 'huobi',
    kraken = 'kraken',
}

export enum TRADE_TYPES {
    buy = 'Buy',
    sell = 'Sell',
}

export enum SORTING_TYPES {
    ASCENDING = 'Ascending',
    DESCENDING = 'Descending',
}
