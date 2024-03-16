import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import Heading from "../Heading";
import { api } from "../../../api";
import { toast } from "sonner";
import useDeleteCategoryModal from "../../../hooks/useDeleteCategoryModal";
import Cookies from "js-cookie";

export default function DeleteCategoryModal() {
  const deleteCategoryModal = useDeleteCategoryModal();
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const { categoryId } = useSelector((state) => state.deleteCategoryModal);
  const [name, setName] = useState("");

  const deleteCategory = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        deleteCategoryModal.onClose();
        window.location.reload();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const modalFetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/category/${categoryId}`);
        if (response.status === 200) {
          const category = response.data.category;
          const fetchedName = category.name;
          setName(fetchedName);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    modalFetchCategory();
  }, [categoryId]);

  const bodyContent = (
    <div className="flex flex-col justify-evenly gap-y-5">
      <div className="flex items-center justify-center text-wrap">
        <Heading title={`Confirm Delete Album: ${name}`} />
      </div>
      <div>
        <p className="text-center">
          Are you sure you want to delete this category?
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={deleteCategoryModal.isOpen}
      onClose={deleteCategoryModal.onClose}
      actionLabel={"Delete"}
      onSubmit={deleteCategory}
      title={"Confirm Delete"}
      body={bodyContent}
    />
  );
}
