import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
};

const navDrawerSlice = createSlice({
  name: "navDrawer",
  initialState,
  reducers: {
    setToggle(state) {
      state.toggle = !state.toggle;
    },
  },
});

export const { setToggle } = navDrawerSlice.actions;
export default navDrawerSlice.reducer;
