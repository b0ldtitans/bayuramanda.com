import { useSelector, useDispatch } from "react-redux";
import { deleteCategoryModal } from "../components/modal/modalSlice";

const useDeleteCategoryModal = () => {
  const state = useSelector((state) => state.deleteCategoryModal);
  const dispatch = useDispatch();

  const setCategoryId = (categoryId) => {
    dispatch(deleteCategoryModal.actions.setCategoryId(categoryId));
  };

  return {
    isOpen: state.isOpen,
    categoryId: state.categoryId,
    onOpen: () =>
      dispatch(deleteCategoryModal.actions.openDeleteCategoryModal()),
    onClose: () =>
      dispatch(deleteCategoryModal.actions.closeDeleteCategoryModal()),
    setCategoryId,
  };
};

export default useDeleteCategoryModal;
