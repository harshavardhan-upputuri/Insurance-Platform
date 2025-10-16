import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {api} from '../../config/Api';

export const fetchProductById=createAsyncThunk("products/fetchProductById",
    async(productId,{rejectWithValue})=>{
        try {
            const res=await api.get(`/products/${productId}`);
            const data=res.data;
            console.log("data ",data);
            return data;
        } catch (error) {
            console.log("error -> ",error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const searchProduct=createAsyncThunk("/products/searchProduct",
    async(query="",{rejectWithValue})=>{
        try {
            const res= await api.get("/products/search",{
                params:{
                    query,
                },
            });
            const data=res.data;
            console.log("Search product ",data);
            return data;
        } catch (error) {
            console.log("error -> ",error);
              return rejectWithValue(error.response?.data || error.message);

        }
    }
)

export const fetchAllProducts=createAsyncThunk("/products/fetchAllProducts",
    async(params,{rejectWithValue})=>{
        try {
            const res= await api.get("/products",{
                params:{
                    ...params,
                    pageNumber:params.pageNumber||0,
                }
            });
            const data= res.data;
            console.log("All Product data: ",data);
            return data;
        } catch (error) {
            console.log("error -> ",error);
              return rejectWithValue(error.response?.data || error.message);

        }
    }
)

const initialState={
    product:null,
    products:[],
    loading:false,
    error:null,
    totalPages:1,
    searchProducts:[]
}

const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{},
     extraReducers:(builder)=>{
        builder.
        addCase(fetchProductById.pending,(state)=>{
            state.loading=true;
        }).
        addCase(fetchProductById.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
        }).
        addCase(fetchProductById.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).
        addCase(fetchAllProducts.pending,(state)=>{
            state.loading=true;
        }).
        addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload.content;
        }).
        addCase(fetchAllProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }).
        addCase(searchProduct.pending,(state)=>{
            state.loading=true;
        }).
        addCase(searchProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.searchProducts=action.payload;
        }).
        addCase(searchProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        ;
    }
});


export default productSlice.reducer;