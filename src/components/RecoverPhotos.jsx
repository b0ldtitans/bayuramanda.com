import React, { useEffect, useState, lazy, useCallback } from "react";
import { api, imgBaseURL } from "../api";
import { LoadingDots } from "../components";
import Cookies from "js-cookie";
import { toast } from "sonner";
const ImageViewer = lazy(() => import("react-simple-image-viewer"));

export default function RecoverPhotos() {
  const [deletedPhotos, setDeletedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const fetchDeletedPhotos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/image/deleted", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        setDeletedPhotos(response.data.images);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeletedPhotos();
  }, []);

  if (loading) {
    return <LoadingDots />;
  }

  return (
    <div className="p-4">
      <div className="gallery">
        {deletedPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openImageViewer(index)}
            className="relative pics"
          >
            <img
              src={`${imgBaseURL}/${photo.thumbnail}`}
              alt={photo.alt}
              loading="lazy"
              className="object-cover w-full h-full"
            />
            <div className="absolute z-50 top-3 right-3">
              <RestoreButton
                photoId={photo.id}
                fetch={() => fetchDeletedPhotos}
                setLoading={setLoading}
              />
            </div>
          </div>
        ))}
        {isViewerOpen && (
          <ImageViewer
            src={deletedPhotos.map((image) => `${imgBaseURL}/${image.img}`)}
            currentIndex={currentImage}
            disableScroll={true}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
            backgroundStyle={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
          />
        )}
      </div>
    </div>
  );
}

export function RestoreButton({ photoId, fetch, setLoading }) {
  const restorePhoto = async () => {
    try {
      setLoading(true);
      const response = await api.patch(`/image/${photoId}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Photo successfully restored");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to restore photo");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    restorePhoto();
    fetch();
  };

  return (
    <div
      onClick={handleClick}
      className="relative rounded-md cursor-pointer hover:opacity-80"
    >
      <div className="bg-black text-white rounded-md px-2 absolute -top-[2px] -right-[2px]">
        Restore
      </div>
    </div>
  );
}
