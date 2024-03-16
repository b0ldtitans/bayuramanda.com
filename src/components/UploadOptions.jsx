import React from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function UploadOptions({
  removeHandler,
  index,
  uploadHandler,
  children,
}) {
  const handleRemove = (e) => {
    e.stopPropagation();
    removeHandler(index);
  };
  const handleUpload = (e) => {
    e.stopPropagation();
    uploadHandler(index);
  };

  return (
    <>
      <div className="relative mt-4 hidden cursor-pointer justify-end rounded-md hover:block hover:opacity-80">
        <div
          onClick={handleUpload}
          className="mr-2 rounded-md bg-black p-2 text-white"
        >
          <IoCloudUploadSharp />
        </div>
        <div
          onClick={handleRemove}
          className="rounded-md bg-black p-2 text-white"
        >
          <RiDeleteBin6Fill />
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
