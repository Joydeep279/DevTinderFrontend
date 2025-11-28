import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addToRequest: (state, action) => {
      return action.payload;
    },
    clearRequest: (state, action) => {
      return null;
    },
    removeRequest: (state, action) => {
      const id = action.payload;
      return state.data.filter((req) => req._id !== id);
    },
  },
});
export const { addToRequest, removeRequest, clearRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
