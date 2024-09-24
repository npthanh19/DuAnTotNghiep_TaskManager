import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Đảm bảo đã thêm dòng này

export default function Header() {
     return (
          <header id="header" className="header sticky-top">
               <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#007bff' }}>
                    <div className="container d-flex justify-content-between align-items-center">
                         <a className="navbar-brand me-4 text-white" href="#" style={{ fontWeight: 'bold' }}>
                              NHĐT
                         </a>

                         {/* Nút toggler cho mobile */}
                         <button
                              className="navbar-toggler ms-auto"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#navbarNav"
                              aria-controls="navbarNav"
                              aria-expanded="false"
                              aria-label="Toggle navigation">
                              <span className="navbar-toggler-icon"></span>
                         </button>

                         <div className="collapse navbar-collapse" id="navbarNav">
                              <ul className="navbar-nav mx-auto">
                                   <li className="nav-item">
                                        <a className="nav-link" href="#home" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                                             Trang chủ
                                        </a>
                                   </li>
                                   <li className="nav-item">
                                        <a className="nav-link" href="#management" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                                             Quản lý công việc
                                        </a>
                                   </li>
                                   <li className="nav-item">
                                        <a className="nav-link" href="#task-management" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                                             Hệ thống quản lý
                                        </a>
                                   </li>
                              </ul>
                              <div className="d-flex">
                                   <a href="#login" className="nav-link" style={{ color: '#ffffff', fontSize: '1.25rem' }}>
                                        <i className="bi bi-box-arrow-in-right" style={{ color: '#ffffff', fontSize: '1.25rem' }}></i> Đăng nhập
                                   </a>
                              </div>
                         </div>
                    </div>
               </nav>
          </header>
     );
}
