import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen text-center bg-slate-50">
      <img
        src="404_NotFound.png"
        alt="image not found"
        className="w-96 max-w-full"
      />
      <p className="text-xl font-semibold">Bạn đang di vào vùng cấm địa 🚫</p>
      <a
        href="/"
        className="inline-block px-6 py-3 rounded-2xl shadow-md bg-primary hover:bg-primary-dark font-medium text-white transition"
      >
        Quay về trang chủ
      </a>
    </div>
  );
};

export default NotFound;
