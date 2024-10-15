import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';
import { getAllAssignments, deleteAssignment } from '../../../services/assignmentService';

export const View = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [assignments, setAssignments] = useState([]);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

     useEffect(() => {
          const fetchAssignments = async () => {
               try {
                    const allAssignments = await getAllAssignments();
                    setAssignments(allAssignments);
               } catch (error) {
                    console.error('Failed to fetch assignments:', error);
               }
          };

          fetchAssignments();
     }, []);

     const handleDeleteClick = (id) => {
          setSelectedAssignmentId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedAssignmentId(null);
     };

     const deleteAssignmentHandler = async (id) => {
          try {
               await deleteAssignment(id);
               setAssignments(assignments.filter((assignment) => assignment.id !== id));
               console.log(`Assignment ID ${id} deleted.`);
          } catch (error) {
               console.error('Failed to delete assignment:', error);
          }
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

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Assignments')}</span>
                    </h3>
                    <Link to="/taskmaneger/assignments/add" className="btn btn-primary">
                         <i className="bi bi-plus me-2"></i> {t('Add ')}
                    </Link>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col-1">ID</th>
                                   <th className="col-2">{t('User ID')}</th>
                                   <th className="col-2">{t('Task ID')}</th>
                                   <th className="col-2">{t('Department ID')}</th>
                                   <th className="col-2">{t('Status')}</th>
                                   <th className="col-1">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentAssignments.map((assignment) => (
                                   <tr key={assignment.id}>
                                        <td>{assignment.id}</td>
                                        <td>{assignment.user_name}</td>
                                        <td>{assignment.task_name}</td>
                                        <td>{assignment.department_name}</td>
                                        <td>{assignment.status}</td>
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

               {showDeleteModal && (
                    <Delete assignmentId={selectedAssignmentId} onClose={handleCloseModal} deleteAssignment={deleteAssignmentHandler} />
               )}
          </div>
     );
};
