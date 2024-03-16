import { useState } from "react";
import { api } from "../api";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function PasswordSetting({ disabled }) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Current Password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      const { oldPassword, newPassword, confirmPassword } = values;
      setIsLoading(true);
      try {
        const response = await api.put(
          "/auth/password",
          {
            oldPassword,
            newPassword,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Password successfully updated");
        }
      } catch (error) {
        toast.error("Error updating password");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col pt-4">
          <label htmlFor="password" className="text-sm">
            Current Password
          </label>
          <input
            disabled={disabled}
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-1/2 p-2 border border-gray-300 rounded-md ${
              disabled ? "cursor-not-allowed bg-gray-200/70" : ""
            } `}
          />
          {formik.errors.oldPassword && formik.touched.oldPassword ? (
            <div className="text-xs text-red-500">
              {formik.errors.oldPassword}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col pt-4">
          <label htmlFor="password" className="text-sm">
            New Password
          </label>
          <input
            disabled={disabled}
            type="password"
            id="newPassword"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-1/2 p-2 border border-gray-300 rounded-md ${
              disabled ? "cursor-not-allowed bg-gray-200/70" : ""
            } `}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="text-xs text-red-500">
              {formik.errors.newPassword}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col pt-4">
          <label htmlFor="confirmPassword" className="text-sm">
            Confirm Password
          </label>
          <input
            disabled={disabled}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-1/2 p-2 border border-gray-300 rounded-md ${
              disabled ? "cursor-not-allowed bg-gray-200/70" : ""
            } `}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div className="text-xs text-red-500">
              {formik.errors.confirmPassword}
            </div>
          ) : null}

          <div className="flex flex-col pt-4">
            <button
              type="submit"
              className={`w-1/2 p-2 mt-4 text-white cursor-pointer bg-black rounded-md hover:bg-black/70 ${
                disabled ? "cursor-not-allowed bg-black/70" : ""
              }`}
              disabled={disabled || !formik.isValid}
            >
              {isLoading ? (
                <div className="flex items-center justify-center cursor-not-allowed">
                  <div className="flex items-center justify-center w-6 h-6 border-4 rounded-full cursor-not-allowed border-t-blue-500 animate-spin" />
                </div>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
