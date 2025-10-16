import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api"

export const fetchAllUsers = createAsyncThunk("/admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await api.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
      console.log("users ", res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
)

export const fetchAllSellers = createAsyncThunk("/admin/fetchAllSellers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await api.get("/api/admin/sellers",{
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
      console.log("sellers ", res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch sellers");
    }
  }
)

export const fetchAllReports = createAsyncThunk(
  "/admin/fetchAllReports",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await api.get("/api/admin/reports/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("reports ", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch reports");
    }
  }
);


export const updateSellerStatus = createAsyncThunk("/admin/updateSellerStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await api.patch(`/api/admin/seller/${id}/status/${status}`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
      console.log("seller ", res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch seller");
    }
  }
)


export const fetchAllTransactions = createAsyncThunk("/admin/fetchAllTransactions",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await api.get("/api/transactions",{
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
      console.log("Transactions ", res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch Transactions");
    }
  }
)

export const fetchAllOrders = createAsyncThunk("/admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("jwt");
    try {
      const res = await api.get("/api/admin/orders",{
        headers: {
          Authorization: `Bearer ${token}`,
        }
    });
      console.log("Orders ", res);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch Transactions");
    }
  }
)

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    sellers: [],
    reports: null,
    transactions: [],
    orders:[],
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // USERS
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SELLERS
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REPORTS
      .addCase(fetchAllReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchAllReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE SELLER STATUS
      .addCase(updateSellerStatus.fulfilled, (state, action) => {
        state.successMessage = "Seller status updated successfully!";
        state.sellers = state.sellers.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
      })
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.error = action.payload;
      })


      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })

      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});


export default adminSlice.reducer;