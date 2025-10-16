import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const createApplicationForm = createAsyncThunk("/applicationForm/createApplicationForm",
    async ({ jwt, form }, { rejectWithValue }) => {
        try {
            const res = await api.post("/api/applicationform/create", form, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("Application Form -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const updateApplicationForm = createAsyncThunk("/applicationForm/updateApplicationForm",
    async ({ jwt, form }, { rejectWithValue }) => {
        try {
            const res = await api.patch("/api/applicationform/update", form, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("Application Form -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const deleteApplicationForm = createAsyncThunk("/applicationForm/deleteApplicationForm",
    async ({ jwt, formId }, { rejectWithValue }) => {
        try {
            const res = await api.delete(`/api/applicationform/delete/${formId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log("Deleted Application Form -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const getMyApplications = createAsyncThunk("/applicationForm/getMyApplications",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/applicationform/user/me", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log(" Application Forms -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const getApplicationFormById = createAsyncThunk(
    "/applicationForm/getApplicationFormById",
    async ({ jwt, formId }, { rejectWithValue }) => {
        try {
            const res = await api.get(`/api/applicationform/user/${formId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Single Application Form -> ", res.data);
            return res.data;
        } catch (error) {
            console.log("error -> ", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    applicationforms: [],
    selectedForm: null,
    loading: false,
    error: null
}

const applicationFormSlice = createSlice({
    name: "applicationForm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyApplications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applicationforms = action.payload;
            })
            .addCase(getMyApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createApplicationForm.fulfilled, (state, action) => {
                state.applicationforms.push(action.payload);
            })
            .addCase(updateApplicationForm.fulfilled, (state, action) => {
                const index = state.applicationforms.findIndex(r => r.id === action.payload.id);
                if (index !== -1) state.applicationforms[index] = action.payload;
            })
            .addCase(deleteApplicationForm.fulfilled, (state, action) => {
                state.applicationforms = state.applicationforms.filter(r => r.id !== action.meta.arg.formId);
            })
            .addCase(getApplicationFormById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getApplicationFormById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedForm = action.payload;
            })
            .addCase(getApplicationFormById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default applicationFormSlice.reducer