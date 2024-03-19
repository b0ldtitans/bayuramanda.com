import { useEffect, useState } from "react";
import {
  Sidebar,
  PasswordSetting,
  UploadProfilePicture,
} from "../../components";
import { api } from "../../api";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function AccountSetting() {
  document.title = "Account Setting";
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      profilePicture: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      fullname: Yup.string().required("Fullname is required"),
      profilePicture: Yup.mixed()
        .notRequired()
        .test("fileSize", "File is too large", (value) => {
          return !value || (value && value.size <= 1024 * 1024);
        })
        .test("fileType", "Invalid file type", (value) => {
          return (
            !value ||
            (value &&
              ["image/gif", "image/png", "image/jpeg"].includes(value.type))
          );
        }),
    }),
    onSubmit: async (values) => {
      if (values.profilePicture === null && !formik.dirty.profilePicture) {
        delete values.profilePicture;
      }
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("fullname", values.fullname);
        if (values.profilePicture) {
          formData.append("profilePicture", values.profilePicture);
        }
        const response = await api.put("/auth", formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          fetchProfile();
          toast.success("Profile successfully updated");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex w-full flex-col p-4 pl-8">
        <h1 className="py-1 text-2xl font-semibold">Account Setting</h1>
        <div className="">
          <form className="gap-4">
            <div className="flex flex-col pt-4">
              <label htmlFor="username" className="text-sm">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formik.values.fullname}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue("fullname", e.target.value)
                }
                className={`w-1/2 rounded-md border border-gray-300 p-2 ${
                  isLoading ? "cursor-not-allowed bg-gray-200/70" : ""
                }`}
              />
            </div>
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
                className={`w-1/2 rounded-md border border-gray-300 p-2 ${
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
                className={`w-1/2 rounded-md border border-gray-300 p-2 ${
                  isLoading ? "cursor-not-allowed bg-gray-200/70" : ""
                }`}
              />
            </div>
            <div className="flex w-2/4 flex-col pt-4 ">
              <UploadProfilePicture
                id="profilePicture"
                name="profilePicture"
                label="Profile Picture"
                formik={formik}
                field="profilePicture"
                onChange={(value) => {
                  formik.setFieldValue("profilePicture", value);
                }}
              />
            </div>

            <div className="flex flex-col pt-4">
              <button
                onClick={formik.handleSubmit}
                className="mt-4 w-1/2 rounded-md bg-black p-2 text-white hover:bg-black/70"
              >
                {isLoading ? (
                  <div className="flex cursor-not-allowed items-center justify-center">
                    <div className="flex h-6 w-6 animate-spin cursor-not-allowed items-center justify-center rounded-full border-4 border-t-blue-500" />
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
