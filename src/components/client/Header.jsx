import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../sections/client/Style.css';

export default function Header() {
     return (
          <header>
            <nav class="layout-navbar container shadow-none py-0">
                <div
                    class="navbar navbar-expand-lg landing-navbar border-top-0 px-4 px-md-8">
                    <div
                        class="navbar-brand app-brand demo d-flex py-0 py-lg-2 me-6">
                        <button class="navbar-toggler border-0 px-0 me-2"
                            type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i
                                class="tf-icons ri-menu-fill ri-24px align-middle"></i>
                        </button>
                        <a href="#" class="app-brand-link">
                            <span
                                class="app-brand-text demo menu-text">NHĐT</span>
                        </a>
                    </div>
                    <div class="collapse navbar-collapse landing-nav-menu"
                        id="navbarSupportedContent">
                        <button
                            class="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl"
                            type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i class="tf-icons ri-close-fill"></i>
                        </button>
                        <ul class="navbar-nav me-auto p-4 p-lg-0 ">
                            <li class="nav-item">
                                <a href="#" class="nav-link fw-medium"
                                    aria-current="page">Trang chủ</a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link fw-medium">Dự án của
                                    tôi</a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link fw-medium">Tạo công
                                    việc</a>
                            </li>
                            <li class="nav-item">
                                <a href="#" class="nav-link fw-medium">Báo
                                    cáo</a>
                            </li>
                        </ul>
                    </div>
                    <div class="landing-menu-overlay d-lg-none"></div>
                    <ul class="navbar-nav flex-row align-items-center ms-auto">
                        <li
                            class="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                            <a href id="iconClick"
                                class="nav-link btn btn-text-secondary rounded-pill btn-icon  hide-arrow me-sm-4 waves-effect waves-light show"
                                aria-expanded="false">
                                <i class="ri-24px text-heading ri-sun-line"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="btn btn-primary custom-btn-height px-2 px-sm-4 px-lg-2 px-xl-4 waves-effect waves-light"
                                target="_blank">
                                <span
                                    class="tf-icons ri-user-line me-md-1"></span>
                                <span class="d-none d-md-block">Đăng nhập</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
     );
}
