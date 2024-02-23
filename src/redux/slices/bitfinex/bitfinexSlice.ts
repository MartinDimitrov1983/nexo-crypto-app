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

export const getBitfinexPairPrice = createAsyncThunk(
    'bitfinex/getPair',
    async (symbol: string, { rejectWithValue }) => {
        try {
            const response = await Api.bitfinex.getPair(symbol);
            return {
                symbol: symbol,
                price: response.data[6]!,
                error: '',
            };
        } catch (err) {
            rejectWithValue(err);
        }
    },
);

export const getBitfinexTrades = createAsyncThunk(
    'bitfinex/getTrades',
    async (
        { symbol, limit = TRADES_LIMIT }: TradeActionParams,
        { rejectWithValue },
    ) => {
        try {
            const response = await Api.bitfinex.getTrades({ symbol, limit });
            return response.data;
        } catch (err) {
            rejectWithValue(err);
        }
    },
);

export const bitfinexSlice = createSlice({
    initialState,
    name: 'bitfinex',
    reducers: {
        setBitfinexData: (state, action) => {
            state.data = action.payload;
        },
        setBitfinexTrades: (state, action) => {
            state.trades = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBitfinexPairPrice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBitfinexPairPrice.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getBitfinexPairPrice.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getBitfinexTrades.pending, (state) => {
                state.isTradeLoading = true;
            })
            .addCase(getBitfinexTrades.fulfilled, (state, action) => {
                state.trades = action.payload;
                state.isTradeLoading = false;
            })
            .addCase(getBitfinexTrades.rejected, (state) => {
                state.isTradeLoading = false;
            });
    },
});

export const { setBitfinexTrades } = bitfinexSlice.actions;

export default bitfinexSlice.reducer;
