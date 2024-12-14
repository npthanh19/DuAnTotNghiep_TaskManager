import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../../services/authService';
import { getAllNotifications, markNotificationAsRead } from '../../services/notificationsService';
import { axiosi } from '../../config/axios';
import Swal from 'sweetalert2';

const Navbar = ({ onToggleSidebar }) => {
     const { t, i18n } = useTranslation();
     const [isDarkMode, setIsDarkMode] = useState(false);
     const [language, setLanguage] = useState('vi');
     const [notifications, setNotifications] = useState([]);
     const navigate = useNavigate();
     const [unreadCount, setUnreadCount] = useState(0);

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

     useEffect(() => {
          const fetchNotifications = async () => {
               try {
                    const data = await getAllNotifications();
                    const unreadNotifications = data.filter((notification) => !notification.read_at);
                    setNotifications(
                         data.map((notification) => ({
                              ...notification,
                              read: notification.read_at !== null,
                         })),
                    );
                    // Cập nhật số lượng thông báo chưa đọc
                    setUnreadCount(unreadNotifications.length);
               } catch (error) {
                    console.error('Error fetching notifications:', error);
               }
          };

          fetchNotifications();
     }, []);

     const handleNotificationClick = async (notificationId) => {
          try {
               await markNotificationAsRead(notificationId);

               // Cập nhật lại thông báo đã đọc
               setNotifications((prevNotifications) =>
                    prevNotifications.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
               );

               // Giảm số lượng thông báo chưa đọc
               setUnreadCount((prevCount) => prevCount - 1);
          } catch (error) {
               console.error('Error marking notification as read:', error);
          }
     };

     const handleLogout = async () => {
          try {
               await logout();

               const keysToRemove = ['isAuthenticated', 'token', 'role', 'user_id', 'user_name'];
               keysToRemove.forEach((key) => localStorage.removeItem(key));

               sessionStorage.clear();

               delete axiosi.defaults.headers.common['Authorization'];

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
                         {/* Dropdown thông báo */}
                         <li className="nav-item dropdown me-3">
                              <div className="d-flex align-items-center">
                                   <button
                                        className="btn btn-link dropdown-toggle border-0 shadow-none"
                                        id="notificationDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <i className="bi bi-bell"></i>
                                        {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
                                   </button>

                                   <ul className="dropdown-menu dropdown-menu-end border-0 shadow-none" aria-labelledby="notificationDropdown">
                                        {notifications.length === 0 ? (
                                             <li>
                                                  <span className="dropdown-item text-muted">{t('Không có thông báo')}</span>
                                             </li>
                                        ) : (
                                             notifications.map((notification) => (
                                                  <li key={notification.id}>
                                                       <a
                                                            className={`dropdown-item ${notification.read ? 'text-muted' : ''}`}
                                                            href="#"
                                                            onClick={() => handleNotificationClick(notification.id)}>
                                                            <i
                                                                 className={`bi ${
                                                                      notification.read ? 'bi-check-circle' : 'bi-info-circle'
                                                                 } me-2 text-primary`}></i>
                                                            {truncateText(notification.data.message, 50)}
                                                       </a>
                                                  </li>
                                             ))
                                        )}
                                   </ul>
                              </div>
                         </li>

                         {/* Chuyển ngôn ngữ */}
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

                         <li className="nav-item dropdown">
                              <a
                                   className="nav-link dropdown-toggle hide-arrow p-0"
                                   href="#"
                                   role="button"
                                   id="dropdownUser"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                   <div className="avatar">
                                        <img src="/assets/admin/img/avatars/1.png" alt="User Avatar" className="w-px-40 h-auto rounded-circle" />
                                   </div>
                              </a>
                              <ul className="dropdown-menu dropdown-menu-end mt-3 py-2" aria-labelledby="dropdownUser">
                                   <li className="px-3 py-2">
                                        <div className="d-flex align-items-center">
                                             <div className="avatar me-3">
                                                  <img
                                                       src="/assets/admin/img/avatars/1.png"
                                                       alt="User Avatar"
                                                       className="w-px-40 h-auto rounded-circle"
                                                  />
                                             </div>
                                             <div className="row" style={{ fontSize: '13px' }}>
                                                  <div className="col-12" style={{ fontWeight: '600' }}>
                                                       {localStorage.getItem('user_name')}
                                                  </div>
                                                  <div className="col-12 text-muted">{localStorage.getItem('role')}</div>
                                             </div>
                                        </div>
                                   </li>
                                   <li>
                                        <div className="dropdown-divider"></div>
                                   </li>
                                   <Link className="dropdown-item d-flex align-items-center" to="/taskmaneger/update_profile">
                                        <i className="ri-user-3-line ri-18px me-2"></i>
                                        <span className="align-middle">{t('Thông tin cá nhân')}</span>
                                   </Link>
                                   <li>
                                        <Link className="dropdown-item d-flex align-items-center" to="/taskmaneger/notifications">
                                             <i className="ri-notification-4-line ri-18px me-2"></i>
                                             <span className="align-middle">{t('Thông báo')}</span>
                                        </Link>
                                   </li>
                                   <li>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                             <i className="ri-settings-4-line ri-18px me-2"></i>
                                             <span className="align-middle">{t('Cài đặt')}</span>
                                        </a>
                                   </li>
                                   <li>
                                        <div className="dropdown-divider"></div>
                                   </li>
                                   <li>
                                        <div className="d-grid px-4 pt-2 pb-1">
                                             <button
                                                  className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
                                                  onClick={handleLogout}>
                                                  <i className="ri-logout-box-r-line me-2"></i>
                                                  <span>{t('Logout')}</span>
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
