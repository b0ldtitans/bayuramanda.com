import { useSelector, useDispatch } from "react-redux";
import { editCategoryModal } from "../components/modal/modalSlice";

const useEditCategoryModal = () => {
  const state = useSelector((state) => state.editCategoryModal);
  const dispatch = useDispatch();

  const setCategoryId = (categoryId) => {
    dispatch(editCategoryModal.actions.setCategoryId(categoryId));
  };

  return {
    isOpen: state.isOpen,
    categoryId: state.categoryId,
    onOpen: () => dispatch(editCategoryModal.actions.openEditCategoryModal()),
    onClose: () => dispatch(editCategoryModal.actions.closeEditCategoryModal()),
    setCategoryId,
  };
};

export default useEditCategoryModal;
