import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllDepartments, deleteDepartment } from '../../../services/deparmentsService';
import AddUserToDepartment from './AddUserToDepartment';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

export function View() {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;
     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
     const [departments, setDepartments] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);

     useEffect(() => {
          const fetchDepartments = async () => {
               try {
                    const fetchedDepartments = await getAllDepartments();
                    setDepartments(fetchedDepartments);
               } catch (err) {
                    setError(err.message || 'Cannot retrieve the list of departments');
               } finally {
                    setLoading(false);
               }
          };

          fetchDepartments();
     }, []);

     const handleDeleteClick = (id) => {
          const deleteTitle = t('Delete Departments');

          Swal.fire({
               title: deleteTitle,
               text: t('Are you sure you want to delete this departments?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         await deleteDepartment(id);
                         setDepartments((prevDepartments) => prevDepartments.filter((department) => department.id !== id));

                         Swal.fire({
                              icon: 'success',
                              text: t('The departments has been moved to the trash!'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         Swal.fire({
                              icon: 'error',
                              text: t('An error occurred while deleting the departments.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    }
               }
          });
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedDepartmentId(null);
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/departments/edit/${id}`);
     };

     const handleDeleteSuccess = (id) => {
          setDepartments((prevDepartments) => prevDepartments.filter((department) => department.id !== id));
     };

     const handleAddUserToDepartment = (id) => {
          setSelectedDepartmentId(id);
          setShowAddDepartmentForm(true);
     };

     const handleAddSuccess = () => {
          setShowAddDepartmentForm(false);
     };

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentDepartments = departments.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(departments.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
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

     if (error) {
          return <div className="text-danger text-center">{error}</div>;
     }

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Departments')}</span>
                    </h3>
                    <div className="d-flex align-items-center ms-auto">
                         <Link to="/taskmaneger/departments/add" className="btn btn-primary">
                              <i className="bi bi-plus me-2"></i> {t('Add')}
                         </Link>
                         <button
                              className="btn btn-outline-secondary btn-sm d-flex align-items-center ms-2"
                              onClick={() => navigate('/taskmaneger/departments/trashed')}>
                              <i className="bi bi-trash me-2"></i>
                         </button>
                    </div>
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
                                                                 <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-success"
                                                                 onClick={() => handleAddUserToDepartment(department.id)}>
                                                                 <i className="bi bi-person-plus me-2"></i> {t('Add User')}
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
               <ToastContainer position="top-right" autoClose={2000} />

               {showAddDepartmentForm && (
                    <AddUserToDepartment
                         departmentId={selectedDepartmentId}
                         onClose={() => setShowAddDepartmentForm(false)}
                         onAddSuccess={handleAddSuccess}
                    />
               )}
          </div>
     );
}
