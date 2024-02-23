import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../../api';
import { PlatformState, TradeActionParams } from '../../../types'
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
export const getKrakenPairPrice = createAsyncThunk(
    'kraken/getPair',
    async (symbol: string, { rejectWithValue }) => {
        try {
            const response = await Api.kraken.getPair(symbol);
            const [firstResultKey] = Object.keys(response.data.result);

            return {
                symbol: symbol,
                price: response.data.result[firstResultKey].c[0],
                error: '',
            };
        } catch (err) {
            rejectWithValue(err);
        }
    },
);

export const getKrakenTrades = createAsyncThunk(
    'kraken/getTrades',
    async (
        { symbol, limit = TRADES_LIMIT }: TradeActionParams,
        { rejectWithValue },
    ) => {
        try {
            const response = await Api.kraken.getTrades({ symbol, limit });
            const [firstResultKey] = Object.keys(response.data.result).filter(
                (key) => key !== 'last',
            );
            return response.data.result[firstResultKey].slice(0, limit);
        } catch (err) {
            rejectWithValue(err);
        }
    },
);

export const krakenSlice = createSlice({
    initialState,
    name: 'kraken',
    reducers: {
        setKrakenData: (state, action) => {
            state.data = action.payload;
        },
        setKrakenTrades: (state, action) => {
            state.trades = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKrakenPairPrice.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKrakenPairPrice.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(getKrakenPairPrice.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getKrakenTrades.pending, (state) => {
                state.isTradeLoading = true;
            })
            .addCase(getKrakenTrades.fulfilled, (state, action) => {
                state.trades = action.payload;
                state.isTradeLoading = false;
            })
            .addCase(getKrakenTrades.rejected, (state) => {
                state.isTradeLoading = false;
            });
    },
});

export const { setKrakenTrades } = krakenSlice.actions;

export default krakenSlice.reducer;
