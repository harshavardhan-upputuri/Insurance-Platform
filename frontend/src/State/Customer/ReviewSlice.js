import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchReviewByProductId = createAsyncThunk("/review/fetchReviewByProductId",
    async ({ productId }, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/products/${productId}/reviews`);
            console.log("reviews -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const createReview = createAsyncThunk("/review/createReview",
    async ({ productId, jwt, req }, { rejectWithValue }) => {
        try {
            const res = await api.post(`/api/products/${productId}/reviews`, req, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("reviews -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const updateReview = createAsyncThunk("/Review/updateReview",
    async ({ reviewId, jwt, req }, { rejectWithValue }) => {
        try {
            const res = await api.patch(`/api/reviews/${reviewId}`, req, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("reviews -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const deleteReview = createAsyncThunk("/Review/deleteReview",
    async ({ reviewId, jwt }, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/api/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("reviews -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    reviews: [],
    loading: false,
    error: null
}

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewByProductId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewByProductId.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviewByProductId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const index = state.reviews.findIndex(r => r.id === action.payload.id);
                if (index !== -1) state.reviews[index] = action.payload;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(r => r.id !== action.meta.arg.reviewId);
            });
    }
});

export default reviewSlice.reducer;