import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import { api, imgBaseURL } from "../../../api";
import { toast } from "sonner";
import useEditPhotoModal from "../../../hooks/useEditPhotoModal";
import Cookies from "js-cookie";

const EditCategoryModal = () => {
  const editPhotoModal = useEditPhotoModal();
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const { photoId } = useSelector((state) => state.editPhotoModal);
  const [photo, setPhoto] = useState({});
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (editPhotoModal.isOpen) {
      const fetchPhoto = async () => {
        setIsLoading(true);
        try {
          const response = await api.get(`/image/${photoId}`);
          if (response.status === 200) {
            setPhoto(response.data.image);
            setCaption(response.data.image.alt);
          }
        } catch (error) {
          toast.error("error");
        } finally {
          setIsLoading(false);
        }
      };
      fetchPhoto();
    }
  }, [photoId, editPhotoModal.isOpen]);

  const submitEdit = async () => {
    setIsLoading(true);
    try {
      const response = await api.put(
        `/image/${photoId}`,
        {
          alt: caption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Photo updated successfully");
        editPhotoModal.onClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitDelete = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/image/${photoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Photo deleted successfully");
        editPhotoModal.onClose();
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.innerText);
  };

  const modalContent = (
    <div className="flex flex-col justify-evenly gap-y-5">
      <div className="flex items-center justify-center object-contain">
        <img
          src={`${imgBaseURL}/${photo?.img}`}
          alt={photo.alt}
          className="h-1/2 w-1/2"
        />
      </div>
      <div>
        <label htmlFor="caption" className="text-sm font-semibold">
          Caption
        </label>
        <div
          id="caption"
          contentEditable={true}
          onInput={handleCaptionChange}
          onBlur={handleCaptionChange}
          className="focus:border-primary w-full rounded-md border-2 border-gray-200 p-2 focus:outline-none"
        >
          {caption}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editPhotoModal.isOpen}
      onClose={editPhotoModal.onClose}
      actionLabel={"Save"}
      onSubmit={submitEdit}
      secondaryActionLabel={"Delete"}
      secondaryAction={submitDelete}
      title={`Edit Photo`}
      body={modalContent}
    />
  );
};

export default EditCategoryModal;
