import React, { useState } from "react";
import Modal from "../Modal";
import { api } from "../../../api";
import { toast } from "sonner";
import useNewAlbumModal from "../../../hooks/useNewAlbumModal";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader } from "@mantine/core";

const NewAlbumModal = () => {
  const newAlbumModal = useNewAlbumModal();
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Album Name is Required"),
      description: Yup.string().optional("Required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await api.post(
          `/category`,
          {
            name: values.name,
            description: values.description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status === 201) {
          toast.success("Category updated successfully");
          window.location.reload();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const modalContent = (
    <div className="flex flex-col justify-evenly gap-y-5">
      <form>
        <label className="" htmlFor="name">
          Album Name <sup className="text-red-500">*</sup>
        </label>
        <input
          className="w-full rounded-md border-2 border-gray-300 p-2"
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
      </form>
      <div>
        <label htmlFor="comment">Description</label>
        <textarea
          className="h-24 w-full rounded-md border-2 border-gray-300 p-2"
          name="comment"
          id="comment"
          cols="50"
          rows="5"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={newAlbumModal.isOpen}
      onClose={newAlbumModal.onClose}
      actionLabel={isLoading ? <Loader color="white" /> : "Create New Album"}
      onSubmit={formik.handleSubmit}
      title={"Create New Album"}
      body={modalContent}
    />
  );
};

export default NewAlbumModal;
