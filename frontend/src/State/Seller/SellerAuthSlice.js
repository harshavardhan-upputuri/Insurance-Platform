import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const loginSeller = createAsyncThunk("sellerAuth/loginSeller",
    async ({ email, otp, password, loginMethod }, { rejectWithValue }) => {
        try {
            let body = { email };
            if (loginMethod === "password") {
                body.password = password;
            } else if (loginMethod === "otp") {
                body.otp = otp;
            }

            const res = await api.post("/seller/login", body);
            console.log("seller login response ", res.data);
            localStorage.setItem("jwt", res.data.jwt);
            localStorage.setItem("role",res.data.role);

            return res.data;

        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);


export const signupSeller = createAsyncThunk("sellerAuth/signupSeller",
    async ({ SellerData }, { rejectWithValue }) => {
        try {
            const res = await api.post("/seller/signup", SellerData);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

export const verifySeller = createAsyncThunk("sellerAuth/verifySeller",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            let body = { email };
            body.otp = otp;
            const res = await api.patch("/seller/verify", body);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

export const fetchSellerProfile = createAsyncThunk("sellerAuth/fetchSellerProfile",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/seller/profile", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            // console.log("Seller profile ", res.data);
            return res.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
)

export const updateSellerProfile = createAsyncThunk("sellerAuth/updateSellerProfile",
    async ({ jwt, SellerData }, { rejectWithValue }) => {
        try {
            const res = await api.patch("/seller", SellerData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log("Seller update profile ", res.data);
            return res.data;

        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

const initialState = {
    jwt: null,
    otpSent: false,
    isLoggedIn: false,
    seller: null,
    loading: false,
    isVerified: false
}


const sellerAuthSlice = createSlice({
    name: "sellerAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginSeller.fulfilled, (state, action) => {
            state.jwt = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(signupSeller.fulfilled, (state, action) => {
            state.loading = false;
            state.seller = action.payload;
        });
        builder.addCase(verifySeller.fulfilled, (state, action) => {
            state.loading = false;
            state.isVerified = true;
            state.seller = action.payload;
        });
        builder.addCase(fetchSellerProfile.fulfilled, (state, action) => {
            state.loading = false; 
            state.seller = action.payload;
        });
        builder.addCase(updateSellerProfile.fulfilled, (state, action) => {
            state.loading = false; 
            state.seller = action.payload;
        });
    }
});

export default sellerAuthSlice.reducer;