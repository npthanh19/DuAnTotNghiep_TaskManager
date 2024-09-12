import { Darkmode } from '../../lib/Darkmode';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = ({ onToggleSidebar }) => {
     const { t, i18n } = useTranslation();
     const [isDarkMode, setIsDarkMode] = useState(false);
     const [language, setLanguage] = useState('vi');

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

     return (
          <nav
               className={`layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme ${
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
                         <li className="nav-item me-3">
                              <button className="nav-link px-0 dark-mode-toggle" aria-label="Toggle Dark Mode" onClick={handleDarkModeToggle}>
                                   <i className={`bi ${isDarkMode ? 'bi-moon-fill' : 'bi-sun-fill'} ri-24px`}></i>
                              </button>
                         </li>
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
                                             <div className="flex-grow-1">
                                                  <h6 className="mb-0 small">John Doe</h6>
                                                  <small className="text-muted">Admin</small>
                                             </div>
                                        </a>
                                   </li>
                                   <li>
                                        <div className="dropdown-divider"></div>
                                   </li>
                                   <Link className="dropdown-item" to="/admin/update_profile">
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
                                        <a className="dropdown-item" href="#">
                                             <span className="d-flex align-items-center align-middle">
                                                  <i className="flex-shrink-0 ri-file-text-line ri-22px me-3"></i>
                                                  <span className="flex-grow-1 align-middle">{t('Thông báo')}</span>
                                                  <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger h-px-20 d-flex align-items-center justify-content-center">
                                                       4
                                                  </span>
                                             </span>
                                        </a>
                                   </li>
                                   <li>
                                        <div className="dropdown-divider"></div>
                                   </li>
                                   <li>
                                        <div className="d-grid px-4 pt-2 pb-1">
                                             <a className="btn btn-danger d-flex" href="#" role="button">
                                                  <small className="align-middle">{t('Logout')}</small>
                                                  <i className="ri-logout-box-r-line ms-2 ri-16px"></i>
                                             </a>
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
