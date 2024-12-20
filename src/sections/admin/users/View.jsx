import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllUsers, deleteUser } from '../../../services/usersService';
import { getAllRoles } from '../../../services/rolesService';
import Swal from 'sweetalert2';

export function View() {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;
     const { t } = useTranslation();
     const navigate = useNavigate();

     const [users, setUsers] = useState([]);
     const [roles, setRoles] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [searchTerm, setSearchTerm] = useState('');

     useEffect(() => {
          const fetchUsersAndRoles = async () => {
               try {
                    const [fetchedUsers, fetchedRoles] = await Promise.all([getAllUsers(), getAllRoles()]);
                    const sortedUsers = fetchedUsers.sort((a, b) => b.id - a.id);
                    setUsers(sortedUsers);
                    setRoles(fetchedRoles);
               } catch (err) {
                    setError(err.message || 'Unable to fetch the list of users or roles');
               } finally {
                    setLoading(false);
               }
          };

          fetchUsersAndRoles();
     }, []);

     const handleDeleteClick = (id, userName) => {
          const deleteTitle = t('Delete User:') + ` ${userName}`;

          Swal.fire({
               title: deleteTitle,
               text: t('Are you sure you want to delete this user?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         await deleteUser(id);
                         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                         Swal.fire({
                              icon: 'success',
                              text: t('The users has been moved to the trash!'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         Swal.fire({
                              icon: 'error',
                              text: t('An error occurred while deleting the users.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    }
               }
          });
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/users/edit/${id}`);
     };

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;

     const filteredUsers = users.filter((user) => user.fullname && user.fullname.toLowerCase().includes(searchTerm.toLowerCase()));
     const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
     };

     const getRoleNameById = (roleId) => {
          const role = roles.find((role) => role.id === roleId);
          return role ? role.name : 'N/A';
     };

     if (loading) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', marginTop: '-70px' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );
     }

     if (error) {
          return <div>Error: {error}</div>;
     }

     const handleAddUser = () => {
          navigate('/taskmaneger/users/add');
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center border-bottom py-3">
                    <h3 className="fw-bold text-center text-primary mb-0 fs-4">
                         <span className="marquee">{t('Users')}</span>
                    </h3>

                    <div className="d-flex align-items-center ms-auto">
                         <input
                              type="text"
                              className="form-control form-control-sm me-2"
                              placeholder={t('Search...')}
                              value={searchTerm}
                              onChange={handleSearchChange}
                         />

                         <button
                              className="btn btn-outline-secondary btn-sm ms-2 rounded-pill"
                              onClick={() => navigate('/taskmaneger/users/trashed')}>
                              <i className="bi bi-trash me-2"></i>
                         </button>

                         {/* <button className="btn btn-primary btn-sm" onClick={handleAddUser}>
                              {t('Add')}
                         </button> */}
                    </div>
               </div>

               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr className="text-center">
                                   <th>{t('STT')}</th>
                                   <th>{t('ID')}</th>
                                   <th>{t('Full Name')}</th>
                                   <th>{t('Avatar')}</th>
                                   <th>{t('Email')}</th>
                                   <th>{t('Phone')}</th>
                                   <th>{t('Role')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentUsers.map((user, index) => (
                                   <tr key={user.id} className="text-center">
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{user.id}</td>
                                        <td>{user.fullname}</td>
                                        <td>
                                             <div className="d-flex justify-content-center">
                                                  <img
                                                       src={`${process.env.REACT_APP_BASE_URL}/avatar/${user.avatar}`}
                                                       alt={user.fullname}
                                                       className="img-thumbnail"
                                                       style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                                                  />
                                             </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>{user.phone_number || 'N/A'}</td>
                                        <td>{getRoleNameById(user.role_id)}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${user.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical me-2"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${user.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(user.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeleteClick(user.id, user.fullname)}>
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
          </div>
     );
}
