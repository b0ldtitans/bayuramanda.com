import React from "react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">No images found</h1>
      <p className="text-lg">
        Please try again with different filters or search for an image
      </p>
    </div>
  );
}
