import React, { useEffect, useState } from "react";
import { api } from "../api";
import { LoadingDots } from "../components";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function RecoverCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category/deleted");
      if (response.status === 200) {
        setCategories(response.data.categories);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    setIsLoading(false);
  }, []);

  const recoverCategory = async (categoryId) => {
    try {
      const response = await api.patch(`/category/${categoryId}`, null, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Category recovered successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  if (loading) {
    return <LoadingDots />;
  }

  document.title = "Categories";
  return (
    <table className="w-full h-full">
      <thead className="border-b">
        <tr>
          <th className="px-4 py-2 text-center border-gray-200">Categories</th>
          <th className="px-4 py-2 text-center border-gray-200">Description</th>
          <th className="px-4 py-2 text-center border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody className={`${categories.length <= 20 ? "h-full" : "h-full"}`}>
        {categories.map((category) => {
          return (
            <tr key={category.id} className="my-2">
              <td className="p-2 text-center border-gray-200">
                {category.name}
              </td>
              <td className="p-2 text-center border-gray-200">
                {category.description}
              </td>
              <td className="p-2 text-center border-gray-200 rounded-md">
                <button
                  onClick={() => recoverCategory(category.id)}
                  className="p-2 px-4 text-white bg-black rounded-md hover:bg-black/80"
                >
                  Recover
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
