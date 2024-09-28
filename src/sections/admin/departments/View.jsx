import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';

export const View = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

     const handleDeleteClick = (id) => {
          setSelectedDepartmentId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedDepartmentId(null);
     };

     const deleteDepartment = async (id) => {
          console.log(`Department ID ${id} deleted.`);
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/departments/edit/${id}`);
     };

     const departments = [
          {
               id: 1,
               department_name: 'Department 1',
               description: 'Description 1',
          },
          {
               id: 2,
               department_name: 'Department 2',
               description: 'Description 2',
          },
     ];

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentDepartments = departments.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(departments.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Departments')}</span>
                    </h3>
                    <Link to="/taskmaneger/departments/add" className="btn btn-primary">
                         <i className="bi bi-plus me-2"></i> {t('Add new department')}
                    </Link>
               </div>

               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col-1">ID</th>
                                   <th className="col-2">{t('Department Name')}</th>
                                   <th className="col-4">{t('Description')}</th>
                                   <th className="col-1">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentDepartments.map((department) => (
                                   <tr key={department.id}>
                                        <td>{department.id}</td>
                                        <td>{department.department_name}</td>
                                        <td>{department.description}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${department.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${department.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(department.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeleteClick(department.id)}>
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
               {showDeleteModal && <Delete onClose={handleCloseModal} departmentId={selectedDepartmentId} deleteDepartment={deleteDepartment} />}
          </div>
     );
};
