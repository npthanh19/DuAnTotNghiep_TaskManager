import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllRoles, deleteRole, getRoleById, deletePermissionFromRole } from '../../../services/rolesService';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

export function View() {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 5;
     const { t } = useTranslation();
     const navigate = useNavigate();
     const [currentRoleId, setCurrentRoleId] = useState(null);
     const [roles, setRoles] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [permissions, setPermissions] = useState([]); // State để lưu quyền của vai trò
     const [showPermissionsModal, setShowPermissionsModal] = useState(false); // State để hiển thị modal

     useEffect(() => {
          const fetchRoles = async () => {
               try {
                    const fetchedRoles = await getAllRoles();
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
               toast.success(t('Role has been deleted!'));
          } catch (error) {
               toast.error(t('An error occurred while deleting the role'));
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
               cancelButtonText: t('Cancel')
          }).then(async (result) => {
               if (result.isConfirmed) {
                    await handleDeleteRole(id);
               }
          });
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/roles/edit/${id}`);
     };

     const handleViewPermissions = async (id) => {
          try {
               const fetchedRole = await getRoleById(id);
               setPermissions(fetchedRole.permissions);
               setCurrentRoleId(id);
               setShowPermissionsModal(true);
          } catch (error) {
               toast.error(t('An error occurred while fetching permissions'));
          }
     };


     const handleDeletePermission = async (permissionId) => {
          try {
               // Gọi API để xoá quyền khỏi vai trò
               await deletePermissionFromRole(currentRoleId, permissionId);

               // Cập nhật lại state để xóa quyền khỏi danh sách
               setPermissions((prevPermissions) => prevPermissions.filter((perm) => perm.id !== permissionId));

               // Hiển thị thông báo thành công
               toast.success(t('Permission has been deleted!'));
          } catch (error) {
               // Xử lý lỗi nếu có
               toast.error(t('An error occurred while deleting the permission'));
               console.error(error);
          }
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
                                   <th>ID</th>
                                   <th>{t('Role Name')}</th>
                                   <th>{t('Description')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentRoles.map((role) => (
                                   <tr key={role.id}>
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
                                                       <li>
                                                            <button className="dropdown-item" onClick={() => handleViewPermissions(role.id)}>
                                                                 <i className="bi bi-eye me-2"></i> {t('View Permissions')}
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

               {showPermissionsModal && (
                    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-modal="true">
                         <div className="modal-dialog modal-lg">
                              <div className="modal-content">
                                   <div className="modal-header">
                                        <h5 className="modal-title">{t('Permissions')}</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowPermissionsModal(false)} aria-label="Close"></button>
                                   </div>
                                   <div className="modal-body">
                                        <table className="table">
                                             <thead>
                                                  <tr>
                                                       <th>ID</th>
                                                       <th>{t('Permission Name')}</th>
                                                       <th>{t('Actions')}</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {permissions.length > 0 ? (
                                                       permissions.map((perm) => (
                                                            <tr key={perm.id}>
                                                                 <td>{perm.id}</td>
                                                                 <td>{perm.name}</td>
                                                                 <td className="col-2">
                                                                      <button
                                                                           className="btn btn-danger btn-sm"
                                                                           onClick={() => handleDeletePermission(perm.id)}>
                                                                           <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  ) : (
                                                       <tr>
                                                            <td colSpan="3">{t('No permissions found')}</td>
                                                       </tr>
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         </div>
                    </div>
               )}

               <ToastContainer
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
               />
          </div>
     );
}
