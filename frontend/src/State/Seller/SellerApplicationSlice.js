import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const reviewForm = createAsyncThunk("/SellerApplication/reviewForm",
    async({jwt,formId,approve},{rejectWithValue})=>{
        try {
            const res= await api.post(`/api/applicationform/review/${formId}?approve=${approve}`,null,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("Response of review ",res.data);
            return res.data;
            
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

export const getFormsBySeller=createAsyncThunk("/SellerApplication/getFormsBySeller",
    async({jwt},{rejectWithValue})=>{
        try {
            const res= await api.get(`/api/applicationform/seller/me`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("forms ",res.data);
            return res.data;            
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)



const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const sellerApplicationSlice = createSlice({
  name: "sellerApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(getFormsBySeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFormsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(getFormsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Review application
      .addCase(reviewForm.fulfilled, (state, action) => {
        const index = state.applications.findIndex(
          (app) => app.id === action.payload.id
        );
        if (index !== -1) {
          // Update the application status in state
          state.applications[index] = action.payload;
        }
      })
      .addCase(reviewForm.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default sellerApplicationSlice.reducer;
