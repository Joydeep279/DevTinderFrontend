import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "ChatDetails",
  initialState: {
    fromUserDetails: null,
    data: [],
  },
  reducers: {
    addFromUserDetails: (state, action) => {
      state.fromUserDetails = action.payload;
    },
    addChatData: (state, action) => {
      state.data.unshift(action.payload);
    },
    clearChatData: (state, action) => {
      state.data = [];
    },
  },
});

export const { addFromUserDetails, addChatData, clearChatData } =
  chatSlice.actions;
export default chatSlice.reducer;
