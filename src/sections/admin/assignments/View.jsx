import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAssignments, deleteAssignment } from '../../../services/assignmentService';
import { getAllProjects } from '../../../services/projectsService';
import Swal from 'sweetalert2';

export const View = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 5;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [assignments, setAssignments] = useState([]);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
     const [loading, setLoading] = useState(true);
     const [projects, setProjects] = useState([]);

     useEffect(() => {
          const fetchAssignments = async () => {
               setLoading(true);
               try {
                    const allAssignments = await getAllAssignments();
                    const allProjects = await getAllProjects();
                    setAssignments(allAssignments);
                    setProjects(allProjects);
                    const sortedAssignments = allAssignments.sort((a, b) => b.id - a.id);
               } catch (error) {
                    console.error(t('Failed:'), error);
               } finally {
                    setLoading(false);
               }
          };
          fetchAssignments();
     }, []);

     const handleDeleteClick = (id) => {
          const deleteTitle = t('Delete Assignments');

          Swal.fire({
               title: deleteTitle,
               text: t('Are you sure you want to delete this assignments?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         await deleteAssignment(id);
                         setAssignments((prevWorktimes) => prevWorktimes.filter((worktime) => worktime.id !== id));

                         Swal.fire({
                              icon: 'success',
                              text: t('The assignments has been moved to the trash!'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         Swal.fire({
                              icon: 'error',
                              text: t('An error occurred while deleting the assignments.'),
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
          navigate(`/taskmaneger/assignments/edit/${id}`);
     };

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentAssignments = assignments.slice(indexOfFirstItem, indexOfLastItem);

     const totalPages = Math.ceil(assignments.length / itemsPerPage);

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

     const getProjectName = (projectId) => {
          const project = projects.find((p) => p.id === projectId);
          return project ? project.project_name : '';
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Assignments')}</span>
                    </h3>
                    <div className="d-flex align-items-center ms-auto">
                         <Link to="/taskmaneger/assignments/add" className="btn btn-primary btn-sm me-2">
                              <i className="bi bi-plus me-2"></i> {t('Add')}
                         </Link>
                         <button
                              className="btn btn-outline-secondary btn-sm d-flex align-items-center ms-2"
                              onClick={() => navigate('/taskmaneger/assignments/trashed')}>
                              <i className="bi bi-trash me-2"></i>
                         </button>
                    </div>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="">{t('STT')}</th>
                                   <th className="">{t('ID')}</th>
                                   <th className="">{t('Project Name')}</th>
                                   <th className="">{t('Task Name')}</th>
                                   <th className="">{t('Department Name')}</th>
                                   <th className="">{t('User Name')}</th>
                                   <th className="">{t('Note')}</th>
                                   <th className="">{t('Status')}</th>
                                   <th className="col-1">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentAssignments.map((assignment, index) => (
                                   <tr key={assignment.id}>
                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                        <td>{assignment.id}</td>
                                        <td>
                                             <span
                                                  className="d-inline-block text-truncate"
                                                  style={{ maxWidth: '150px' }}
                                                  title={getProjectName(assignment.project_id)}>
                                                  {getProjectName(assignment.project_id).slice(0, 20)}...
                                             </span>
                                        </td>
                                        <td>
                                             <span
                                                  className="d-inline-block text-truncate"
                                                  style={{ maxWidth: '150px' }}
                                                  title={assignment.task_name}>
                                                  {assignment.task_name.slice(0, 20)}...
                                             </span>
                                        </td>
                                        <td>
                                             <span
                                                  className="d-inline-block text-truncate"
                                                  style={{ maxWidth: '150px' }}
                                                  title={assignment.department_name}>
                                                  {assignment.department_name.slice(0, 20)}...
                                             </span>
                                        </td>
                                        <td>
                                             <span
                                                  className="d-inline-block text-truncate"
                                                  style={{ maxWidth: '150px' }}
                                                  title={assignment.user_name}>
                                                  {assignment.user_name.slice(0, 20)}...
                                             </span>
                                        </td>
                                        <td>
                                             <span className="d-inline-block text-truncate" style={{ maxWidth: '150px' }} title={assignment.note}>
                                                  {assignment.note.slice(0, 20)}...
                                             </span>
                                        </td>
                                        <td>
                                             {assignment.status === 'to do' && (
                                                  <span className="badge bg-secondary text-wrap status-badge d-flex justify-content-center align-items-center">
                                                       {t('To Do')}
                                                  </span>
                                             )}
                                             {assignment.status === 'in progress' && (
                                                  <span className="badge bg-warning text-dark text-wrap status-badge d-flex justify-content-center align-items-center">
                                                       {t('In Progress')}
                                                  </span>
                                             )}
                                             {assignment.status === 'preview' && (
                                                  <span className="badge bg-info text-dark text-wrap status-badge d-flex justify-content-center align-items-center">
                                                       {t('Preview')}
                                                  </span>
                                             )}
                                             {assignment.status === 'done' && (
                                                  <span className="badge bg-success text-wrap status-badge d-flex justify-content-center align-items-center">
                                                       {t('Done')}
                                                  </span>
                                             )}
                                        </td>
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
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(assignment.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeleteClick(assignment.id)}>
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
          </div>
     );
};
