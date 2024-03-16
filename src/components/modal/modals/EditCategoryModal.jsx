import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import Heading from "../Heading";
import { api } from "../../../api";
import { toast } from "sonner";
import useEditCategoryModal from "../../../hooks/useEditCategoryModal";
import Cookies from "js-cookie";

const EditCategoryModal = () => {
  const editCategoryModal = useEditCategoryModal();
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const { categoryId } = useSelector((state) => state.editCategoryModal);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [name, setName] = useState("");

  const submitEdit = async () => {
    setIsLoading(true);
    try {
      const response = await api.put(
        `/category/${categoryId}`,
        {
          name: category.name,
          description: category.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Category updated successfully");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/category/${categoryId}`);
        if (response.status === 200) {
          const category = response.data.category;
          const fetchedName = category.name;
          setCategory(category);
          setName(fetchedName);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

  const modalContent = (
    <div className="flex flex-col justify-evenly gap-y-5">
      <div>
        <label htmlFor="name">
          Album Name <sup className="text-red-500">*</sup>
        </label>
        <input
          className="w-full rounded-md border-2 border-gray-300 p-2"
          type="text"
          name="name"
          id="name"
          placeholder="Category Name"
          value={category?.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
      </div>
      <div>
        <textarea
          className="h-24 w-full rounded-md border-2 border-gray-300 p-2"
          name="comment"
          id="comment"
          cols="50"
          rows="5"
          value={category?.description}
          onChange={(e) =>
            setCategory({ ...category, description: e.target.value })
          }
        />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editCategoryModal.isOpen}
      onClose={editCategoryModal.onClose}
      actionLabel={"Save"}
      onSubmit={submitEdit}
      title={`Edit Album: ${name}`}
      body={modalContent}
    />
  );
};

export default EditCategoryModal;
