import { configureStore } from '@reduxjs/toolkit';
import { huobiSlice, getHuobiPairPrice, getHuobiTrades } from './huobiSlice';
import { Api } from '../../../api';
import { AxiosResponse } from 'axios';

describe('huobiSlice', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('should getHuobiPairPrice return data', async () => {
        const data = {
            tick: {
                close: 0.002055,
            },
        };
        jest.spyOn(Api.huobi, 'getPair').mockResolvedValue({
            data,
        } as unknown as AxiosResponse<any, any>);
        const store = configureStore({ reducer: huobiSlice.reducer });
        await store.dispatch(getHuobiPairPrice('SOLBTC'));
        expect(store.getState()).toEqual({
            data: {
                error: '',
                price: 0.002055,
                symbol: 'SOLBTC',
            },
            isLoading: false,
            isTradeLoading: false,
            trades: [],
        });
    });

    test('should getHuobiTrades return data', async () => {
        const data = {
            data: [
                {
                    id: 3574704476,
                    ts: 1708600497151,
                    data: [
                        {
                            id: 3.5747044761001597e25,
                            ts: 1708600497151,
                            'trade-id': 5291399,
                            amount: 0.44,
                            price: 0.002055,
                            direction: 'sell',
                        },
                    ],
                },
                {
                    id: 3574703737,
                    ts: 1708600471574,
                    data: [
                        {
                            id: 3.5747037371001595e25,
                            ts: 1708600471574,
                            'trade-id': 5291398,
                            amount: 1.43,
                            price: 0.002056,
                            direction: 'sell',
                        },
                    ],
                },
            ],
        };
        jest.spyOn(Api.huobi, 'getTrades').mockResolvedValue({
            data,
        } as unknown as AxiosResponse<any, any>);
        const store = configureStore({ reducer: huobiSlice.reducer });
        await store.dispatch(getHuobiTrades({ symbol: 'SOLBTC', limit: 10 }));
        expect(store.getState()).toEqual({
            data: {
                error: '',
                price: '',
                symbol: '',
            },
            isLoading: false,
            isTradeLoading: false,
            trades: data.data,
        });
    });
});
