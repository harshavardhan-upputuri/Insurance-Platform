import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerReport = createAsyncThunk("/sellerReport/fetchSellerReport",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/seller/report", {
                headers: { Authorization: `Bearer ${jwt}` }
            });
            console.log("Report  ", res.data);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

const initialState = {
    report: null,
    loading: false,
    error: null
}

export const SellerReportSlice = createSlice({
    name: "sellerReports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSellerReport.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchSellerReport.fulfilled, (state, action) => {
            state.loading = false;
            state.report=action.payload;
        });
        builder.addCase(fetchSellerReport.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || action.error.message;

        });
    }
});

export default SellerReportSlice.reducer;