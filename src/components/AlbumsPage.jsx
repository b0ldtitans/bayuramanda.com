import React, { useState, useEffect } from "react";
import { api } from "../api";
import AlbumCard from "./AlbumCard";

export default function CategoriesAlbum() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");
        if (response.status === 200) {
          const categoryData = response.data.categories;
          setCategories(categoryData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="max-w-[2520px]">
      <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <AlbumCard
              categoryId={category.id}
              categoryName={category.name}
              imagesCount={category.imagesCount}
            />
            <div className="absolute -right-3 -top-3 z-50">
              {/* <ContextMenu /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
