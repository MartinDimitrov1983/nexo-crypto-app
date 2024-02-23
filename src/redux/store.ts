import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import binanceReducer from './slices/binance/binanceSlice';
import bitfinexReducer from './slices/bitfinex/bitfinexSlice';
import krakenReducer from './slices/kraken/krakenSlice';
import huobiReducer from './slices/huobi/huobiSlice';

export const store = configureStore({
    reducer: {
        binance: binanceReducer,
        bitfinex: bitfinexReducer,
        kraken: krakenReducer,
        huobi: huobiReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
