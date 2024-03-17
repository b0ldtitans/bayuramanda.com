import React, { useEffect, useState, lazy, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Sidebar, LoadingDots } from "../../components";
import { api, imgBaseURL } from "../../api";
import { Pagination } from "@mantine/core";
const ImageViewer = lazy(() => import("react-simple-image-viewer"));

export default function AlbumPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages
  const { categoryId } = useParams();

  // pagination
  const itemsPerPage = 18;
  const [pageNumber, setPageNumber] = useState(1);

  // client side code
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          `/image/category/${categoryId}?page=${pageNumber}&limit=${itemsPerPage}`,
        );
        if (response.status === 200) {
          const imageData = response.data;
          setCategoryData(imageData.data);
          setImages(imageData.data.Images);
          const totalCount = imageData.totalCount;
          const totalPages = Math.ceil(totalCount / itemsPerPage);
          setTotalPages(totalPages); // Set totalPages
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [categoryId, pageNumber, itemsPerPage]);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  if (isLoading) {
    return <LoadingDots />;
  }

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex flex-col">
        <h1 className="w-full px-8 pb-0 pt-8 text-2xl font-semibold">
          {categoryData.name}
        </h1>
        <div className="max-w-[2520px] px-8">
          {images.length >= 1 ? (
            <div className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {images.map((image, index) => (
                <div key={image.id} className="">
                  <img
                    onClick={() => openImageViewer(index)}
                    src={`${imgBaseURL}/${image.thumbnail}`}
                    alt={image.alt}
                    className="h-64 w-full cursor-pointer rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-96 w-full items-center justify-center text-center">
              <h1 className="flex items-center justify-center text-center text-2xl font-semibold">
                No Images Found
              </h1>
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex items-center justify-center pt-4">
              <Pagination
                total={totalPages}
                page={pageNumber}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
        {isViewerOpen && (
          <ImageViewer
            src={images.map((image) => `${imgBaseURL}/${image.img}`)}
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
