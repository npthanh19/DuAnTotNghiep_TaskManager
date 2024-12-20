import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllDepartments, deleteDepartment } from '../../../services/deparmentsService';
import AddUserToDepartment from './AddUserToDepartment';
import Swal from 'sweetalert2';

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
     const [searchTerm, setSearchTerm] = useState('');
     const [filteredDepartments, setFilteredDepartments] = useState(departments);

     useEffect(() => {
          const fetchDepartments = async () => {
               try {
                    const fetchedDepartments = await getAllDepartments();
                    const sortedDepartments = fetchedDepartments.sort((a, b) => b.id - a.id);
                    setDepartments(sortedDepartments);
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

     const handleSearchChange = async (e) => {
          const value = e.target.value;
          setSearchTerm(value);

          if (value) {
               // Thực hiện tìm kiếm với Ajax hoặc gọi API tìm kiếm ở backend
               try {
                    const fetchedDepartments = await getAllDepartments(value); // Truyền giá trị tìm kiếm vào API
                    setFilteredDepartments(fetchedDepartments);
               } catch (err) {
                    setError(err.message || 'Không thể lấy danh sách departments');
               }
          } else {
               // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ danh sách departments
               setFilteredDepartments(departments);
          }
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
               <div className="card-header d-flex justify-content-between align-items-center border-bottom py-3">
                    <h3 className="fw-bold text-center text-primary mb-0 fs-4">
                         <span className="marquee">{t('Departments')}</span>
                    </h3>
                    <div className="d-flex align-items-center">
                         <input type="text" className="form-control form-control-sm" placeholder={t('Search...')} onChange={handleSearchChange} />
                         <div className="d-flex align-items-center ms-3">
                              <Link to="/taskmaneger/departments/add" className="btn btn-primary btn-sm rounded-pill">
                                   <i className="bi bi-plus me-2"></i> {t('Add')}
                              </Link>
                              <button
                                   className="btn btn-outline-secondary btn-sm ms-2 rounded-pill"
                                   onClick={() => navigate('/taskmaneger/departments/trashed')}>
                                   <i className="bi bi-trash me-2"></i>
                              </button>
                         </div>
                    </div>
               </div>

               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th>STT</th>
                                   <th>{t('ID')}</th>
                                   <th>{t('Name')}</th>
                                   <th>{t('Description')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentDepartments.filter((department) => department.department_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                   .length === 0 ? (
                                   <tr>
                                        <td colSpan="5" className="text-center">
                                             {t('No departments found')}
                                        </td>
                                   </tr>
                              ) : (
                                   currentDepartments
                                        .filter((department) => department.department_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((department, index) => (
                                             <tr key={department.id}>
                                                  <td>{indexOfFirstItem + index + 1}</td>
                                                  <td>{department.id}</td>
                                                  <td>
                                                       <span
                                                            className="d-inline-block text-truncate"
                                                            style={{ maxWidth: '500px' }}
                                                            title={department.department_name}>
                                                            {department.department_name.length > 100
                                                                 ? `${department.department_name.slice(0, 100)}...`
                                                                 : department.department_name}
                                                       </span>
                                                  </td>
                                                  <td>
                                                       <span
                                                            className="d-inline-block text-truncate"
                                                            style={{ maxWidth: '500px' }}
                                                            title={department.description}>
                                                            {department.description.length > 100
                                                                 ? `${department.description.slice(0, 100)}...`
                                                                 : department.description}
                                                       </span>
                                                  </td>
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
                                                                      <button
                                                                           className="dropdown-item text-warning"
                                                                           onClick={() => handleEdit(department.id)}>
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
                                        ))
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
