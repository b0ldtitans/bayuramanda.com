import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { RiAddFill } from "react-icons/ri";

export default function UploadProfilePicture({ label, formik, field, id }) {
  const handlePhotoChange = (event) => {
    formik.setFieldValue(field, event.currentTarget.files[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      try {
        const file = acceptedFiles[0];
        formik.setFieldValue(field, file);

        const preview = URL.createObjectURL(file);
        setPreview(preview);
      } catch (error) {
        console.error("Error handling dropped file:", error);
      }
    },
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (formik.values[field]) {
      const preview = URL.createObjectURL(formik.values[field]);
      setPreview(preview);
    }

    return () => {
      if (formik.values[field]) {
        URL.revokeObjectURL(URL.createObjectURL(formik.values[field]));
      }
    };
  }, [formik.values[field]]);

  return (
    <>
      <span className="block text-sm font-medium text-gray-700">{label}</span>
      <div
        {...getRootProps()}
        className="flex items-center justify-center bg-white"
      >
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-500 bg-white hover:bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {preview ? (
              <img
                src={preview}
                alt="Profile preview"
                className="mb-2 h-40 w-full rounded-lg object-cover"
              />
            ) : (
              <RiAddFill className="bg-primary h-[40px] w-[40px] text-white" />
            )}
            <p className="mt-5 text-sm text-gray-500">
              <span className="text-primary font-semibold">Add Image</span>
            </p>
          </div>
          <input
            {...getInputProps()}
            id={id}
            name={id}
            register={useFormik}
            type="file"
            className="hidden"
            accept="image/"
            multiple={false}
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      {formik.errors.profilePicture && formik.touched.profilePicture && (
        <div className="text-red-500">{formik.errors.profilePicture}</div>
      )}
    </>
  );
}
