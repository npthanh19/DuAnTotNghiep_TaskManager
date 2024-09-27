import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';
import { CommentForm } from '../comment/View';

export const View = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedTaskId, setSelectedTaskId] = useState(null);
     const [showCommentForm, setShowCommentForm] = useState(false);

     const handleDeleteClick = (id) => {
          setSelectedTaskId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedTaskId(null);
     };

     const deleteTask = async (id) => {
          console.log(`Task ID ${id} deleted.`);
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/tasks/edit/${id}`);
     };

     const handleStatusChange = (id, newStatus) => {
          console.log(`Task ID ${id} status changed to ${newStatus}`);
     };

     const handleCommentClick = (id) => {
          setSelectedTaskId(id);
          setShowCommentForm(true);
     };

     const handleCloseCommentForm = () => {
          setShowCommentForm(false);
          setSelectedTaskId(null);
     };

     const tasks = [
          {
               id: 1,
               task_name: 'Task 1',
               description: 'Description 1',
               start_date: '2024-01-01',
               end_date: '2024-12-31',
               status: 'Active',
               project_id: 1,
          },
          {
               id: 2,
               task_name: 'Task 2',
               description: 'Description 2',
               start_date: '2024-02-01',
               end_date: '2024-11-30',
               status: 'Inactive',
               project_id: 2,
          },
     ];

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(tasks.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Tasks')}</span>
                    </h3>
                    <Link to="/taskmaneger/tasks/add" className="btn btn-primary">
                         <i className="bi bi-plus me-2"></i> {t('Add new task')}
                    </Link>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col-1">ID</th>
                                   <th className="col-2">{t('Task Name')}</th>
                                   <th className="col-2">{t('Description')}</th>
                                   <th className="col-2">{t('Start Date')}</th>
                                   <th className="col-2">{t('End Date')}</th>
                                   <th className="col-1">{t('Status')}</th>
                                   <th className="col-1">{t('Project ID')}</th>
                                   <th className="col-1">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentTasks.map((task) => (
                                   <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.task_name}</td>
                                        <td>{task.description}</td>
                                        <td>{task.start_date}</td>
                                        <td>{task.end_date}</td>
                                        <td>
                                             <select
                                                  value={task.status}
                                                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                  className="form-select">
                                                  <option value="Active">{t('Active')}</option>
                                                  <option value="Inactive">{t('Inactive')}</option>
                                             </select>
                                        </td>
                                        <td>{task.project_id}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${task.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${task.id}`}>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-primary"
                                                                 onClick={() => handleCommentClick(task.id)}>
                                                                 <i className="bi bi-chat me-2"></i> {t('Comment')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(task.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(task.id)}>
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
               {showDeleteModal && <Delete onClose={handleCloseModal} taskId={selectedTaskId} deleteTask={deleteTask} />}
               {showCommentForm && <CommentForm taskId={selectedTaskId} showModal={showCommentForm} handleCloseModal={handleCloseCommentForm} />}
          </div>
     );
};
