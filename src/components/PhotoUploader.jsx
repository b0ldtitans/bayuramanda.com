import React, { useState } from "react";
import UploadOptions from "./UploadOptions";
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
    <section className="flex flex-col items-center justify-center pt-6">
      <div
        className="relative w-[400px] cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6"
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
      <div className="gallery mt-12">
        {previewSrcs.map((src, index) => (
          <UploadOptions
            removeHandler={handleRemovePhoto}
            index={index}
            uploadHandler={uploadPhotos}
          >
            <div key={index} className="pics">
              <img src={src} alt="preview" className="m-2 mx-auto max-h-64" />
            </div>
          </UploadOptions>
        ))}
      </div>
    </section>
  );
}
