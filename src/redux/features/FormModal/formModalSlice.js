import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  formName: "",
  formTitle: "",
  editable: false,
  formInfo: {},
};

const formModalSlice = createSlice({
  name: "formModal",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.isOpen = action.payload?.editable || !state.isOpen; // reverse the previous state
      if (state.isOpen) {
        state.formName = action.payload?.formName;
        state.formTitle = action.payload?.formTitle;
        state.editable = Boolean(action.payload?.editable);
        state.formInfo = action.payload?.formInfo || {};
      } else {
        state.editable = false;
        state.formInfo = {};
      }
    },
  },
});

export default formModalSlice.reducer;
export const { toggleModal } = formModalSlice.actions;
