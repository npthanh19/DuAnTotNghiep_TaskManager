import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../sections/client/Home";
import ClientLayout from "../layouts/Clientlayout";

export const ClientRoutes = () => {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes here as needed */}
      </Routes>
    </ClientLayout>
  );
};
