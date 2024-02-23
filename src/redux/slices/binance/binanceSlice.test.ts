import { configureStore } from '@reduxjs/toolkit';
import {
    binanceSlice,
    getBinancePairPrice,
    getBinanceTrades,
} from './binanceSlice';
import { Api } from '../../../api';
import { AxiosResponse } from 'axios';

describe('binanceSlice', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('should getBinancePairPrice return data', async () => {
        const data = { symbol: 'SOLBTC', price: '0.00204780' };
        jest.spyOn(Api.binance, 'getPair').mockResolvedValue({
            data,
        } as unknown as AxiosResponse<any, any>);
        const store = configureStore({ reducer: binanceSlice.reducer });
        await store.dispatch(getBinancePairPrice('SOLBTC'));
        expect(store.getState()).toEqual({
            data: {
                ...data,
                error: '',
            },
            isLoading: false,
            isTradeLoading: false,
            trades: [],
        });
    });

    test('should getBinanceTrades return data', async () => {
        const data = [
            {
                id: 85156675,
                isBestMatch: true,
                isBuyerMaker: true,
                price: '0.00204670',
                qty: '0.13000000',
                quoteQty: '0.00026607',
                time: 1708602217782,
            },
        ];
        jest.spyOn(Api.binance, 'getTrades').mockResolvedValue({
            data,
        } as unknown as AxiosResponse<any, any>);
        const store = configureStore({ reducer: binanceSlice.reducer });
        await store.dispatch(getBinanceTrades({ symbol: 'SOLBTC', limit: 10 }));
        expect(store.getState()).toEqual({
            data: {
                error: '',
                price: '',
                symbol: '',
            },
            isLoading: false,
            isTradeLoading: false,
            trades: data,
        });
    });
});
