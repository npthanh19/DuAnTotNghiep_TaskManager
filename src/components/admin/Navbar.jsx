import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../../services/authService';
import { axiosi } from '../../config/axios';
import Swal from 'sweetalert2';

const Navbar = ({ onToggleSidebar }) => {
     const { t, i18n } = useTranslation();
     const [isDarkMode, setIsDarkMode] = useState(false);
     const [language, setLanguage] = useState('vi');
     const navigate = useNavigate();

     const handleDarkModeToggle = () => {
          setIsDarkMode(!isDarkMode);
     };

     const handleLanguageSwitch = (lang) => {
          setLanguage(lang);
          i18n.changeLanguage(lang);
     };

     useEffect(() => {
          document.body.className = isDarkMode ? 'dark-mode' : '';
     }, [isDarkMode]);

     const handleLogout = async () => {
          try {
               await logout();
               localStorage.removeItem('isAuthenticated');
               localStorage.removeItem('token');
               sessionStorage.removeItem('user_email');
               axiosi.defaults.headers.common['Authorization'] = '';

               Swal.fire({
                    icon: 'success',
                    title: 'Đăng xuất thành công!',
                    position: 'top-right',
                    toast: true,
                    timer: 2000,
                    showConfirmButton: false,
               }).then(() => {
                    navigate('/taskmaneger/login');
               });
          } catch (error) {
               console.error('Logout error:', error);
          }
     };

     const truncateText = (text, maxLength) => {
          if (text.length <= maxLength) return text;
          return text.slice(0, maxLength) + '...';
     };

     return (
          <nav
               className={`layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme ${
                    isDarkMode ? 'dark-mode' : ''
               }`}
               id="layout-navbar">
               <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
                    <button className="nav-item nav-link px-0 me-xl-6 btn" aria-label="Toggle menu" onClick={onToggleSidebar}>
                         <i className="ri-menu-fill ri-24px"></i>
                    </button>
               </div>
               <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <div className="navbar-nav align-items-center">
                         <div className="nav-item d-flex align-items-center">
                              <i className="ri-search-line ri-22px me-2"></i>
                              <input type="text" className="form-control border-0 shadow-none" placeholder={t('Search...')} aria-label="Search" />
                         </div>
                    </div>
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                         <li className="nav-item dropdown me-3">
                              <div className="d-flex align-items-center">
                                   <button
                                        className="btn btn-link dropdown-toggle border-0 shadow-none"
                                        id="notificationDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <i className="bi bi-bell"></i>
                                   </button>

                                   <ul className="dropdown-menu dropdown-menu-end border-0 shadow-none" aria-labelledby="notificationDropdown">
                                        <li>
                                             <a className="dropdown-item" href="#">
                                                  <i className="bi bi-star-fill me-2 text-warning"></i>
                                                  {truncateText(
                                                       'NHDT đã giao cho bạn 1 nhiệm vụ cực kì quan trọng bạn nên xem mau không nên bỏ lở',
                                                       50,
                                                  )}
                                             </a>
                                        </li>
                                        <li>
                                             <a className="dropdown-item" href="#">
                                                  <i className="bi bi-info-circle me-2 text-primary"></i>
                                                  {truncateText('Đã có nhiệm vụ mới bạn vui lòng xem qua!', 50)}
                                             </a>
                                        </li>
                                        <li>
                                             <a className="dropdown-item" href="#">
                                                  <i className="bi bi-check-circle me-2 text-success"></i>
                                                  {truncateText('Nhiệm vụ mới vui lòng xem!!!', 50)}
                                             </a>
                                        </li>
                                   </ul>
                              </div>
                         </li>

                         <li className="nav-item dropdown me-3">
                              <div className="language-switcher">
                                   <button
                                        className={`language-button ${language === 'vi' ? 'active' : ''}`}
                                        onClick={() => handleLanguageSwitch('vi')}>
                                        VIE
                                   </button>
                                   <button
                                        className={`language-button ${language === 'en' ? 'active' : ''}`}
                                        onClick={() => handleLanguageSwitch('en')}>
                                        ENG
                                   </button>
                                   <span className={`language-slider ${language === 'vi' ? 'slider-vie' : 'slider-eng'}`}></span>
                              </div>
                         </li>
                         {/* <li className="nav-item me-3">
                              <button className="nav-link px-0 dark-mode-toggle" aria-label="Toggle Dark Mode" onClick={handleDarkModeToggle}>
                                   <i className={`bi ${isDarkMode ? 'bi-moon-fill' : 'bi-sun-fill'} ri-24px`}></i>
                              </button>
                         </li> */}
                         <li className="nav-item dropdown">
                              <a
                                   className="nav-link dropdown-toggle hide-arrow p-0"
                                   href="#"
                                   role="button"
                                   id="dropdownUser"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                   <div className="avatar avatar-online">
                                        <img src="/assets/admin/img/avatars/1.png" alt="User Avatar" className="w-px-40 h-auto rounded-circle" />
                                   </div>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-end mt-3 py-2" aria-labelledby="dropdownUser">
                                   <li>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                             <div className="flex-shrink-0 me-2">
                                                  <div className="avatar avatar-online">
                                                       <img
                                                            src="/assets/admin/img/avatars/1.png"
                                                            alt="User Avatar"
                                                            className="w-px-40 h-auto rounded-circle"
                                                       />
                                                  </div>
                                             </div>
                                        </a>
                                   </li>
                                   <li>
                                        <div className="dropdown-divider"></div>
                                   </li>
                                   <Link className="dropdown-item" to="/taskmaneger/update_profile">
                                        <i className="ri-user-3-line ri-22px me-2"></i>
                                        <span className="align-middle">{t('Thông tin cá nhân')}</span>
                                   </Link>
                                   <li>
                                        <a className="dropdown-item" href="#">
                                             <i className="ri-settings-4-line ri-22px me-2"></i>
                                             <span className="align-middle">{t('Cài đặt')}</span>
                                        </a>
                                   </li>
                                   <li>
                                        <div className="dropdown-divider"></div>
                                   </li>
                                   <li>
                                        <div className="d-grid px-4 pt-2 pb-1">
                                             <button className="btn btn-danger d-flex" onClick={handleLogout}>
                                                  <small className="align-middle">{t('Logout')}</small>
                                                  <i className="ri-logout-box-r-line ms-2 ri-16px"></i>
                                             </button>
                                        </div>
                                   </li>
                              </ul>
                         </li>
                    </ul>
               </div>
          </nav>
     );
};

export default Navbar;
