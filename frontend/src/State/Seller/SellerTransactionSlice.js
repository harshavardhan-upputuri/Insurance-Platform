import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchTransactionBySellerId = createAsyncThunk("/sellerTransactions/fetchTransactionBySellerId",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/transactions/seller", {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            console.log("transactions  ", res.data);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

const initialState = {
    transactions: [],
    loading: false,
    error: null
}

export const SellerTransactionSlice = createSlice({
    name: "sellerTransactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransactionBySellerId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTransactionBySellerId.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions=action.payload;
        });
        builder.addCase(fetchTransactionBySellerId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message;

        });
    }
});

export default SellerTransactionSlice.reducer;