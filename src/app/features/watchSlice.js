import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:3000";

export const getWatches = createAsyncThunk(
  "watches/status",
  async () => await axios.get(`${baseUrl}/api/stopwatches`)
);

export const getWatch = createAsyncThunk(
  "watch/status",
  async (id) => await axios.get(`${baseUrl}/api/stopwatches/${id}`)
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
      state.watches = [];
    },
    [getWatch.fulfilled]: (state, action) => {
      //state.watches = action.payload.data;
    },
  },
});

export default watchSlice.reducer;
