import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {},
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
    removeUser: (state, action) => {
      state.data = {};
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
