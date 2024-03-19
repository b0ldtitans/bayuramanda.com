import { configureStore } from "@reduxjs/toolkit";
import {
  editCategoryModal,
  deleteCategoryModal,
  newAlbumModal,
  editPhotoModal,
  uploadPhotoModal,
} from "./components/modal/modalSlice";

const rootReducer = {
  editCategoryModal: editCategoryModal.reducer,
  deleteCategoryModal: deleteCategoryModal.reducer,
  newAlbumModal: newAlbumModal.reducer,
  editPhotoModal: editPhotoModal.reducer,
  uploadPhotoModal: uploadPhotoModal.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
