import { useSelector, useDispatch } from "react-redux";
import { newAlbumModal } from "../components/modal/modalSlice";

const useNewAlbumModal = () => {
  const state = useSelector((state) => state.newAlbumModal);
  const dispatch = useDispatch();

  return {
    isOpen: state.isOpen,
    onOpen: () => dispatch(newAlbumModal.actions.openNewAlbumModal()),
    onClose: () => dispatch(newAlbumModal.actions.closeNewAlbumModal()),
  };
};

export default useNewAlbumModal;
