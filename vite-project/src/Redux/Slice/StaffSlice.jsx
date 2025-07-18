// src/redux/slices/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // assuming axios is globally configured
import { toast } from 'react-toastify';


 

// Auth headers helper
 const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
 
  console.log(token,"token123");
  
 
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

export const createStaff = createAsyncThunk(
  "staff/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/Admin/create-staff", data, getAuthHeaders());
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.response?.data || "Error creating staff"
      );
    }
  }
);


export const updateStaff = createAsyncThunk("staff/update", async ({ id, data }, { rejectWithValue }) => {

  try {
    const res = await axios.put(`/Admin/edit-staff/${id}`, data, getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue( err.response?.data?.message||err.response?.data || "Error updating student");
  }
});

export const deleteStaff = createAsyncThunk("staff/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/Admin/delete-staff/${id}`, getAuthHeaders());
    return id;
  } catch (err) {
    return rejectWithValue( err.response?.data?.message || err.response?.data || "Error deleting student");
  }
});
export const changePermission = createAsyncThunk("staff/changepermission", async (id, { rejectWithValue }) => {

  try {
    const res = await axios.put(`/Admin/change-permission/${id}`,{}, getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue( err.response?.data?.message||err.response?.data || "Error updating student");
  }
});
export const cancelPermission = createAsyncThunk("staff/cancelpermission", async (id, { rejectWithValue }) => {

  try {
    const res = await axios.put(`/Admin/cancel-permission/${id}`,{}, getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue( err.response?.data?.message||err.response?.data || "Error updating student");
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
      // FETCH
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      
      })
      .addCase(fetchStaff.rejected, (state) => {
        state.loading = false;
        // toast.error(action.payload);
      })

      // CREATE
      .addCase(createStaff.fulfilled, (state, action) => {
        state.list.push(action.payload);
        toast.success("Staff created successfully");
      
      })
      .addCase(createStaff.rejected, (state, action) => {
        toast.error(action.payload);
      })

      // UPDATE
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        toast.success("Staff updated successfully");
      })
      .addCase(updateStaff.rejected, (state, action) => {
        toast.error(action.payload);
      })

      // DELETE
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.list = state.list.filter(item => item._id !== action.payload);
        toast.success("Staff deleted successfully");
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        toast.error(action.payload);
      })
      // Change Permission
      .addCase(changePermission.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        toast.success("Permission updated successfully");
      })
      .addCase(changePermission.rejected, (state, action) => {
        toast.error(action.payload);
      })
      // Cancel Permission
      .addCase(cancelPermission.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        toast.success("Permission cancelled successfully");
      })
      .addCase(cancelPermission.rejected, (state, action) => {
        toast.error(action.payload);
      })

      
  },
});

export default staffSlice.reducer;
