import React, { useState } from "react";
import { api } from "../api";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function PhotoUploader({ categoryId }) {
  const [previewSrcs, setPreviewSrcs] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-indigo-600");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
    const files = Array.from(e.dataTransfer.files);
    displayPreviews(files);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    displayPreviews(files);
  };

  const handleRemovePhoto = (index) => {
    setPreviewSrcs((prevSrcs) => prevSrcs.filter((_, i) => i !== index));
  };

  const displayPreviews = (files) => {
    const readers = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewSrcs((prevSrcs) => [...prevSrcs, reader.result]);
      };
      return reader;
    });
  };

  const uploadPhotos = async () => {
    try {
      const response = await api.post(
        `/photos/${categoryId}`,
        {
          photos: previewSrcs,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}}`,
          },
        },
      );
      if (response.status === 201) {
        toast.success("Photos uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload photos");
    }
  };

  return (
    <section className="flex flex-row pt-6">
      <div
        className="relative h-[100px] w-[100px] cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        id="dropzone"
      >
        <input
          type="file"
          className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
          onChange={handleFileChange}
          multiple
        />
        <div className="text-center">
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt=""
          />

          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <span>Drag and drop</span>
              <span className="text-indigo-600"> or browse</span>
              <span> to upload</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                multiple
              />
            </label>
          </h3>
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      {previewSrcs.length >= 1 && (
        <div className="max-w-[2520px] px-8">
          <div className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {previewSrcs.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt="preview"
                  className=" w-[200px] max-w-[100px] cursor-pointer rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
