import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';
import Footer from '../components/admin/Footer';
import '../index.css';
const AdminLayout = ({ children }) => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

     const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
     };

     return (
          <div className="layout-wrapper layout-content-navbar">
               <div className="layout-container">
                    <Sidebar isOpen={isSidebarOpen} />
                    <div className={`layout-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                         <Navbar onToggleSidebar={toggleSidebar} />
                         <div className="content-wrapper">
                              <div className="container-fluid flex-grow-1 container-p-y" style={{ paddingLeft: '10px' }}>
                                   {children}
                              </div>
                              <Footer />
                              <div className="content-backdrop fade" />
                         </div>
                    </div>
               </div>
               <div className="layout-overlay layout-menu-toggle" />
          </div>
     );
};

export default AdminLayout;
