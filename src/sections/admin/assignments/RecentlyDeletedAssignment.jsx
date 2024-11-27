import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTrashedAssignments, forceDeleteAssignment, restoreAssignment } from '../../../services/assignmentService';
import { getUserById } from '../../../services/usersService';
import { getTaskById } from '../../../services/tasksService';
import { getDepartmentById } from '../../../services/deparmentsService';
import Swal from 'sweetalert2';

function RecentlyDeletedAssignment() {
     const { t } = useTranslation();
     const [assignments, setAssignments] = useState([]);
     const [loading, setLoading] = useState(true);
     const [searchTerm, setSearchTerm] = useState('');
     const [currentPage, setCurrentPage] = useState(1);
     const [error, setError] = useState(null);
     const itemsPerPage = 9;

     useEffect(() => {
          const fetchTrashedAssignments = async () => {
               setLoading(true);
               try {
                    const trashed = await getTrashedAssignments();
                    const assignmentsWithDetails = await Promise.all(
                         trashed.data.map(async (assignment) => {
                              const user = await getUserById(assignment.user_id);
                              const task = await getTaskById(assignment.task_id);
                              const department = await getDepartmentById(assignment.department_id);

                              return {
                                   ...assignment,
                                   user_name: user.fullname,
                                   task_name: task.task_name,
                                   department_name: department.department_name,
                              };
                         }),
                    );
                    setAssignments(assignmentsWithDetails);
               } catch (error) {
                    setError(error.message);
               } finally {
                    setLoading(false);
               }
          };

          fetchTrashedAssignments();
     }, []);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
     };

     const filteredAssignments = assignments.filter(
          (assignment) => assignment.user_name && assignment.user_name.toLowerCase().includes(searchTerm.toLowerCase()),
     );

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentAssignments = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

     const handleRestore = async (id) => {
          const result = await Swal.fire({
               title: t('Restore'),
               text: t('Are you sure you want to restore this assignment?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: t('Restore'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await restoreAssignment(id);
                    setAssignments(assignments.filter((assignment) => assignment.id !== id));
                    Swal.fire({
                         icon: 'success',
                         text: t('Assignment restored successfully!'),
                         toast: true,
                         position: 'top-right',
                         timer: 2000,
                         showConfirmButton: false,
                    });
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         text: t('Failed to restore assignment.'),
                         toast: true,
                         position: 'top-right',
                         timer: 2000,
                         showConfirmButton: false,
                    });
               }
          }
     };

     const handleForceDelete = async (id) => {
          const result = await Swal.fire({
               title: t('Delete assignment'),
               text: t('Are you sure you want to permanently delete this assignment?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await forceDeleteAssignment(id);
                    setAssignments(assignments.filter((assignment) => assignment.id !== id));
                    Swal.fire({
                         icon: 'success',
                         text: t('Assignment permanently deleted!'),
                         toast: true,
                         position: 'top-right',
                         timer: 3000,
                         showConfirmButton: false,
                    });
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         text: t('Failed to permanently delete assignment.'),
                         toast: true,
                         position: 'top-right',
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          }
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
                         <span>{t('Recently Deleted')}</span>
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
               <div className="card-body">
                    {assignments.length === 0 ? (
                         <div className="alert alert-info mt-2">{t('No assignments found in the trash.')}</div>
                    ) : (
                         <table className="table">
                              <thead>
                                   <tr>
                                        <th>ID</th>
                                        <th>{t('Task Name')}</th>
                                        <th>{t('Department Name')}</th>
                                        <th>{t('User Name')}</th>
                                        <th>{t('Note')}</th>
                                        <th>{t('Actions')}</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {currentAssignments.map((assignment) => (
                                        <tr key={assignment.id}>
                                             <td>{assignment.id}</td>
                                             <td>{assignment.task_name}</td>
                                             <td>{assignment.department_name}</td>
                                             <td>{assignment.user_name}</td>
                                             <td>{assignment.note}</td>
                                             <td>
                                                  <div className="dropdown">
                                                       <button
                                                            className="btn btn-sm"
                                                            type="button"
                                                            id={`dropdownMenuButton${assignment.id}`}
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false">
                                                            <i className="bi bi-three-dots-vertical"></i>
                                                       </button>
                                                       <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${assignment.id}`}>
                                                            <li>
                                                                 <button
                                                                      className="dropdown-item text-warning"
                                                                      onClick={() => handleRestore(assignment.id)}>
                                                                      <i className="bi bi-arrow-clockwise me-2"></i> {t('Restore')}
                                                                 </button>
                                                            </li>

                                                            <li>
                                                                 <button
                                                                      className="dropdown-item text-danger"
                                                                      onClick={() => handleForceDelete(assignment.id)}>
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
                    )}
               </div>
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
                              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                   {t('Next')}
                              </button>
                         </li>
                    </ul>
               </nav>
          </div>
     );
}

export default RecentlyDeletedAssignment;
