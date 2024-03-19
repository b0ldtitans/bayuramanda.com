import { useState, useEffect, Suspense, lazy } from "react";
import { Sidebar, LoadingDots, NewAlbumButton } from "../../components";
import useNewAlbumModal from "../../hooks/useNewAlbumModal";
import { api } from "../../api";
const AlbumCard = lazy(() => import("../../components/AlbumCard"));

export function PhotosComponent() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const newAlbumModal = useNewAlbumModal();

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/category");
      if (response.status === 200) {
        const categoryData = response.data.categories;
        setCategories(categoryData);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingDots />;
  }

  document.title = "Albums";

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex w-full flex-col p-4 pl-8">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-semibold ">Photos</h1>
        </div>
        <div className="max-w-[2520px]">
          <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            <div>
              <div
                onClick={() => {
                  newAlbumModal.onOpen();
                }}
                className="flex h-64 w-full cursor-pointer items-center justify-center rounded-lg bg-[#3D4042] object-cover text-center text-lg text-[#fff] transition-colors hover:bg-opacity-90"
              >
                + Create new album
              </div>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="">
                <AlbumCard
                  categoryId={category.id}
                  categoryName={category.name}
                  imagesCount={category.imageCount}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PhotosDashboard() {
  return (
    <Suspense fallback={<LoadingDots />}>
      <PhotosComponent />
    </Suspense>
  );
}
