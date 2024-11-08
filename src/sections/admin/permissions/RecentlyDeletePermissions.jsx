import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTrashedPermissions, restorePermission, forceDeletePermission } from '../../../services/permissionService';

function RecentlyDeletedPermissions() {
     const [permissions, setPermissions] = useState([]);
     const { t } = useTranslation();
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;
     const [searchTerm, setSearchTerm] = useState('');

     useEffect(() => {
          const fetchTrashedPermissions = async () => {
               try {
                    const trashedPermissions = await getTrashedPermissions();
                    const sortedPermissions = trashedPermissions.sort((a, b) => b.id - a.id);
                    setPermissions(sortedPermissions);
               } catch (error) {
                    setError(error.message);
               } finally {
                    setLoading(false);
               }
          };

          fetchTrashedPermissions();
     }, []);

     const handleRestore = async (id) => {
          const result = await Swal.fire({
               title: t('Restore permission'),
               text: t('Are you sure you want to restore this permission?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: t('Restore'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await restorePermission(id);
                    setPermissions(permissions.filter((permission) => permission.id !== id));
                    toast.success(t('Permissions have been restored successfully!'));
               } catch (error) {
                    toast.error(t('An error occurred while restoring permissions.'));
               }
          }
     };

     const handleDeletePermanently = async (id) => {
          const result = await Swal.fire({
               title: t('Delete Permission'),
               text: t('Are you sure you want to permanently delete this permission?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await forceDeletePermission(id);
                    setPermissions(permissions.filter((permission) => permission.id !== id));
                    toast.success(t('Permissions have been permanently removed.'));
               } catch (error) {
                    toast.error(t('An error occurred while removing permissions.'));
               }
          }
     };

     const filteredPermissions = permissions.filter(
          (permission) => permission.name && permission.name.toLowerCase().includes(searchTerm.toLowerCase()),
     );

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentPermissions = filteredPermissions.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
     };

     if (loading) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">{t('Loading...')}</span>
                    </div>
               </div>
          );
     }

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span>{t('Recently Deleted Permissions')}</span>
                    </h3>
                    <div className="d-flex align-items-center ms-auto">
                         <input
                              type="text"
                              className="form-control form-control-sm me-2"
                              placeholder={t('Search...')}
                              value={searchTerm}
                              onChange={handleSearchChange}
                         />
                    </div>
                    <button className="btn btn-outline-secondary me-2" onClick={() => window.history.back()}>
                         <i className="bi bi-arrow-left me-2"></i>
                    </button>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr className="text-center">
                                   <th>{t('ID')}</th>
                                   <th>{t('Permission Name')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentPermissions.map((permission) => (
                                   <tr key={permission.id} className="text-center">
                                        <td>{permission.id}</td>
                                        <td>{permission.name}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${permission.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${permission.id}`}>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-warning"
                                                                 onClick={() => handleRestore(permission.id)}>
                                                                 <i className="bi bi-arrow-clockwise me-2"></i> {t('Restore')}
                                                            </button>
                                                       </li>

                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeletePermanently(permission.id)}>
                                                                 <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                              {currentPermissions.length === 0 && (
                                   <tr>
                                        <td colSpan="3" className="text-center">
                                             {t('No recently deleted permissions found.')}
                                        </td>
                                   </tr>
                              )}
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
               <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
               />
          </div>
     );
}

export default RecentlyDeletedPermissions;
