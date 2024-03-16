import { configureStore } from "@reduxjs/toolkit";
import {
  editCategoryModal,
  deleteCategoryModal,
  newAlbumModal,
} from "./components/modal/modalSlice";

const rootReducer = {
  editCategoryModal: editCategoryModal.reducer,
  deleteCategoryModal: deleteCategoryModal.reducer,
  newAlbumModal: newAlbumModal.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
