import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { api } from "./api";
import { LoadingDots } from "./components/";
import { toast } from "sonner";

export const validateToken = async () => {
  const token = Cookies.get("token");
  if (!token) return false;

  try {
    const response = await api.get("/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.isValid;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = () => {
  const isLoggedIn = Cookies.get("isLoggedIn");
  const [isTokenValid, setTokenValid] = useState(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isValid = await validateToken();
      setTokenValid(isValid);
      if (!isValid) {
        Cookies.remove("token");
        Cookies.remove("isLoggedIn");
        toast.error("You are not authorized to access this page.");
      }
    };
    checkTokenValidity();
  }, []);

  if (isTokenValid === null) {
    return <LoadingDots />;
  }
  if (isLoggedIn && isTokenValid) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;
