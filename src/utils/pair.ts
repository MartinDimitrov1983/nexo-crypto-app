import { TRADING_PROVIDERS } from '../types';
import { parsePrice } from './';

export interface ExchangeData {
    id: TRADING_PROVIDERS;
    name: TRADING_PROVIDERS;
    price: number;
    loading: Boolean;
}

export const createExchangeData = (
    provider: TRADING_PROVIDERS,
    price: string | undefined,
    loading: Boolean,
): ExchangeData => {
    return {
        id: provider,
        name: provider,
        price: parsePrice(price),
        loading,
    };
};
