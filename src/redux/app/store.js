import { configureStore } from "@reduxjs/toolkit";
import navDrawerSlice from "../features/navDrawer/navDrawerSlice.js";
import formModalSlice from "../features/FormModal/formModalSlice.js";
import userSlice from "../features/user/userSlice.js";
import sidebarSlice from "../features/sidebar/sidebarSlice.js";

const store = configureStore({
  reducer: {
    navDrawer: navDrawerSlice,
    formModal: formModalSlice,
    user: userSlice,
    sidebar: sidebarSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: false,
});

export default store;
