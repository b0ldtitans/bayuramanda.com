import { useSelector, useDispatch } from "react-redux";
import { uploadPhotoModal } from "../components/modal/modalSlice";

const useUploadPhotoModal = () => {
  const state = useSelector((state) => state.uploadPhotoModal);
  const dispatch = useDispatch();
  const setCategoryId = (categoryId) => {
    dispatch(uploadPhotoModal.actions.setCategoryId(categoryId));
  };
  const setCategoryName = (categoryName) => {
    dispatch(uploadPhotoModal.actions.setCategoryName(categoryName));
  };

  return {
    isOpen: state.isOpen,
    categoryId: state.categoryId,
    categoryName: state.categoryName,
    onOpen: () => dispatch(uploadPhotoModal.actions.openUploadPhotoModal()),
    onClose: () => dispatch(uploadPhotoModal.actions.closeUploadPhotoModal()),
    setCategoryId,
    setCategoryName,
  };
};

export default useUploadPhotoModal;
