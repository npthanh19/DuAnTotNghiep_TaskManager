import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../sections/client/Style.css';
import { Link } from 'react-router-dom';

export default function Header() {
     return (
          <header>
               <nav className="layout-navbarr container shadow-none py-0">
                    <div className="navbar navbar-expand-lg landing-navbar border-top-0 px-4 px-md-8">
                         <div className="navbar-brand app-brand demo d-flex py-0 py-lg-2 me-6">
                              <button
                                   className="navbar-toggler border-0 px-0 me-2"
                                   type="button"
                                   data-bs-toggle="collapse"
                                   data-bs-target="#navbarSupportedContent"
                                   aria-controls="navbarSupportedContent"
                                   aria-expanded="false"
                                   aria-label="Toggle navigation">
                                   <i className="tf-icons ri-menu-fill ri-24px align-middle"></i>
                              </button>
                              <a href="#" className="app-brand-link">
                                   <span className="app-brand-text demo menu-text">NHĐT</span>
                              </a>
                         </div>
                         <div className="collapse navbar-collapse landing-nav-menu" id="navbarSupportedContent">
                              <button
                                   className="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl"
                                   type="button"
                                   data-bs-toggle="collapse"
                                   data-bs-target="#navbarSupportedContent"
                                   aria-controls="navbarSupportedContent"
                                   aria-expanded="false"
                                   aria-label="Toggle navigation">
                                   <i className="tf-icons ri-close-fill"></i>
                              </button>
                              <ul className="navbar-nav me-auto p-4 p-lg-0 ">
                                   <li className="nav-item">
                                        <a href="#" className="nav-link fw-medium" aria-current="page">
                                             Trang chủ
                                        </a>
                                   </li>
                                   <li className="nav-item">
                                        <a href="#" className="nav-link fw-medium">
                                             Dự án của tôi
                                        </a>
                                   </li>
                                   <li className="nav-item">
                                        <a href="#" className="nav-link fw-medium">
                                             Tạo công việc
                                        </a>
                                   </li>
                                   <li className="nav-item">
                                        <a href="#" className="nav-link fw-medium">
                                             Báo cáo
                                        </a>
                                   </li>
                              </ul>
                         </div>
                         <div className="landing-menu-overlay d-lg-none"></div>
                         <ul className="navbar-nav flex-row align-items-center ms-auto">
                              <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                                   <a
                                        href="#"
                                        id="iconClick"
                                        className="nav-link btn btn-text-secondary rounded-pill btn-icon hide-arrow me-sm-4 waves-effect waves-light show"
                                        aria-expanded="false">
                                        <i className="ri-24px text-heading ri-sun-line"></i>
                                   </a>
                              </li>
                              <li>
                                   <Link
                                        to="/taskmaneger"
                                        className="btn btn-primary custom-btn-height px-2 px-sm-4 px-lg-2 px-xl-4 waves-effect waves-light">
                                        <span className="tf-icons ri-user-line me-md-1"></span>
                                        <span className="d-none d-md-block">Đăng nhập</span>
                                   </Link>
                              </li>
                         </ul>
                    </div>
               </nav>
          </header>
     );
}
