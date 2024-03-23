import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { LoadingDots, Sidebar } from "../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { toast } from "sonner";
import useEditCategoryModal from "../../hooks/useEditCategoryModal";
import useDeleteCategoryModal from "../../hooks/useDeleteCategoryModal";

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const editCategoryModal = useEditCategoryModal();
  const deleteCategoryModal = useDeleteCategoryModal();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      description: yup.string().optional(),
    }),
    onSubmit: async () => {
      try {
        const response = await api.post("/category", formik.values, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (response.status === 201) {
          fetchCategories();
        }
      } catch (error) {
        toast.error("Failed creating new categories");
      }
    },
  });

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");
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

  if (loading) {
    return <LoadingDots />;
  }

  document.title = "Categories";

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex w-full flex-col p-4 pl-8">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex flex-row justify-between gap-x-4">
          {/* ADD NEW CATEGORY */}
          <form className="p-4" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col ">
              <label htmlFor="name">Name</label>
              <input
                className="mr-2 rounded-md border border-black p-2 focus:ring-blue-500"
                type="text"
                name="name"
                onChange={(event) =>
                  formik.setFieldValue("name", event.target.value)
                }
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-sm text-red-500">{formik.errors.name}</div>
              )}
            </div>
            <div className="mt-2 flex flex-col">
              <label htmlFor="category_desc">Description</label>
              <textarea
                className="rounded-md border border-black p-2"
                name="description"
                onChange={(event) =>
                  formik.setFieldValue("description", event.target.value)
                }
                value={formik.values.description}
                cols={30}
                rows={5}
              />
              {formik.errors.description && formik.touched.description && (
                <div className="text-sm text-red-500">
                  {formik.errors.description}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-md border bg-black py-2 text-white hover:bg-opacity-80"
            >
              Create Category
            </button>
          </form>
          {/* CATEGORY TABLE */}
          <table className="h-full w-full">
            <thead className="border-b">
              <tr>
                <th className="border-gray-200 px-4 py-2 text-center">
                  Categories
                </th>
                <th className="border-gray-200 px-4 py-2 text-center">
                  Description
                </th>
                <th className="border-gray-200 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`${categories.length >= 10 ? "h-screen" : "h-full"}`}
            >
              {categories.map((category) => {
                return (
                  <tr key={category.id}>
                    <td className="border-gray-200 p-0 text-center">
                      {category.name}
                    </td>
                    <td className="border-gray-200 p-0 text-center">
                      {category.description}
                    </td>
                    <td className="border-gray-200 p-0 text-center">
                      <button
                        onClick={() => {
                          editCategoryModal.setCategoryId(category.id);
                          editCategoryModal.onOpen();
                        }}
                        className="mr-2 rounded-md px-4 text-black hover:text-blue-500"
                      >
                        <MdOutlineEdit size={24} />
                      </button>
                      <button
                        onClick={() => {
                          deleteCategoryModal.setCategoryId(category.id);
                          deleteCategoryModal.onOpen();
                        }}
                        className="rounded-md px-4 text-black hover:text-red-500"
                      >
                        <RiDeleteBinLine size={24} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
