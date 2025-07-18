// src/redux/slices/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // assuming axios is globally configured
import { toast } from 'react-toastify';


// Auth headers helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const Permission = localStorage.getItem("Permission")
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    params: {
      role: role,
      Permission:Permission
    }
  };
};

// Async Thunks
export const fetchStudents = createAsyncThunk("students/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("/Admin/view-student", getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue( err.response?.data?.message||err.response?.data || "Error fetching students");
  }
});

export const createStudent = createAsyncThunk("students/create", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("/Admin/create-student", data, getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue( err.response?.data?.message||err.response?.data || "Error creating student");
  }
});

export const updateStudent = createAsyncThunk("students/update", async ({ id, data }, { rejectWithValue }) => {
 
  
  try {
    const res = await axios.put(`/Admin/edit-student/${id}`, data, getAuthHeaders());
    return res.data;
  } catch (err) {
    return rejectWithValue( err.response?.data?.message||err.response?.data || "Error updating student");
  }
});

export const deleteStudent = createAsyncThunk("students/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/Admin/delete-student/${id}`, getAuthHeaders());
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message||err.response?.data || "Error deleting student");
  }
});

// Slice
const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(action.payload);
      })

      // CREATE
      .addCase(createStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
        toast.success("Student created successfully");
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })

      // UPDATE
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
        toast.success("Student updated successfully");
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })

      // DELETE
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s._id !== action.payload);
        toast.success("Student deleted successfully");
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  }
 
});

export default studentSlice.reducer;
