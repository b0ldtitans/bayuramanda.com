import { useSelector, useDispatch } from "react-redux";
import { editPhotoModal } from "../components/modal/modalSlice";

const useEditPhotoModal = () => {
  const state = useSelector((state) => state.editPhotoModal);
  const dispatch = useDispatch();

  const setPhotoId = (photoId) => {
    dispatch(editPhotoModal.actions.setPhotoId(photoId));
  };

  return {
    isOpen: state.isOpen,
    photoId: state.photoId,
    onOpen: () => dispatch(editPhotoModal.actions.openEditPhotoModal()),
    onClose: () => dispatch(editPhotoModal.actions.closeEditPhotoModal()),
    setPhotoId,
  };
};

export default useEditPhotoModal;
