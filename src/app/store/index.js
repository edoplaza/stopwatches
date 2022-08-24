import { configureStore } from "@reduxjs/toolkit";
import watchSlice from "../features/watchSlice";

export default configureStore({
  reducer: {
    watches: watchSlice,
  },
});
