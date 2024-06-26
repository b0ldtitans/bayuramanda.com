import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { LoadingDots } from "./components";
import ProtectedRoute from "./middleware";

export function AdminLayout(children) {
  return <>{children}</>;
}

export default function App() {
  const Login = lazy(() => import("./pages/admin/Login"));

  const AccountSetting = lazy(() => import("./pages/admin/AccountSetting"));
  const PhotosDashboard = lazy(() => import("./pages/admin/PhotosDashboard"));
  const RecoverDashboard = lazy(() => import("./pages/admin/RecoverDashboard"));
  const AlbumPage = lazy(() => import("./pages/admin/AlbumPage"));
  const NotFound = lazy(() => import("./pages/404"));
  const Contact = lazy(() => import("./pages/Contact"));
  const About = lazy(() => import("./pages/About"));
  const PhotoUploader = lazy(() => import("./components/PhotoUploader"));

  const NewAlbumModal = lazy(
    () => import("./components/modal/modals/NewAlbumModal"),
  );
  const EditCategoryModal = lazy(
    () => import("./components/modal/modals/EditCategoryModal"),
  );
  const DeleteCategoryModal = lazy(
    () => import("./components/modal/modals/DeleteCategoryModal"),
  );
  const EditPhotoModal = lazy(
    () => import("./components/modal/modals/EditPhotoModal"),
  );
  const UploadPhoyoModal = lazy(
    () => import("./components/modal/modals/UploadPhotoModal"),
  );
  return (
    <Suspense fallback={<LoadingDots />}>
      <EditCategoryModal />
      <DeleteCategoryModal />
      <NewAlbumModal />
      <EditPhotoModal />
      <UploadPhoyoModal />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<PhotoUploader />} />
        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard/"
          element={<ProtectedRoute element={<AdminLayout />} />}
        >
          <Route index element={<PhotosDashboard />} />
          <Route path="albums" index element={<PhotosDashboard />} />
          <Route path="albums/:categoryId" index element={<AlbumPage />} />
          <Route path="setting" index element={<AccountSetting />} />
          <Route path="recover" index element={<RecoverDashboard />} />
        </Route>
        {/* END OF ADMIN ROUTES */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
