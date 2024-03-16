import { useEffect, useState } from "react";
import { Sidebar, PasswordSetting } from "../../components";
import { api } from "../../api";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function AccountSetting() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  document.title = "Account Setting";

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/auth", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user.username,
      email: user.email,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await api.put(
          "/auth",
          {
            username: values.username,
            email: values.email,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Profile successfully updated");
        }
      } catch (error) {
        toast.error("Error updating profile");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex flex-col w-full p-4 pl-8">
        <h1 className="py-4 text-2xl font-semibold">Account Setting</h1>
        <div className="">
          <form className="gap-4">
            <div className="flex flex-col pt-4">
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue("username", e.target.value)
                }
                className={`w-1/2 p-2 border border-gray-300 rounded-md ${
                  isLoading ? "cursor-not-allowed bg-gray-200/70" : ""
                }`}
              />
            </div>
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={(e) => formik.setFieldValue("email", e.target.value)}
                className={`w-1/2 p-2 border border-gray-300 rounded-md ${
                  isLoading ? "cursor-not-allowed bg-gray-200/70" : ""
                }`}
              />
            </div>

            <div className="flex flex-col pt-4">
              <button
                type="submit"
                className="w-1/2 p-2 mt-4 text-white bg-black rounded-md hover:bg-black/70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center cursor-not-allowed">
                    <div className="flex items-center justify-center w-6 h-6 border-4 rounded-full cursor-not-allowed border-t-blue-500 animate-spin" />
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
          <PasswordSetting disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
