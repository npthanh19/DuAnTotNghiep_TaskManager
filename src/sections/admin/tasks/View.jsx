import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';
import { CommentForm } from '../comment/View';
import { getAllTasks, deleteTask as deleteTaskService } from '../../../services/tasksService';
import { getAllProjects } from '../../../services/projectsService';
import { getFilesByTaskId } from '../../../services/fileService';

export const View = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedTaskId, setSelectedTaskId] = useState(null);
     const [showCommentForm, setShowCommentForm] = useState(false);
     const [showFilePopup, setShowFilePopup] = useState(false);
     const [taskFiles, setTaskFiles] = useState([]);
     const [tasks, setTasks] = useState([]);
     const [projects, setProjects] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [searchTerm, setSearchTerm] = useState('');

     useEffect(() => {
          const fetchTasksAndProjects = async () => {
               try {
                    const [tasksData, projectsData] = await Promise.all([getAllTasks(), getAllProjects()]);
                    const sortedTasks = tasksData.sort((a, b) => b.id - a.id);
                    setTasks(sortedTasks);
                    setProjects(projectsData);
               } catch (err) {
                    console.error('Failed to fetch tasks or projects:', err);
                    setError('Failed to fetch tasks or projects');
               } finally {
                    setLoading(false);
               }
          };
          fetchTasksAndProjects();
     }, []);

     const handleDeleteClick = (id) => {
          setSelectedTaskId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedTaskId(null);
     };

     const deleteTask = async (id) => {
          try {
               await deleteTaskService(id);
               setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
               console.log(`Task ID ${id} deleted.`);
          } catch (error) {
               console.error('Error deleting task:', error);
          }
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/tasks/edit/${id}`);
     };

     const handleCommentClick = (id) => {
          setSelectedTaskId(id);
          setShowCommentForm(true);
     };

     const handleCloseCommentForm = () => {
          setShowCommentForm(false);
          setSelectedTaskId(null);
     };

     const handleFileViewClick = async (taskId) => {
          try {
               // Fetch all files related to the task using a new service function
               const files = await getFilesByTaskId(taskId); // Replace with the actual service function to get files for a task
               setTaskFiles(files); // Set the files to state
               setShowFilePopup(true); // Show the popup with files
          } catch (error) {
               setError('Error fetching files. Please try again later.');
               console.error('Error fetching task files:', error);
          }
     };
     
        

     const getProjectNameById = (projectId) => {
          const project = projects.find((proj) => proj.id === projectId);
          return project ? project.project_name : 'Unknown Project';
     };

     const truncateText = (text, maxLength) => {
          return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
     };

     const filterTask = tasks.filter((task) => task.task_name.toLowerCase().includes(searchTerm.toLowerCase()));

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentTasks = filterTask.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filterTask.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     if (loading) {
          return (
               <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <div className="spinner-border" role="status">
                         <span className="visually-hidden">Loading...</span>
                    </div>
               </div>
          );
     }

     if (error) {
          return (
               <div>
                    {t('Error fetching tasks or projects:')} {error}
               </div>
          );
     }

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Tasks')}</span>
                    </h3>
                    <div className="d-flex align-items-center">
                         <input
                              type="text"
                              className="form-control form-control-sm me-2"
                              placeholder={t('Search...')}
                              value={searchTerm}
                              onChange={handleSearchChange}
                         />
                         <Link to="/taskmaneger/tasks/add" className="btn btn-primary">
                              <i className="bi bi-plus me-2"></i> {t('Add')}
                         </Link>
                    </div>
               </div>

               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col">ID</th>
                                   <th className="col">{t('Task Name')}</th>
                                   <th className="col">{t('Description')}</th>
                                   <th className="col">{t('Start Date')}</th>
                                   <th className="col">{t('End Date')}</th>
                                   <th className="col">{t('Status')}</th>
                                   <th className="col">{t('Project')}</th>
                                   <th className="col">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentTasks.map((task) => (
                                   <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{truncateText(task.task_name, 25)}</td>
                                        <td>{truncateText(task.description, 25)}</td>
                                        <td>{task.start_date}</td>
                                        <td>{task.end_date}</td>
                                        <td>
                                             {task.status === 'to do' && (
                                                  <span className="badge bg-secondary">{t('To Do')}</span>
                                             )}
                                             {task.status === 'in progress' && (
                                                  <span className="badge bg-warning text-dark">{t('In Progress')}</span>
                                             )}
                                             {task.status === 'preview' && (
                                                  <span className="badge bg-info text-dark">{t('Preview')}</span>
                                             )}
                                             {task.status === 'done' && (
                                                  <span className="badge bg-success">{t('Done')}</span>
                                             )}
                                        </td>

                                        <td>{truncateText(getProjectNameById(task.project_id), 15)}</td>
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
                                                            <button
                                                                 className="dropdown-item text-primary"
                                                                 onClick={() => handleFileViewClick(task.id)}>
                                                                 <i className="bi bi-file-earmark-text me-2"></i> {t('See File')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(task.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(task.id)}>
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

               {showFilePopup && (
     <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
               <div className="modal-content">
                    <div className="modal-header">
                         <h5 className="modal-title">Danh sách file</h5>
                         <button type="button" className="btn-close" onClick={() => setShowFilePopup(false)}></button>
                    </div>
                    <div className="modal-body">
                         {taskFiles.length > 0 ? (
                              <ul className="list-group">
                                   {taskFiles.map((file) => (
                                        <li key={file.id} className="list-group-item">
                                             <a href={file.url} target="_blank" rel="noopener noreferrer">
                                                  {file.file_name}
                                             </a>
                                        </li>
                                   ))}
                              </ul>
                         ) : (
                              <p>{t('No files available for this task.')}</p>
                         )}
                    </div>
                    <div className="modal-footer">
                         <button type="button" className="btn btn-secondary" onClick={() => setShowFilePopup(false)}>
                              {t('Close')}
                         </button>
                    </div>
               </div>
          </div>
     </div>
)}

          </div>
     );
};
