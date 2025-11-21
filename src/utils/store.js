import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    feed: feedSlice,
  },
});
