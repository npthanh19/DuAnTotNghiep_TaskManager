import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { getAllAssignments, deleteAssignment, updateAssignmentStatus } from '../../../services/assignmentService';
import { getAllProjects } from '../../../services/projectsService';
import Swal from 'sweetalert2';
import styled from 'styled-components';

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
     const [searchTerm, setSearchTerm] = useState('');

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

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
     };

     const statusMapping = {
          'to do': 1,
          'in progress': 2,
          preview: 3,
          done: 4,
     };

     const handleChangeAssignmentStatus = async (assignmentId, newStatus) => {
          const result = await Swal.fire({
               title: t('Are you sure you want to change the status?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: t('Yes, change'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    const statusValue = statusMapping[newStatus];
                    if (!statusValue) throw new Error('Invalid status selected');

                    await updateAssignmentStatus(assignmentId, statusValue);
                    setAssignments((prevAssignments) =>
                         prevAssignments.map((assignment) => (assignment.id === assignmentId ? { ...assignment, status: newStatus } : assignment)),
                    );
                    Swal.fire({
                         title: t('Success!'),
                         text: t('The assignment status has been updated.'),
                         icon: 'success',
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               } catch (error) {
                    console.error('Error updating assignment status:', error);
                    Swal.fire({
                         title: t('Error!'),
                         text: t('Failed to update the status. Please try again.'),
                         icon: 'error',
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               }
          }
     };

     const StatusSelect = styled.select`
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          width: 100%;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;

          background-color: ${({ status }) =>
               status === 'to do' ? '#f8f9fa' : status === 'in progress' ? '#ffc107' : status === 'preview' ? '#17a2b8' : '#28a745'};
          color: ${({ status }) => (status === 'to do' || status === 'in progress' ? '#212529' : '#fff')};

          &:focus {
               background-color: #ffffff;
               color: #212529;
          }
     `;

     const StatusOption = styled.option`
          text-align: center;
     `;

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center border-bottom py-3">
                    <h3 className="fw-bold text-center text-primary mb-0 fs-4">
                         <span className="marquee">{t('Assignments')}</span>
                    </h3>
                    <div className="d-flex align-items-center">
                         <input
                              type="text"
                              className="form-control form-control-sm me-2"
                              placeholder={t('Search...')}
                              value={searchTerm}
                              onChange={handleSearchChange}
                         />
                         <div className="d-flex align-items-center ms-3">
                              <Link to="/taskmaneger/assignments/add" className="btn btn-primary btn-sm rounded-pill">
                                   <i className="bi bi-plus me-2"></i> {t('Add')}
                              </Link>
                              <button
                                   className="btn btn-outline-secondary btn-sm ms-2 rounded-pill"
                                   onClick={() => navigate('/taskmaneger/assignments/trashed')}>
                                   <i className="bi bi-trash me-2"></i>
                              </button>
                         </div>
                    </div>
               </div>

               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="text-center">{t('STT')}</th>
                                   <th className="text-center">{t('ID')}</th>
                                   <th>{t('Project Name')}</th>
                                   <th>{t('Task Name')}</th>
                                   <th>{t('Department Name')}</th>
                                   <th className="text-center">{t('User Name')}</th>
                                   <th className="text-center">{t('Note')}</th>
                                   <th className="text-center">{t('Status')}</th>
                                   <th className="text-center">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentAssignments.length === 0 ? (
                                   <tr>
                                        <td colSpan="9" className="text-center">
                                             {t('No assignments found')}
                                        </td>
                                   </tr>
                              ) : (
                                   currentAssignments.map((assignment, index) => (
                                        <tr key={assignment.id}>
                                             <td className="text-center">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                             <td className="text-center">{assignment.id}</td>
                                             <td>
                                                  <span
                                                       className="d-inline-block text-truncate"
                                                       style={{ maxWidth: '150px' }}
                                                       title={getProjectName(assignment.project_id)}>
                                                       {getProjectName(assignment.project_id).length > 20
                                                            ? `${getProjectName(assignment.project_id).slice(0, 20)}...`
                                                            : getProjectName(assignment.project_id)}
                                                  </span>
                                             </td>
                                             <td>
                                                  <span
                                                       className="d-inline-block text-truncate"
                                                       style={{ maxWidth: '150px' }}
                                                       title={assignment.task_name}>
                                                       {assignment.task_name.length > 20
                                                            ? `${assignment.task_name.slice(0, 20)}...`
                                                            : assignment.task_name}
                                                  </span>
                                             </td>
                                             <td>
                                                  <span
                                                       className="d-inline-block text-truncate"
                                                       style={{ maxWidth: '150px' }}
                                                       title={assignment.department_name}>
                                                       {assignment.department_name.length > 20
                                                            ? `${assignment.department_name.slice(0, 20)}...`
                                                            : assignment.department_name}
                                                  </span>
                                             </td>
                                             <td className="text-center">
                                                  <span
                                                       className="d-inline-block text-truncate"
                                                       style={{ maxWidth: '150px' }}
                                                       title={assignment.user_name}>
                                                       {assignment.user_name.length > 20
                                                            ? `${assignment.user_name.slice(0, 20)}...`
                                                            : assignment.user_name}
                                                  </span>
                                             </td>
                                             <td className="text-center">
                                                  <span
                                                       className="d-inline-block text-truncate"
                                                       style={{ maxWidth: '250px' }}
                                                       title={assignment.note}>
                                                       {assignment.note.length > 30 ? `${assignment.note.slice(0, 30)}...` : assignment.note}
                                                  </span>
                                             </td>
                                             <td className="text-center">
                                                  <StatusSelect
                                                       status={assignment.status}
                                                       value={assignment.status}
                                                       onChange={(e) => handleChangeAssignmentStatus(assignment.id, e.target.value)}>
                                                       <StatusOption value="to do">{t('Pending')}</StatusOption>
                                                       <StatusOption value="in progress">{t('In Progress')}</StatusOption>
                                                       <StatusOption value="preview">{t('Preview')}</StatusOption>
                                                       <StatusOption value="done">{t('Done')}</StatusOption>
                                                  </StatusSelect>
                                             </td>
                                             <td className="text-center">
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
                                                                      onClick={() => handleEdit(assignment.id)}>
                                                                      <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                                 </button>
                                                            </li>
                                                            <li>
                                                                 <button
                                                                      className="dropdown-item text-danger"
                                                                      onClick={() => handleDeleteClick(assignment.id)}>
                                                                      <i className="bi bi-trash me-2"></i> {t('Delete')}
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
          </div>
     );
};
