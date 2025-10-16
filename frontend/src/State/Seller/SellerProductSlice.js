import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../config/Api';

export const createProduct = createAsyncThunk("/sellerProduct/createProduct",
    async ({ request, jwt }, { rejectWithValue }) => {
        try {
            const res = await api.post("/seller/products", request, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            // console.log("Product -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

export const fetchProducts = createAsyncThunk("/sellerProduct/getProduct",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/seller/products", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("Products => ", res.data);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

export const deleteProduct = createAsyncThunk("/sellerProduct/deleteProduct",
    async ({ productId, jwt }, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/seller/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            return res;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

export const updateProduct = createAsyncThunk("/sellerProduct/updateProduct",
    async ({ productId, req, jwt }, { rejectWithValue }) => {
        try {
            const res = await api.put(`/seller/products/${productId}`, req, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("Updated product -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

const initialState = {
    products: [],
    loading: false,
    error: null,
}

const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message;

        });
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message;

        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            const deletedId = action.meta.arg.productId;  
            state.products = state.products.filter(p => p.id !== deletedId);
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message;

        });
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }

        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message;

        });
    }

})

export default sellerProductSlice.reducer;