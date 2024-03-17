import React from "react";
import { MdEdit } from "react-icons/md";
import useEditPhotoModal from "../hooks/useEditPhotoModal";

export default function PhotoContextMenu({ photoId }) {
  const editPhotoModal = useEditPhotoModal();

  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          editPhotoModal.setPhotoId(photoId);
          editPhotoModal.onOpen();
        }}
        className="relative cursor-pointer transition hover:opacity-80"
      >
        <div className="flex items-center justify-center rounded-full bg-black/10 p-1">
          <MdEdit size={20} className="text-white hover:text-black" />
        </div>
      </div>
    </div>
  );
}
