import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../../api';
import { PlatformState, TradeActionParams } from '../../../types';
import { TRADES_LIMIT } from '../../../constants';

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

export const getHuobiPairPrice = createAsyncThunk(
    'huobi/getPair',
    async (symbol: string, { rejectWithValue }) => {
        try {
            const response = await Api.huobi.getPair(symbol);
            return {
                symbol: symbol,
                price: response.data.tick.close,
                error: '',
            };
        } catch (err) {
            rejectWithValue(err);
        }
    },
);

export const getHuobiTrades = createAsyncThunk(
    'huobi/getTrades',
    async (
        { symbol, limit = TRADES_LIMIT }: TradeActionParams,
        { rejectWithValue },
    ) => {
        try {
            const response = await Api.huobi.getTrades({ symbol, limit });
            return response.data.data || [];
        } catch (err) {
            rejectWithValue(err);
        }
    },
);

export const huobiSlice = createSlice({
    initialState,
    name: 'huobi',
    reducers: {
        setHuobiData: (state, action) => {
            state.data = action.payload;
        },
        setHuobiTrades: (state, action) => {
            state.trades = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHuobiPairPrice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHuobiPairPrice.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getHuobiPairPrice.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getHuobiTrades.pending, (state) => {
                state.isTradeLoading = true;
            })
            .addCase(getHuobiTrades.fulfilled, (state, action) => {
                state.trades = action.payload;
                state.isTradeLoading = false;
            })
            .addCase(getHuobiTrades.rejected, (state) => {
                state.isTradeLoading = false;
            });
    },
});

export const { setHuobiTrades } = huobiSlice.actions;

export default huobiSlice.reducer;
