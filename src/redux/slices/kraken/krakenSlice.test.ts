import { configureStore } from '@reduxjs/toolkit';
import {
    krakenSlice,
    getKrakenPairPrice,
    getKrakenTrades,
} from './krakenSlice';
import { AxiosResponse } from 'axios';
import { Api } from '../../../api';

describe('krakenSlice', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('should getKrakenPairPrice return data', async () => {
        const data = {
            result: {
                SOLXBT: {
                    a: ['0.002052500', '10', '10.000'],
                    b: ['0.002051100', '10', '10.000'],
                    c: ['0.002051300', '0.28036419'],
                    v: ['7092.70132727', '19716.26160785'],
                    p: ['0.002028100', '0.002005842'],
                    t: [557, 1483],
                    l: ['0.001992500', '0.001972000'],
                    h: ['0.002065800', '0.002065800'],
                    o: '0.002022300',
                },
            },
        };
        jest.spyOn(Api.kraken, 'getPair').mockResolvedValue({
            data,
        } as unknown as AxiosResponse<any, any>);
        const store = configureStore({ reducer: krakenSlice.reducer });
        await store.dispatch(getKrakenPairPrice('SOLBTC'));
        expect(store.getState()).toEqual({
            data: {
                error: '',
                price: '0.002051300',
                symbol: 'SOLBTC',
            },
            isLoading: false,
            isTradeLoading: false,
            trades: [],
        });
    });

    test('should getKrakenTrades return data', async () => {
        const data = {
            result: {
                SOLXBT: [
                    [
                        '0.001973300',
                        '99.56812498',
                        1708540083.6380847,
                        's',
                        'l',
                        '',
                        2345849,
                    ],
                    [
                        '0.001973000',
                        '544.23220348',
                        1708540083.642992,
                        'b',
                        'l',
                        '',
                        2345850,
                    ],
                ],
            },
        };

        jest.spyOn(Api.kraken, 'getTrades').mockResolvedValue({
            data,
        } as unknown as AxiosResponse<any, any>);
        const store = configureStore({ reducer: krakenSlice.reducer });
        await store.dispatch(getKrakenTrades({ symbol: 'SOLBTC', limit: 10 }));
        expect(store.getState()).toEqual({
            data: {
                error: '',
                price: '',
                symbol: '',
            },
            isLoading: false,
            isTradeLoading: false,
            trades: data.result.SOLXBT,
        });
    });
});
