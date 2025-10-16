import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchWishlistByUser = createAsyncThunk("/wishlist/fetchWishlistByUser",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/wishlist", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("Wishlist -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const addProductToWishlist = createAsyncThunk("/wishlist/addProductToWishlist",
    async ({ jwt, productId }, { rejectWithValue }) => {
        try {
            const res = await api.post(`/api/wishlist/add-product/${productId}`,{}, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("Wishlist -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState={
    wishlists:[],
    loading:false,
    error:null
}

const wishlistSlice=createSlice({
    name:"wishlist",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchWishlistByUser.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(fetchWishlistByUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.wishlists=action.payload;
        });
        builder.addCase(fetchWishlistByUser.rejected,(state)=>{
            state.loading=false;
            state.error=action.payload;
        });
        builder.addCase(addProductToWishlist.pending,(state)=>{
            state.loading=true;
        });
        builder.addCase(addProductToWishlist.fulfilled,(state,action)=>{
            state.loading=false;
            state.wishlists=action.payload;
        });
        builder.addCase(addProductToWishlist.rejected,(state)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }
});

export default wishlistSlice.reducer;