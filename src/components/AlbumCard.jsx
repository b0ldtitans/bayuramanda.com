import React, { useState, useEffect } from "react";
import { api, imgBaseURL } from "../api";
import { useNavigate } from "react-router-dom";
import LoadingDots from "./LoadingDots";
import placeholderImage from "../assets/placeholder.png";
import ContextMenu from "./ContextMenu";

export default function AlbumCard({ categoryName, imagesCount, categoryId }) {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/image/category/${categoryId}?limit=4`);
        if (response.status === 200) {
          const data = response.data.data;
          setPhotos(data.Images);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [categoryId]);

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <div
      onClick={() => navigate(`/admin/dashboard/photos/album/${categoryId}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-0 rounded-xl p-2 transition-all duration-200 hover:bg-black/5">
        <div
          className={`relative grid aspect-square w-full gap-1 overflow-hidden rounded-xl ${photos.length >= 3 ? "grid-cols-2 grid-rows-2 " : ""}`}
        >
          {!photos || photos.length === 0 ? (
            <div>
              <img
                src={placeholderImage}
                alt="placeholder"
                className="h-full w-full object-cover p-12"
              />
              <div className="absolute right-3 top-3">
                <ContextMenu categoryId={categoryId} albu={true} />
              </div>
            </div>
          ) : (
            photos.map((photo, index) => (
              <div>
                <img
                  key={index}
                  src={`${imgBaseURL}/${photo.thumbnail}`}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-3 top-3">
                  <ContextMenu categoryId={categoryId} />
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <div className="ml-2 mt-4 text-lg font-semibold">{categoryName}</div>
          <div className="ml-2 text-sm font-light">
            {imagesCount === 0 || undefined || null
              ? "No Images"
              : `${imagesCount} Images`}
          </div>
        </div>
      </div>
    </div>
  );
}
