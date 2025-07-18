// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Slice/StudentSlice";
import StaffReducer from "./Slice/StaffSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    staff :StaffReducer
  },
});

export default store;
