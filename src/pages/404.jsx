import React from "react";

export default function Page404() {
  return (
    <div className="flex items-center justify-center w-full min-h-[70vh] text-gray-900 my-12 px-4">
      <div className="flex flex-col items-center w-full gap-8">
        <h1 className="w-full font-black text-center text-gray-400 select-none text-9xl md:text-16xl">
          404
        </h1>
        <p className="text-3xl font-semibold text-center">
          You have discovered a secret place
        </p>
        <p className="text-2xl text-center md:px-12">
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </p>
        <div className="flex flex-row justify-between gap-8">
          <a
            href="/"
            className="flex items-center px-5 py-2 text-xl text-black border border-green-500 rounded-md justiy-center hover:bg-green-500 hover:text-white"
          >
            Home Page
          </a>
        </div>
      </div>
    </div>
  );
}
