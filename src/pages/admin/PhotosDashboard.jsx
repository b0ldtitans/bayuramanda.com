import { useState, useEffect, Suspense, lazy } from "react";
import { Sidebar, LoadingDots, NewAlbumButton } from "../../components";
import { api } from "../../api";
const AlbumCard = lazy(() => import("../../components/AlbumCard"));

export function PhotosComponent() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  document.title = "Photos";

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex w-full flex-col p-4 pl-8">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-semibold ">Photos</h1>
          <div className="">
            <NewAlbumButton />
          </div>
        </div>
        <div className="" />
        <div className="max-w-[2520px]">
          <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {categories.map((category) => (
              <div key={category.id} className="">
                <AlbumCard
                  categoryId={category.id}
                  categoryName={category.name}
                  imagesCount={category.imagesCount}
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
