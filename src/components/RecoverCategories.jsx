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
        console.log(response);
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
    <table className="h-full w-full">
      <thead className="border-b">
        <tr>
          <th className="border-gray-200 px-4 py-2 text-center">Categories</th>
          <th className="border-gray-200 px-4 py-2 text-center">Description</th>
          <th className="border-gray-200 px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className={`${categories.length <= 20 ? "h-full" : "h-full"}`}>
        {categories.map((category) => {
          return (
            <tr key={category.id} className="my-2">
              <td className="border-gray-200 p-2 text-center">
                {category.name}
              </td>
              <td className="border-gray-200 p-2 text-center">
                {category.description}
              </td>
              <td className="rounded-md border-gray-200 p-2 text-center">
                <button
                  onClick={() => recoverCategory(category.id)}
                  className="rounded-md bg-black p-2 px-4 text-white hover:bg-black/80"
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
