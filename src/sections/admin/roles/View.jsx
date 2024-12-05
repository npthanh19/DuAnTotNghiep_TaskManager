import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllRoles, deleteRole, getRoleById, deletePermissionFromRole } from '../../../services/rolesService';
import Swal from 'sweetalert2';

export function View() {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 5;
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [roles, setRoles] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          const fetchRoles = async () => {
               try {
                    const fetchedRoles = await getAllRoles();
                    const sortedRoles = fetchedRoles.sort((a, b) => b.id - a.id);
                    setRoles(sortedRoles);
                    setRoles(fetchedRoles);
               } catch (err) {
                    setError(err.message || 'Unable to fetch the list of roles');
               } finally {
                    setLoading(false);
               }
          };
          fetchRoles();
     }, []);

     const handleDeleteRole = async (id) => {
          try {
               await deleteRole(id);
               setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
               Swal.fire({
                    icon: 'success',
                    text: t('The role has been moved to the trash!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          } catch (error) {
               Swal.fire({
                    icon: 'error',
                    text: t('An error occurred while deleting the role.'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          }
     };

     const handleDeleteClick = (id) => {
          Swal.fire({
               title: t('Delete Roles'),
               text: t('Are you sure you want to delete this role?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    await handleDeleteRole(id);
               }
          });
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/roles/edit/${id}`);
     };

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(roles.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
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

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span>{t('Roles')}</span>
                    </h3>
                    <Link to="/taskmaneger/roles/add" className="btn btn-primary">
                         <i className="bi bi-plus me-2"></i> {t('Add')}
                    </Link>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col">{t('STT')}</th>
                                   <th>{t('ID')}</th>
                                   <th>{t('Role Name')}</th>
                                   <th>{t('Description')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentRoles.map((role, index) => (
                                   <tr key={role.id}>
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{role.id}</td>
                                        <td>{role.name}</td>
                                        <td>{role.description}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${role.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${role.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(role.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(role.id)}>
                                                                 <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                            </button>
                                                       </li>
                                                       {/* <li>
                                                            <button className="dropdown-item" onClick={() => handleViewPermissions(role.id)}>
                                                                 <i className="bi bi-eye me-2"></i> {t('View Permissions')}
                                                            </button>
                                                       </li> */}
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
