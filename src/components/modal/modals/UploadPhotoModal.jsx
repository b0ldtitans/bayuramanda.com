import React, { useState } from "react";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { api } from "../../../api";
import { toast } from "sonner";
import useUploadPhotoModal from "../../../hooks/useUploadPhotoModal";
import { MdDeleteForever } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";

const UploadPhotoModal = () => {
  const uploadPhotoModal = useUploadPhotoModal();
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const [previewSrcs, setPreviewSrcs] = useState([]);
  const { categoryId, categoryName } = useSelector(
    (state) => state.uploadPhotoModal,
  );

  const onDrop = async (acceptedFiles) => {
    formik.setFieldValue("images", acceptedFiles);
    displayPreviews(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const displayPreviews = (files) => {
    const readers = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewSrcs((prevSrcs) => [...prevSrcs, reader.result]);
      };
      return reader;
    });

    return readers;
  };

  const handleDelete = (index) => {
    setPreviewSrcs((prevSrcs) => {
      const updatedSrcs = [...prevSrcs];
      updatedSrcs.splice(index, 1);

      const updatedImages = formik.values.images.filter((_, i) => i !== index);
      formik.setFieldValue("images", updatedImages);

      return updatedSrcs;
    });
  };

  const formik = useFormik({
    initialValues: {
      images: [],
    },
    validationSchema: Yup.object({
      images: Yup.array().min(1, "At least one image is required"),
    }),
    onSubmit: async () => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formik.values.images.forEach((image, index) => {
          formData.append(`images`, image);
        });
        const response = await api.post(`/image/${categoryId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          toast.success("Photo uploaded successfully");
          uploadPhotoModal.onClose();
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  console.log(formik.values.images);
  const modalContent = (
    <section className="flex h-full w-full">
      <div className="max-w-[2520px] px-8">
        <div className="grid grid-cols-4 gap-8 pt-2">
          {previewSrcs.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt="preview"
                className="h-[172px] w-[172px] cursor-pointer rounded-lg object-cover"
              />
              <button
                className="absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white"
                onClick={() => handleDelete(index)}
              >
                <MdDeleteForever />
              </button>
            </div>
          ))}
          <div
            {...getRootProps()}
            className={`relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 ${
              isDragActive ? "border-indigo-600" : ""
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="text-center">
                <img
                  className="mx-auto h-12 w-12 cursor-pointer"
                  src="https://www.svgrepo.com/show/357902/image-upload.svg"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={uploadPhotoModal.isOpen}
      onClose={uploadPhotoModal.onClose}
      actionLabel="Upload"
      onSubmit={formik.handleSubmit}
      title={`Upload to Album: ${categoryName}`}
      body={modalContent}
    />
  );
};

export default UploadPhotoModal;
