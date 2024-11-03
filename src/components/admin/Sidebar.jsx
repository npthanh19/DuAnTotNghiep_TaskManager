import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../index.css';

const Sidebar = ({ isOpen }) => {
     const location = useLocation();
     const { pathname } = location;
     const { t } = useTranslation();

     const isActive = (path) => (pathname === path ? 'active' : '');

     return (
          <aside id="layout-menu" className={`layout-menu menu-vertical menu bg-menu-theme ${isOpen ? 'open' : ''} d-md-block`}>
               <div className="app-brand demo">
                    <Link to="/taskmaneger" className="app-brand-link text-decoration-none">
                         <span
                              className="app-brand-text demo menu-text fw-bold ms-2 fs-3 text-primary bg-light p-2 rounded shadow-sm transition"
                              style={{ transition: 'all 0.3s ease' }}>
                              NHĐT
                         </span>
                    </Link>
               </div>

               <ul className="menu-inner py-1">
                    <li className="menu-header fw-medium">
                         <span className="menu-header-text">{t('Task Manager')}</span>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/log')}`}>
                         <Link to="/taskmaneger/log" className="menu-link text-decoration-none">
                              <i className="bi bi-file-earmark-text menu-icon"></i>
                              <span>{t('Activity Log')}</span>
                         </Link>
                    </li>     
                    <li className={`menu-item ${isActive('/taskmaneger/board')}`}>
                         <Link to="/taskmaneger/board" className="menu-link text-decoration-none">
                              <i className="bi bi-kanban menu-icon"></i>
                              <span>{t('Board')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/board_list')}`}>
                         <Link to="/taskmaneger/board_list" className="menu-link text-decoration-none">
                              <i className="bi bi-list menu-icon"></i>
                              <span>{t('Board List')}</span>
                         </Link>
                    </li>

                    <li className={`menu-item ${isActive('/taskmaneger/projects')}`}>
                         <Link to="/taskmaneger/projects" className="menu-link text-decoration-none">
                              <i className="bi bi-folder2 menu-icon"></i>
                              <span>{t('Projects')}</span>
                         </Link>
                    </li>
                     <li className={`menu-item ${isActive('/taskmaneger/worktimes')}`}>
                         <Link to="/taskmaneger/worktimes" className="menu-link text-decoration-none">
                               <i className="bi bi-calendar menu-icon"></i>
                              <span>{t('Worktimes')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/tasks')}`}>
                         <Link to="/taskmaneger/tasks" className="menu-link text-decoration-none">
                              <i className="bi bi-list-task menu-icon"></i>
                              <span>{t('Tasks')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/assignments')}`}>
                         <Link to="/taskmaneger/assignments" className="menu-link text-decoration-none">
                              <i className="bi bi-person-lines-fill menu-icon"></i>
                              <span>{t('Assignment')}</span>
                         </Link>
                    </li>

                    <li className={`menu-item ${isActive('/taskmaneger/departments')}`}>
                         <Link to="/taskmaneger/departments" className="menu-link text-decoration-none">
                              <i className="bi bi-building menu-icon"></i> {/* Đổi icon ở đây */}
                              <span>{t('Departments')}</span>
                         </Link>
                    </li>

                    <li className={`menu-item ${isActive('/taskmaneger/recentlydelete')}`}>
                         <Link to="/taskmaneger/recentlydelete" className="menu-link text-decoration-none">
                              <i className="bi bi-trash menu-icon"></i>
                              <span>{t('trash')}</span>
                         </Link>
                    </li>

                    <li className="menu-header fw-medium mt-4">
                         <span className="menu-header-text">{t('Admin')}</span>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger')}`}>
                         <Link to="/taskmaneger" className="menu-link text-decoration-none">
                              <i className="bi bi-house-door menu-icon"></i>
                              <span>{t('Dashboard')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/users')}`}>
                         <Link to="/taskmaneger/users" className="menu-link text-decoration-none">
                              <i className="bi bi-person-circle menu-icon"></i>
                              <span>{t('Account')}</span>
                         </Link>
                    </li>
                    <li className={`menu-item ${isActive('/taskmaneger/roles')}`}>
                         <Link to="/taskmaneger/roles" className="menu-link text-decoration-none">
                              <i className="bi bi-shield-lock menu-icon"></i>
                              <span>{t('Permissions')}</span>
                         </Link>
                    </li>
               </ul>
          </aside>
     );
};

export default Sidebar;
