import { createSlice } from "@reduxjs/toolkit";

const editCategoryModal = createSlice({
  name: "editCategoryModal",
  initialState: { isOpen: false },
  reducers: {
    openEditCategoryModal(state) {
      state.isOpen = true;
    },
    closeEditCategoryModal(state) {
      state.isOpen = false;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

const deleteCategoryModal = createSlice({
  name: "deleteCategoryModal",
  initialState: { isOpen: false },
  reducers: {
    openDeleteCategoryModal(state) {
      state.isOpen = true;
    },
    closeDeleteCategoryModal(state) {
      state.isOpen = false;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
  },
});

const newAlbumModal = createSlice({
  name: "newAlbumModal",
  initialState: { isOpen: false },
  reducers: {
    openNewAlbumModal(state) {
      state.isOpen = true;
    },
    closeNewAlbumModal(state) {
      state.isOpen = false;
    },
  },
});

const editPhotoModal = createSlice({
  name: "editPhotoModal",
  initialState: { isOpen: false },
  reducers: {
    openEditPhotoModal(state) {
      state.isOpen = true;
    },
    closeEditPhotoModal(state) {
      state.isOpen = false;
    },
    setPhotoId(state, action) {
      state.photoId = action.payload;
    },
  },
});

export {
  editCategoryModal,
  deleteCategoryModal,
  newAlbumModal,
  editPhotoModal,
};
