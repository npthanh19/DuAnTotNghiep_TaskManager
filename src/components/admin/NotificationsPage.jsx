import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { getAllNotifications, deleteNotification } from '../../services/notificationsService';
import { getAllDepartments } from '../../services/deparmentsService';
import Swal from 'sweetalert2';
import '../../index.css';
import { Link } from 'react-router-dom';

export default function Notifications() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     const [notifications, setNotifications] = useState([]);
     const [departments, setDepartments] = useState([]);
     const [isSaving, setIsSaving] = useState(false);
     const [isLoading, setIsLoading] = useState(true);
     const { t } = useTranslation();

     const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
     };

     useEffect(() => {
          const fetchNotifications = async () => {
               try {
                    const notificationsData = await getAllNotifications();
                    setNotifications(notificationsData);
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         text: t('Failed to fetch notifications.'),
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          };

          fetchNotifications();
     }, [t]);

     useEffect(() => {
          const fetchDepartmentsData = async () => {
               try {
                    const departmentsResponse = await getAllDepartments();
                    setDepartments(departmentsResponse);
               } catch (error) {
                    console.error('Error fetching departments:', error);
               } finally {
                    setIsLoading(false);
               }
          };

          fetchDepartmentsData();
     }, []);

     const getDepartmentName = (departmentId) => {
          const department = departments.find((dep) => dep.id === departmentId);
          return department ? department.department_name : '-';
     };

     const handleDelete = async (id) => {
          Swal.fire({
               title: t('Notifications'),
               text: t('Do you want to delete this notification?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: t('Yes, delete it!'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    setIsSaving(true);
                    try {
                         await deleteNotification(id);
                         setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
                         Swal.fire({
                              icon: 'success',
                              text: t('Notification deleted successfully.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         Swal.fire({
                              icon: 'error',
                              text: t('Failed to delete notification.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } finally {
                         setIsSaving(false);
                    }
               }
          });
     };

     if (isLoading) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );
     }

     return (
          <div className="layout-wrapper layout-content-navbar">
               <div className="layout-container">
                    <Sidebar isOpen={isSidebarOpen} />
                    <div className={`layout-page ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                         <Navbar onToggleSidebar={toggleSidebar} />
                         <div className="content-wrapper">
                              <div className="container-fluid flex-grow-1 container-p-y">
                                   <div className="row">
                                        <div className="col-md-12">
                                             <div className="nav-align-top">
                                                  <ul className="nav nav-pills flex-column flex-md-row mb-6 gap-2 gap-lg-0">
                                                       <li className="nav-item">
                                                            <Link to="/taskmaneger/update_profile" className="nav-link active">
                                                                 <i className="ri-group-line me-1_5" />
                                                                 {t('Account')}
                                                            </Link>
                                                            <Link to="/taskmaneger/notifications" className="nav-link active">
                                                                 <i className="ri-notification-2-line me-1_5" />
                                                                 {t('Notifications')}
                                                            </Link>
                                                       </li>
                                                  </ul>
                                             </div>
                                             <div className="card mb-6">
                                                  <div className="card-body">
                                                       <div className="d-flex justify-content-between">
                                                            <h5>{t('Notifications')}</h5>
                                                       </div>
                                                       <div className="list-group border-0">
                                                            {notifications.length === 0 ? (
                                                                 <div className="text-center p-3">{t('Notifications not found')}</div>
                                                            ) : (
                                                                 notifications.map((notification) => (
                                                                      <div
                                                                           className="list-group-item border-0 rounded-3 shadow-sm mb-3"
                                                                           key={notification.id}>
                                                                           <div className="d-flex justify-content-between align-items-start">
                                                                                <div className="d-flex align-items-center">
                                                                                     <div
                                                                                          className={`rounded-circle p-2 bg-${
                                                                                               notification.data.type === 'important'
                                                                                                    ? 'danger'
                                                                                                    : 'info'
                                                                                          } me-3`}>
                                                                                          <i
                                                                                               className={`ri-${
                                                                                                    notification.data.type === 'important'
                                                                                                         ? 'alarm-line'
                                                                                                         : 'bell-line'
                                                                                               } text-white`}></i>
                                                                                     </div>
                                                                                     <div>
                                                                                          <h6 className="mb-1">{notification.data.message}</h6>
                                                                                          <p className="text-muted mb-0">
                                                                                               {t('Department')}:{' '}
                                                                                               {getDepartmentName(notification.data.department_id)}
                                                                                          </p>
                                                                                     </div>
                                                                                </div>
                                                                                <div>
                                                                                     <button
                                                                                          className="btn btn-sm btn-outline-danger"
                                                                                          onClick={() => handleDelete(notification.id)}
                                                                                          disabled={isSaving}>
                                                                                          {t('Delete')}
                                                                                     </button>
                                                                                </div>
                                                                           </div>
                                                                      </div>
                                                                 ))
                                                            )}
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <Footer />
                    </div>
               </div>
          </div>
     );
}
