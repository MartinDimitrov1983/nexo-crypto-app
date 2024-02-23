import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../../api';
import { PlatformState, TradeActionParams } from '../../../types';
import { TRADES_LIMIT, BINANCE_PAIR_API } from '../../../constants';

const initialState: PlatformState = {
    data: {
        symbol: '',
        price: '',
        error: '',
    },
    trades: [],
    isLoading: false,
    isTradeLoading: false,
};

export const getBinancePairPrice = createAsyncThunk(
    'binance/getPair',
    async (symbol: string, { rejectWithValue }) => {
        const url = `${BINANCE_PAIR_API}?symbol=${symbol}`;
        try {
            const response = await Api.binance.getPair(symbol);
            return {
                symbol: response.data.symbol,
                price: response.data.price,
                error: '',
            };
        } catch (err) {
            rejectWithValue(err);
        }
    },
);

export const getBinanceTrades = createAsyncThunk(
    'binance/getTrades',
    async (
        { symbol, limit = TRADES_LIMIT }: TradeActionParams,
        { rejectWithValue },
    ) => {
        try {
            const response = await Api.binance.getTrades({ symbol, limit });
            return response.data;
        } catch (err) {
            rejectWithValue(err);
        }
    },
);

export const binanceSlice = createSlice({
    initialState,
    name: 'binance',
    reducers: {
        setBinanceData: (state, action) => {
            state.data = action.payload;
        },
        setBinanceTrades: (state, action) => {
            state.trades = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBinancePairPrice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBinancePairPrice.fulfilled, (state, action) => {
                state.data = action.payload;

                state.isLoading = false;
            })
            .addCase(getBinancePairPrice.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(getBinanceTrades.pending, (state) => {
                state.isTradeLoading = true;
            })
            .addCase(getBinanceTrades.fulfilled, (state, action) => {
                state.trades = action.payload;
                state.isTradeLoading = false;
            })
            .addCase(getBinanceTrades.rejected, (state) => {
                state.isTradeLoading = false;
            });
    },
});

export const { setBinanceTrades } = binanceSlice.actions;

export default binanceSlice.reducer;
