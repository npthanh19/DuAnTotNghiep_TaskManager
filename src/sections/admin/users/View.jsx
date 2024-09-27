import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DeleteUsers } from '../../../sections/admin/users/Delete';
export function View() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedUsersId, setselectedUsersId] = useState(null);

     const handleDeleteClick = (id) => {
          setselectedUsersId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setselectedUsersId(null);
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/users/edit/${id}`);
     };

     const handleStatusChange = (id, newStatus) => {
          console.log(`Users ID ${id} status changed to ${newStatus}`);
     };
     const users = [
          {
               id: 1,
               username: 'john_doe',
               password: 'password123',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'john@example.com',
               full_name: 'John Doe',
               created_at: '2024-09-24T10:30:00',
               updated_at: '2024-09-24T12:00:00',
               role_id: 1,
               department_id: 101,
          },
          {
               id: 2,
               username: 'jane_smith',
               password: 'password456',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'jane@example.com',
               full_name: 'Jane Smith',
               created_at: '2024-09-22T11:00:00',
               updated_at: '2024-09-24T12:15:00',
               role_id: 2,
               department_id: 102,
          },
          {
               id: 3,
               username: 'mark_taylor',
               password: 'password789',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'mark@example.com',
               full_name: 'Mark Taylor',
               created_at: '2024-09-20T09:45:00',
               updated_at: '2024-09-24T10:45:00',
               role_id: 3,
               department_id: 103,
          },
          {
               id: 4,
               username: 'lisa_wong',
               password: 'password321',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'lisa@example.com',
               full_name: 'Lisa Wong',
               created_at: '2024-09-21T08:30:00',
               updated_at: '2024-09-24T09:30:00',
               role_id: 4,
               department_id: 104,
          },
          {
               id: 5,
               username: 'alex_morgan',
               password: 'password654',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'alex@example.com',
               full_name: 'Alex Morgan',
               created_at: '2024-09-23T07:15:00',
               updated_at: '2024-09-24T08:15:00',
               role_id: 5,
               department_id: 105,
          },
          {
               id: 6,
               username: 'susan_clark',
               password: 'password987',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'susan@example.com',
               full_name: 'Susan Clark',
               created_at: '2024-09-20T06:00:00',
               updated_at: '2024-09-24T07:00:00',
               role_id: 1,
               department_id: 106,
          },
          {
               id: 7,
               username: 'daniel_kim',
               password: 'password111',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'daniel@example.com',
               full_name: 'Daniel Kim',
               created_at: '2024-09-19T05:30:00',
               updated_at: '2024-09-24T06:30:00',
               role_id: 2,
               department_id: 107,
          },
          {
               id: 8,
               username: 'emma_brown',
               password: 'password222',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'emma@example.com',
               full_name: 'Emma Brown',
               created_at: '2024-09-18T04:00:00',
               updated_at: '2024-09-24T05:00:00',
               role_id: 3,
               department_id: 108,
          },
          {
               id: 9,
               username: 'oliver_jones',
               password: 'password333',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'oliver@example.com',
               full_name: 'Oliver Jones',
               created_at: '2024-09-17T03:30:00',
               updated_at: '2024-09-24T04:30:00',
               role_id: 4,
               department_id: 109,
          },
          {
               id: 10,
               username: 'mia_davis',
               password: 'password444',
               avatar: '/assets/admin/img/avatars/1.png',
               email: 'mia@example.com',
               full_name: 'Mia Davis',
               created_at: '2024-09-16T02:15:00',
               updated_at: '2024-09-24T03:15:00',
               role_id: 5,
               department_id: 110,
          },
     ];

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

     const totalPages = Math.ceil(users.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Users')}</span>
                    </h3>
                    <Link to="/taskmaneger/users/add" className="btn btn-primary">
                         <i className="bi bi-plus me-2"></i> {t('Add new')}
                    </Link>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr className="text-center">
                                   <th>ID</th>
                                   <th>{t('Username')}</th>
                                   <th>{t('Avatar')}</th>
                                   <th>{t('Email')}</th>
                                   <th>{t('Full Name')}</th>
                                   <th>{t('Role ID')}</th>
                                   <th>{t('Department ID')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentUsers.map((users) => (
                                   <tr key={users.id} className="text-center">
                                        <td>{users.id}</td>
                                        <td>{users.username}</td>
                                        <td>
                                             <img
                                                  src={users.avatar}
                                                  alt={users.username}
                                                  className="img-thumbnail"
                                                  style={{ width: '50px', height: '50px' }}
                                             />
                                        </td>
                                        <td>{users.email}</td>
                                        <td>{users.full_name}</td>
                                        <td>{users.role_id}</td>
                                        <td>{users.department_id}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${users.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${users.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(users.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(users.id)}>
                                                                 <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
                    <nav aria-label="Page navigation">
                         <ul className="pagination mt-2">
                              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                   <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                        {t('Previous')}
                                   </button>
                              </li>
                              {[...Array(totalPages)].map((_, index) => (
                                   <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                             {index + 1}
                                        </button>
                                   </li>
                              ))}
                              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                   <button
                                        className="page-link"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}>
                                        {t('Next')}
                                   </button>
                              </li>
                         </ul>
                    </nav>
               </div>
               {showDeleteModal && <DeleteUsers userId={selectedUsersId} onClose={handleCloseModal} />}
          </div>
     );
}
