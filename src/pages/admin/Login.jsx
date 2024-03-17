import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { api } from "../../api";
import { toast } from "sonner";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_identity: "",
      password: "",
      remember: remember,
    },
    validationSchema: yup.object().shape({
      user_identity: yup
        .string()
        .required("Username can't be empty")
        .min(6, "Minimum characters is 6"),
      password: yup.string().required("Password can't be empty"),
    }),
    onSubmit: async (values) => {
      const { user_identity, password } = values;
      setIsLoading(true);
      try {
        const response = await api.post("/auth", {
          user_identity,
          password,
          remember,
        });

        if (response.status === 200) {
          const userData = response.data;
          const token = userData.token;
          Cookies.set("token", token);
          Cookies.set("isLoggedIn", "true");
          navigate("/admin/dashboard/albums");
          toast.success("Login success");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  document.title = "Admin Login";

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <div className="flex">
              <BsPersonCircle className="mr-10 h-[30px] w-[30px]" />
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in
              </h1>
            </div>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  disabled={isLoading}
                  id="username"
                  className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm ${
                    isLoading ? "cursor-not-allowed" : ""
                  }`}
                  placeholder="Your username"
                  value={formik.values.user_identity}
                  onChange={(event) =>
                    formik.setFieldValue("user_identity", event.target.value)
                  }
                />
                {formik.errors.user_identity && formik.touched.user_identity ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.user_identity}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  disabled={isLoading}
                  placeholder="••••••••"
                  id="password"
                  className={`focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm ${
                    isLoading ? "cursor-not-allowed" : ""
                  }`}
                  value={formik.values.password}
                  onChange={(event) =>
                    formik.setFieldValue("password", event.target.value)
                  }
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2"
                  value={remember}
                  onChange={() => setRemember(!remember)}
                />
                <label htmlFor="remember" className="text-sm">
                  Remember me
                </label>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className={`focus:ring-primary-300 border-1 w-full rounded-lg border border-black bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-opacity-[80%] focus:outline-none focus:ring-4
                ${isLoading ? "bg-opacity-[80%]" : ""}`}
              >
                {isLoading ? (
                  <div className="flex cursor-not-allowed items-center justify-center">
                    <div className="flex h-4 w-4 animate-spin cursor-not-allowed items-center justify-center rounded-full border-4 border-t-blue-500" />
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
