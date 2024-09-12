import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/client/HomePage";
import  ProductPage  from "../pages/client/ProductPage";


export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="profile" element={<ProductPage />} />
    </Routes>
  );
};
