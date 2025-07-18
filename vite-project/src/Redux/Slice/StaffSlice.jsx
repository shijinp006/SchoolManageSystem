// src/redux/slices/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // assuming axios is globally configured


// Auth headers helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    params: {
      role: role
    }
  };
};

// Async Thunks
export const fetchStaff = createAsyncThunk("staff/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/Admin/view-staff", getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Error fetching students");
  }
});

export const createStaff = createAsyncThunk("staff/create", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/Admin/create-staff", data, getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Error creating student");
  }
});

export const updateStaff = createAsyncThunk("staff/update", async ({ id, data }, { rejectWithValue }) => {
 
  
  try {
    const res = await axios.put(`/Admin/edit-staff/${id}`, data, getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Error updating student");
  }
});

export const deleteStaff = createAsyncThunk("staff/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/Admin/delete-staff/${id}`, getAuthHeaders());
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Error deleting student");
  }
});

// Slice
const staffSlice = createSlice({
  name: "staff",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createStaff.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.list.findIndex(s => s._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.list = state.list.filter(s => s._id !== action.payload);
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default staffSlice.reducer;
