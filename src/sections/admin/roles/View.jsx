import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteRoles } from '../../../sections/admin/roles/Delete';

export function View() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 5;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedRolesId, setSelectedRolesId] = useState(null);

     const handleDeleteClick = (id) => {
          setSelectedRolesId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedRolesId(null);
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/roles/edit/${id}`);
     };

     const handleStatusChange = (id, newStatus) => {
          console.log(`Roles ID ${id} status changed to ${newStatus}`);
     };

     const roles = [
          {
               id: 1,
               role_name: 'admin',
               description: 'all role',
          },
          {
               id: 2,
               role_name: 'user',
               description: 'no role admin',
          },
          {
               id: 3,
               role_name: 'quản lí',
               description: 'quản lí admin',
          },
          {
               id: 4,
               role_name: 'None',
               description: 'all role',
          },
          {
               id: 5,
               role_name: 'None',
               description: 'no role admin',
          },
          {
               id: 6,
               role_name: 'None',
               description: 'quản lí admin',
          },
     ];

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);

     const totalPages = Math.ceil(roles.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">Roles</span>
                    </h3>
                    <Link to="/taskmaneger/roles/add" className="btn btn-primary">
                         <i className="bi bi-plus me-2"></i> {t('Add new')}
                    </Link>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th>ID</th>
                                   <th>{t('Name')}</th>
                                   <th>{t('Description')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentRoles.map((roles) => (
                                   <tr key={roles.id}>
                                        <td>{roles.id}</td>
                                        <td>{roles.role_name}</td>
                                        <td>{roles.description}</td>
                                        <td className="col-1">
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${roles.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${roles.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(roles.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(roles.id)}>
                                                                 <i className="bi bi-trash me-2"></i>
                                                                 {t('Delete')}
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
               {showDeleteModal && <DeleteRoles rolesId={selectedRolesId} onClose={handleCloseModal} />}
          </div>
     );
}
