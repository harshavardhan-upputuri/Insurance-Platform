import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../config/Api"

export const sendLoginSignupOtp = createAsyncThunk("/auth/sendLoginSigupOtp",
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/send-otp", { email });
            return response.data;

        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });

        }
    }

);

export const login = createAsyncThunk("/auth/login",
    async ({ email, otp, password, loginMethod }, { rejectWithValue }) => {
        try {
            let body = { email };
            if (loginMethod === "password") {
                body.password = password;
            } else if (loginMethod === "otp") {
                body.otp = otp;
            }
            // console.log(body)
            const response = await api.post("/auth/login", body);
            console.log("login response ", response.data);
            localStorage.setItem("jwt", response.data.jwt);
            localStorage.setItem("role", response.data.role);
            return response.data;
        } catch (error) {
            console.log("error------", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

export const signup = createAsyncThunk("/auth/signup",
    async ({ email, fullName, otp, mobile, password }, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/signup", { email, fullName, otp, mobile, password });
            console.log("signup response ", res.data);
            localStorage.setItem("jwt", res.data.jwt);
            return res.data;
        } catch (error) {
            console.log("error-----", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

export const fetchUserProfile = createAsyncThunk("/auth/fetchUserProfile",
    async ({ jwt }, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/users/profile", {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            // console.log("User Profile ", res.data);
            return res.data;
        } catch (error) {
            console.log("error-----", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

export const updateUserProfile = createAsyncThunk("/auth/updateUserProfile",
    async ({ jwt, user }, { rejectWithValue }) => {
        console.log("Before updating user ", user);
        try {
            const res = await api.put("/api/users/profile", user, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },

            })
            console.log("User update profile --- ", res.data);
            return res.data;
        } catch (error) {
            console.log("error-----", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });
        }
    }
);

export const logout = createAsyncThunk("/auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            localStorage.clear();

        } catch (error) {
            console.log("error --- -- -", error);
            return rejectWithValue(error.response?.data || { message: "Network error" });

        }
    }
)

export const oauthLogin = createAsyncThunk("/auth/oauthLogin",
    async ({ provider, token }, { rejectWithValue }) => {
        try {

            const res = await api.post(`/oauth2/authorization/${provider}`, { token });
            localStorage.setItem("jwt", res.data.jwt);
            localStorage.setItem("role", res.data.role);
            return res.data;
        } catch (error) {
            console.log("OAuth2 error -----", error);
            return rejectWithValue(error.response?.data || { message: "OAuth2 network error" });
        }
    }
);

const initialState = {
    jwt: null,
    otpSent: false,
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendLoginSignupOtp.pending, (state) => {
            state.loading = true
        });
        builder.addCase(sendLoginSignupOtp.fulfilled, (state) => {
            state.loading = false;
            state.otpSent = true;
        });
        builder.addCase(sendLoginSignupOtp.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.jwt = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.jwt = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.jwt = null;
            state.isLoggedIn = false;
            state.user = null;
        })
        builder.addCase(oauthLogin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(oauthLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.jwt = action.payload.jwt;
            state.isLoggedIn = true;
            state.user = action.payload.user;
        })
        builder.addCase(oauthLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message;
        })
    }
})

export default authSlice.reducer;