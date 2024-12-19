import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';
import { CommentForm } from '../comment/View';
import { getAllTasks, deleteTask as deleteTaskService, updateTaskStatus } from '../../../services/tasksService';
import { getAllProjects } from '../../../services/projectsService';
import { getFilesByTaskId } from '../../../services/fileService';
import Swal from 'sweetalert2';
import styled from 'styled-components';

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
          const deleteTitle = t('Delete Tasks');

          Swal.fire({
               title: deleteTitle,
               text: t('Are you sure you want to delete this task?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         await deleteTask(id);
                         setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

                         Swal.fire({
                              icon: 'success',
                              text: t('The task has been moved to the trash!'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         Swal.fire({
                              icon: 'error',
                              text: t('An error occurred while deleting the task.'),
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
     /////////////////
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
          return (
               <div>
                    {t('Error fetching tasks or projects:')} {error}
               </div>
          );
     }
     ////////////////////////
     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
     };

     const handleDownloadFile = async (fileId, fileName) => {
          try {
               // Lấy token từ localStorage
               const userData = JSON.parse(localStorage.getItem('user')); // Nếu dùng key 'user'
               const token = userData ? userData.access_token : localStorage.getItem('token');

               if (!token) throw new Error('No token found');

               const fileUrl = `http://localhost:8000/api/files/${fileId}/download`;
               const response = await fetch(fileUrl, {
                    method: 'GET',
                    headers: {
                         Accept: 'application/json',
                         Authorization: `Bearer ${token}`, // Truyền token
                    },
               });

               if (!response.ok) {
                    const error = await response.json();
                    console.error('Chi tiết lỗi từ server:', error);
                    throw new Error('Không thể tải file');
               }

               // Tải file xuống
               const blob = await response.blob();
               const fileUrlBlob = URL.createObjectURL(blob);
               const link = document.createElement('a');
               link.href = fileUrlBlob;
               link.download = fileName;
               link.click();
               URL.revokeObjectURL(fileUrlBlob);
          } catch (error) {
               console.error('Lỗi khi tải file:', error);
          }
     };

     const statusMapping = {
          'to do': 1,
          'in progress': 2,
          preview: 3,
          done: 4,
     };

     const handleChangeTaskStatus = async (taskId, newStatus) => {
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

                    await updateTaskStatus(taskId, statusValue);
                    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
                    Swal.fire({
                         title: t('Success!'),
                         text: t('The task status has been updated.'),
                         icon: 'success',
                         position: 'top-right',
                         toast: true,
                         timer: 3000,
                         showConfirmButton: false,
                    });
               } catch (error) {
                    console.error('Error updating task status:', error);
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
                         <div className="d-flex align-items-center ms-3">
                              <Link to="/taskmaneger/tasks/add" className="btn btn-primary btn-sm rounded-pill">
                                   <i className="bi bi-plus me-2"></i> {t('Add')}
                              </Link>
                              <button
                                   className="btn btn-outline-secondary btn-sm ms-2 rounded-pill"
                                   onClick={() => navigate('/taskmaneger/tasks/trashed')}>
                                   <i className="bi bi-trash me-2"></i>
                              </button>
                         </div>
                    </div>
               </div>

               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead className="table-light">
                              <tr>
                                   <th className="text-center">{t('STT')}</th>
                                   <th className="text-center">{t('ID')}</th>
                                   <th>{t('Projects')}</th>
                                   <th>{t('Task Name')}</th>
                                   <th>{t('Start Date')}</th>
                                   <th>{t('End Date')}</th>
                                   <th className="text-center">{t('Time')}</th>
                                   <th>{t('Status')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentTasks.length === 0 ? (
                                   <tr>
                                        <td colSpan="9" className="text-center">
                                             {t('No tasks found')}
                                        </td>
                                   </tr>
                              ) : (
                                   currentTasks.map((task, index) => (
                                        <tr key={task.id}>
                                             <td className="text-center">{index + 1}</td>
                                             <td className="text-center">{task.id}</td>
                                             <td>{getProjectNameById(task.project_id)}</td>
                                             <td>{task.task_name}</td>
                                             <td>{task.start_date}</td>
                                             <td>{task.end_date}</td>
                                             <td className="text-center">{task.task_time}</td>
                                             <td>
                                                  <StatusSelect
                                                       status={task.status}
                                                       value={task.status}
                                                       onChange={(e) => handleChangeTaskStatus(task.id, e.target.value)}>
                                                       <StatusOption value="to do">{t('To Do')}</StatusOption>
                                                       <StatusOption value="in progress">{t('In Progress')}</StatusOption>
                                                       <StatusOption value="preview">{t('Preview')}</StatusOption>
                                                       <StatusOption value="done">{t('Done')}</StatusOption>
                                                  </StatusSelect>
                                             </td>
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
                                                                 <button
                                                                      className="dropdown-item text-danger"
                                                                      onClick={() => handleDeleteClick(task.id)}>
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

               {showDeleteModal && <Delete onClose={handleCloseModal} taskId={selectedTaskId} deleteTask={deleteTask} />}
               {showCommentForm && <CommentForm taskId={selectedTaskId} showModal={showCommentForm} handleCloseModal={handleCloseCommentForm} />}

               {showFilePopup && (
                    <div className="modal show" style={{ display: 'block' }}>
                         <div className="modal-dialog">
                              <div className="modal-content">
                                   <div className="modal-header">
                                        <h5 className="modal-title">{t('List of files')}</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowFilePopup(false)}></button>
                                   </div>
                                   <div className="modal-body">
                                        {taskFiles.length > 0 ? (
                                             <ul className="list-group">
                                                  {taskFiles.map((file) => (
                                                       <li
                                                            key={file.id}
                                                            className="list-group-item d-flex justify-content-between align-items-center">
                                                            <span
                                                                 className="text-truncate"
                                                                 style={{ maxWidth: '80%' }}
                                                                 title={file.file_name} // Hiển thị tên đầy đủ khi hover
                                                            >
                                                                 {file.file_name.length > 100
                                                                      ? `${file.file_name.substring(0, 97)}...`
                                                                      : file.file_name}
                                                            </span>
                                                            <button
                                                                 className="btn btn-link"
                                                                 onClick={() => handleDownloadFile(file.id, file.file_name)}>
                                                                 <i className="bi bi-file-earmark-arrow-down"></i>
                                                            </button>
                                                       </li>
                                                  ))}
                                             </ul>
                                        ) : (
                                             <p>{t('No files available for this task.')}</p>
                                        )}
                                   </div>
                                   <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary mt-2" onClick={() => setShowFilePopup(false)}>
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
