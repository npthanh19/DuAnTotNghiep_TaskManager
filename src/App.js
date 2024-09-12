import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import { ClientRoutes } from './routes/clientRoute';
import { AdminRoutes } from './routes/adminRoute';
import i18n from './lib/i18n';

function App() {
     return (
          <Routes>
               <Route path="/*" element={<ClientRoutes />} />
               <Route path="admin/*" element={<AdminRoutes />} />
          </Routes>
     );
}

export default App;
