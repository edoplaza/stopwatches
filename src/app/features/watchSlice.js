import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3000";

export const getWatches = createAsyncThunk(
  "watches/status",
  async (page = 1) => await axios.get(`${baseUrl}/api/stopwatches?page=${page}`)
);

export const getWatch = createAsyncThunk(
  "watch/status",
  async (id) => await axios.get(`${baseUrl}/api/stopwatches/${id}`)
);

export const createWatch = createAsyncThunk(
  "create/status",
  async (started) =>
    await axios.post(`${baseUrl}/api/stopwatches`, { started: started })
);

export const deleteWatch = createAsyncThunk(
  "delete/status",
  async (id) => await axios.delete(`${baseUrl}/api/stopwatches/${id}`)
);

export const addToggle = createAsyncThunk(
  "toggle/status",
  async ({ id, time }) =>
    await axios.post(`${baseUrl}/api/stopwatches/${id}/toggle`, { time: time })
);

export const addLap = createAsyncThunk(
  "lap/status",
  async ({ id, time }) =>
    await axios.post(`${baseUrl}/api/stopwatches/${id}/lap`, { time: time })
);

export const resetWatch = createAsyncThunk(
  "reset/status",
  async ({ id, started }) =>
    await axios.post(`${baseUrl}/api/stopwatches/${id}`, { started: started })
);

export const initialState = {
  watches: [],
  loading: false,
  error: false,
};

const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {},
  extraReducers: {
    [getWatches.fulfilled]: (state, action) => {
      state.watches = action.payload.data;
    },
    [getWatches.rejected]: (state) => {
      console.log("Get Watches: An error has occurred");
    },
    [getWatch.fulfilled]: (state, action) => {
      state.watches = action.payload.data;
    },
    [getWatch.resjected]: (state, action) => {
      console.log("Get Watch: An error has occurred");
    },
    [createWatch.fulfilled]: (state, action) => {
      state.watches = action.payload.data;
    },
    [createWatch.rejected]: (state) => {
      console.log("Create Watch: An error has occurred");
    },
    [deleteWatch.fulfilled]: (state, action) => {
      state.watches = action.payload.data;
    },
    [deleteWatch.rejected]: (state) => {
      console.log("Delete Watch: An error has occurred");
    },
    [addToggle.fulfilled]: (state, action) => {
      state.watches = action.payload.data;
    },
    [addToggle.rejected]: (state) => {
      console.log("Add Toggle: An error has occurred");
    },
    [addLap.fulfilled]: (state, action) => {
      state.watches = action.payload.data;
    },
    [addLap.rejected]: (state) => {
      console.log("Add Lap : An error has occurred");
    },
    [resetWatch.fulfilled]: (state, action) => {
      state.watches = action.payload.data;
    },
    [resetWatch.rejected]: (state) => {
      console.log("Reset: An error has occurred");
    },
  },
});

export default watchSlice.reducer;
