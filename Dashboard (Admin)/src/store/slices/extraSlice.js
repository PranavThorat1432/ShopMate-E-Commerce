import { createSlice } from "@reduxjs/toolkit";

const extraSlice = createSlice({
  name: "extra",
  initialState: {
    openedComponent: "Dashboard",
    isNavbarOpened: false,
    isViewProductModalOpened: false,
    isCreateProductModalOpened: false,
    isUpdateProductModalOpened: false,
  },
  reducers: {
    toggleComponent: (state, action) => {
      state.openedComponent = action.payload
    },
    toggleNavbar: (state, action) => {
      state.isNavbarOpened = !state.isNavbarOpened
    },
    toggleCreateProductModal: (state, action) => {
      state.isCreateProductModalOpened = !state.isCreateProductModalOpened
    },
    toggleViewProductModal: (state, action) => {
      state.isViewProductModalOpened = !state.isViewProductModalOpened
    },
    toggleUpdateProductModal: (state, action) => {
      state.isUpdateProductModalOpened = !state.isUpdateProductModalOpened
    },
  },
});

export const { toggleComponent, toggleNavbar, toggleCreateProductModal, toggleUpdateProductModal, toggleViewProductModal } = extraSlice.actions;

export default extraSlice.reducer;
