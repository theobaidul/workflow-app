import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  showBtn: window.innerWidth < 992,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleCollapsed(state, action) {
      state.collapsed = action?.payload
        ? action?.payload?.show
        : !state.collapsed;
    },
    toggleShowBtn(state, action) {
      state.showBtn = action?.payload?.show;
    },
  },
});

export const { toggleCollapsed, toggleShowBtn } = sidebarSlice.actions;
export default sidebarSlice.reducer;
