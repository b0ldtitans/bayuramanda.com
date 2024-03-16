import React, { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import useEditCategoryModal from "../hooks/useEditCategoryModal";
import useDeleteCategoryModal from "../hooks/useDeleteCategoryModal";

export default function ContextMenu({ categoryId }) {
  const [showMenu, setShowMenu] = useState(false);
  const editCategoryModal = useEditCategoryModal();
  const deleteCategoryModal = useDeleteCategoryModal();
  const handleClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="relative z-50 cursor-pointer transition hover:opacity-80"
      >
        <div className="flex items-center justify-center rounded-full bg-black/10 p-3">
          <HiOutlineDotsHorizontal
            size={28}
            className="
            absolute
            -right-[2px]
            -top-[2px]
            text-white
            hover:text-black
          "
          />
        </div>
      </div>
      {showMenu && (
        <div
          className="absolute right-0 z-50 rounded-md bg-white shadow-lg"
          onClick={() => setShowMenu(false)}
        >
          <div className="p-2">
            <div
              onClick={(e) => {
                e.stopPropagation();
                editCategoryModal.setCategoryId(categoryId);
                editCategoryModal.onOpen();
              }}
              className="cursor-pointer rounded-md p-2 hover:bg-black/10"
            >
              Edit
            </div>
            <div
              className="cursor-pointer rounded-md p-2 hover:bg-black/10"
              onClick={(e) => {
                e.stopPropagation();
                deleteCategoryModal.setCategoryId(categoryId);
                deleteCategoryModal.onOpen();
              }}
            >
              Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
