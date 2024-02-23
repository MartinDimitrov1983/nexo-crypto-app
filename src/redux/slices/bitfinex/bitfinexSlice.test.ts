import { configureStore } from '@reduxjs/toolkit';
import {
    bitfinexSlice,
    getBitfinexPairPrice,
    getBitfinexTrades,
} from './bitfinexSlice';
import { Api } from '../../../api';
import { AxiosResponse } from 'axios';

describe('bitfinexSlice', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('should getBitfinexPairPrice return data', async () => {
        const data = [
            0.0020483, 2458.39381123, 0.00205, 2310.72923864, 0.0000306,
            0.01516804, 0.002048,
        ];
        jest.spyOn(Api.bitfinex, 'getPair').mockResolvedValue({
            data,
        } as unknown as AxiosResponse<any, any>);
        const store = configureStore({ reducer: bitfinexSlice.reducer });
        await store.dispatch(getBitfinexPairPrice('SOLBTC'));
        expect(store.getState()).toEqual({
            data: {
                error: '',
                price: 0.002048,
                symbol: 'SOLBTC',
            },
            isLoading: false,
            isTradeLoading: false,
            trades: [],
        });
    });

    test('should getBitfinexTrades return data', async () => {
        const data = [
            [1534492520, 1708602815057, 0.09471167, 0.002048],
            [1534492483, 1708602177855, 3.095, 0.002049],
            [1534492476, 1708602026376, 0.06, 0.0020499],
            [1534492465, 1708601703180, 0.12107187, 0.0020535],
            [1534492437, 1708601003374, 0.60449042, 0.0020531],
            [1534492419, 1708600590939, 3.086, 0.0020528],
        ];
        jest.spyOn(Api.bitfinex, 'getTrades').mockResolvedValue({
            data,
        } as unknown as AxiosResponse<any, any>);
        const store = configureStore({ reducer: bitfinexSlice.reducer });
        await store.dispatch(
            getBitfinexTrades({ symbol: 'SOLBTC', limit: 10 }),
        );
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
