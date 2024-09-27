import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ isOpen }) => {
     const location = useLocation();
     const { pathname } = location;
     const { t } = useTranslation(); // Lấy hàm `t` từ `useTranslation`

     const isActive = (path) => (pathname === path ? 'active' : '');

     return (
          <aside id="layout-menu" className={`layout-menu menu-vertical menu bg-menu-theme ${isOpen ? 'open' : ''} d-md-block`}>
               <div className="app-brand demo">
                    <Link to="/taskmaneger" className="app-brand-link text-decoration-none">
                         <span className="app-brand-text demo menu-text fw-semibold ms-2">NHĐT</span>
                    </Link>
               </div>
               <ul className="menu-inner py-1">
                    <li className="menu-header fw-medium">
                         <span className="menu-header-text">{t('Task Manager')}</span>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/log')}`}>
                         <Link to="/taskmaneger/log" className="menu-link text-decoration-none">
                              <i className="bi bi-clock-history menu-icon"></i>
                              <span>{t('Activity Log')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/board')}`}>
                         <Link to="/taskmaneger/board" className="menu-link text-decoration-none">
                              <i className="bi bi-grid menu-icon"></i> {/* Updated icon */}
                              <span>{t('Board')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/projects')}`}>
                         <Link to="/taskmaneger/projects" className="menu-link text-decoration-none">
                              <i className="bi bi-grid menu-icon"></i> {/* Updated icon */}
                              <span>{t('Projects')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/tasks')}`}>
                         <Link to="/taskmaneger/tasks" className="menu-link text-decoration-none">
                              <i className="bi bi-grid menu-icon"></i> {/* Updated icon */}
                              <span>{t('Tasks')}</span>
                         </Link>
                    </li>
                    <li className="menu-header fw-medium mt-4">
                         <span className="menu-header-text">{t('Admin')}</span>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger')}`}>
                         <Link to="/taskmaneger" className="menu-link text-decoration-none">
                              <i className="bi bi-bar-chart menu-icon"></i>
                              <span>{t('Dashboard')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/categories')}`}>
                         <Link to="/taskmaneger/categories" className="menu-link text-decoration-none">
                              <i className="bi bi-tags menu-icon"></i>
                              <div>{t('Categories')}</div>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/users')}`}>
                         <Link to="/taskmaneger/users" className="menu-link text-decoration-none">
                              <i className="bi bi-person menu-icon"></i>
                              <div>{t('Account')}</div>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/roles')}`}>
                         <Link to="/taskmaneger/roles" className="menu-link text-decoration-none">
                              <i className="bi bi-shield-check menu-icon"></i>
                              <div>{t('Permissions')}</div>
                         </Link>
                    </li>
               </ul>
          </aside>
     );
};

export default Sidebar;
