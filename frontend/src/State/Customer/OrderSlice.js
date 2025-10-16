import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../config/Api';

export const createOrder = createAsyncThunk("/InsuranceOrder/createOrder",
    async ({ applicationFormId, jwt, paymentGateway }, { rejectWithValue }) => {
        try {
            const res = await api.post(`/api/order/create/${applicationFormId}`, null, {
                headers: { Authorization: `Bearer ${jwt}` },
                params: { paymentMethod: paymentGateway }
            })
            console.log("order created ", res.data);
            if (res.data.payment_link_url) {
                window.location.href = res.data.payment_link_url;
            }
            return res.data;
        } catch (error) {
            console.log("Error ", error.response);
            return rejectWithValue(error.response.data.error || "Failed to fetch order ");
        }
    }
)

export const fetchOrderById = createAsyncThunk("/InsuranceOrder/fetchOrderById",
    async ({ id, jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/order/${id}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            console.log("order  fetched ", res.data);
            return res.data;
        } catch (error) {
            console.log("Error ", error.response);
            return rejectWithValue(error.response.data.error || "Failed to fetch order ");
        }
    }
)

export const fetchOrdersByUser = createAsyncThunk("/InsuranceOrder/fetchOrdersByUser",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/order/user", {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            console.log("order history fetched ", res.data);
            return res.data;
        } catch (error) {
            console.log("Error ", error.response);
            return rejectWithValue(error.response.data.error || "Failed to fetch order ");
        }
    }
)

export const cancelOrder = createAsyncThunk("/InsuranceOrder/cancelOrder",
    async ({ jwt, orderId }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/api/order/cancel/${orderId}`, null, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
            console.log("cancel order", res.data);
            return res.data;
        } catch (error) {
            console.log("Error ", error.response);
            return rejectWithValue(error.response.data.error || "Failed to fetch order ");
        }
    }
)

export const paymentSuccess = createAsyncThunk("/InsuranceOrder/paymentSuccess",
    async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/payment/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                params: { paymentLinkId }
            })
            console.log("payment success ", res.data);
            return res.data;
        } catch (error) {
            console.log("Error ", error.response);
            return rejectWithValue(error.response.data.error || " Payment Failed   ");
        }
    }
)

export const fetchOrderByFormId = createAsyncThunk(
    "/InsuranceOrder/fetchOrderByFormId",
    async ({ formId, jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/order/by-form/${formId}`, {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            console.log("Order fetched by formId", res.data);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch order by formId");
        }
    }
);

const initialState = {
    orders: [],
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: false,
    orderCancelled: false
}

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderCancelled = false;
            })
            .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrdersByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            .addCase(paymentSuccess.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(paymentSuccess.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Payment successfull:', action.payload);
            })
            .addCase(paymentSuccess.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderCancelled = false
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orderCancelled = true
                state.orders = state.orders.map((order) => order.id === action.payload.id ? action.payload : order);
                state.currentOrder = action.payload;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchOrderByFormId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderByFormId.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload; // store the order fetched by formId
            })
            .addCase(fetchOrderByFormId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default orderSlice.reducer;