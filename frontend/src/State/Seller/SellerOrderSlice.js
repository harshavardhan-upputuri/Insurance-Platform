import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchOrderBySellerId = createAsyncThunk("/sellerOrders/fetchOrderBySellerId",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/order/seller", {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            console.log("Seller order ", res.data);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

const initialState = {
    orders: [],
    loading: false,
    error: null
}

export const SellerOrderSlice = createSlice({
    name: "sellerOrders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrderBySellerId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchOrderBySellerId.fulfilled, (state, action) => {
            state.loading = false;
            state.orders=action.payload;
        });
        builder.addCase(fetchOrderBySellerId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message;

        });
    }
});

export default SellerOrderSlice.reducer;