import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  userInfo: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action) {
      state.loggedIn = true;
      state.userInfo = action?.payload;
    },
    logOut(state) {
      state.loggedIn = false;
      state.userInfo = undefined;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
