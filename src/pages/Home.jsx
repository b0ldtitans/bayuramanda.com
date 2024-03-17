import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { api, imgBaseURL } from "../api";
import { LoadingDots } from "../components";
const placeholder = "../assets/placeholder.png";
const EmptyState = lazy(() => import("../components/EmptyState"));
const ImageViewer = lazy(() => import("react-simple-image-viewer"));

export function HomeComponent() {
  const params = new URLSearchParams(window.location.search);
  const searchParams = params.get("categoryName");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(
          searchParams ? `/image?categoryName=${searchParams}` : "/image",
        );

        document.title = searchParams
          ? searchParams
          : "Bayu Ramanda - Freelance Photographer";

        if (isMounted && response.status === 200) {
          setImages(response.data.images);
        }
      } catch (error) {
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  if (isLoading) {
    return <LoadingDots />;
  }
  if (images.length === 0) {
    return <EmptyState />;
  }

  return (
    <main>
      <div className="gallery">
        {images.map((thumbnail, index) => (
          <div
            key={thumbnail.id}
            onClick={() => openImageViewer(index)}
            className="pics"
          >
            <img
              src={`${imgBaseURL}/${thumbnail.thumbnail}`}
              alt={thumbnail.alt}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = { placeholder };
                e.currentTarget.alt = "Image not found";
                e.currentTarget.style.display = "none";
                e.currentTarget.onerror = null;
              }}
            />
          </div>
        ))}
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
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingDots />}>
      <HomeComponent />
    </Suspense>
  );
}
