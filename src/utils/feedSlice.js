import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "Feed",
  initialState: null,
  reducers: {
    addToFeed: (state, action) => {
      return action.payload;
    },
    clearFeed: () => {
      return null;
    },
  },
});
export default feedSlice.reducer;
export const { addToFeed, clearFeed } = feedSlice.actions;
