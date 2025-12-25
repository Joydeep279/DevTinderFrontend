import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "Connections",
  initialState: null,
  reducers: {
    addToConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return null;
    },
    getUser:(state,action)=>{
      
    }
  },
});
export const { addToConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
