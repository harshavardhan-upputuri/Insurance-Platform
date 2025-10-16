import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../config/Api';

export const fetchAllTransactionsByUserId = createAsyncThunk("/Transaction/fetchAllTransactionsByUserId",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/transactions/user", {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            console.log("Transactions -> ", res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error || " Payment Failed   ");
        }
    }
)

const initialState = {
    transactions: [],
    loading: false,
    error: null
}

const TransactionSlice = createSlice({
    name: "TransactionSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTransactionsByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetchAllTransactionsByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchAllTransactionsByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default TransactionSlice.reducer;