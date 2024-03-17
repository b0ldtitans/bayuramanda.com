import { configureStore } from "@reduxjs/toolkit";
import {
  editCategoryModal,
  deleteCategoryModal,
  newAlbumModal,
  editPhotoModal,
} from "./components/modal/modalSlice";

const rootReducer = {
  editCategoryModal: editCategoryModal.reducer,
  deleteCategoryModal: deleteCategoryModal.reducer,
  newAlbumModal: newAlbumModal.reducer,
  editPhotoModal: editPhotoModal.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
