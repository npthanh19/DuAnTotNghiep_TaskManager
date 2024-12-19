import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteWorktime, getAllWorktimes, moveTasks, updateWorktime, updateWorktimeStatus } from '../../../services/worktimeService';
import { getAllProjects } from '../../../services/projectsService';
import { getAllUsers } from '../../../services/usersService';
import { DeleteWorktime } from './Delete';
import './worktime.css';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { getAllTasks, getTasksByWorktimeId } from '../../../services/tasksService';

export const View = () => {
     const [worktimes, setWorktimes] = useState([]);
     const [projects, setProjects] = useState([]);
     const [users, setUsers] = useState([]);
     const [tasks, setTasks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedWorktimeId, setSelectedWorktimeId] = useState(null);
     const [editingWorktime, setEditingWorktime] = useState(null);

     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;
     const totalPages = Math.ceil(worktimes.length / itemsPerPage);
     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentWorktimes = worktimes?.slice(indexOfFirstItem, indexOfLastItem);

     const { t } = useTranslation();
     const navigate = useNavigate();
     const [searchTerm, setSearchTerm] = useState('');

     console.log(worktimes);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [worktimeData, projectData, userData, taskData] = await Promise.all([
                         getAllWorktimes(),
                         getAllProjects(),
                         getAllUsers(),
                         getAllTasks(),
                    ]);
                    setWorktimes(worktimeData);
                    setProjects(projectData);
                    setUsers(userData);
                    setTasks(taskData);
               } catch (err) {
                    setError(err.message || 'Cannot retrieve data');
               } finally {
                    setLoading(false);
               }
          };

          fetchData();
     }, []);

     const handleDeleteClick = (id) => {
          const deleteTitle = t('Delete Worktime');
          const tasksInWorktime = tasks.filter((task) => task.worktime_id === id);

          if (tasksInWorktime.length > 0) {
               Swal.fire({
                    title: t('Cannot delete worktime'),
                    text: t('This worktime contains tasks. Please delete the tasks first.'),
                    icon: 'error',
                    confirmButtonText: t('OK'),
               });
               return;
          }

          Swal.fire({
               title: deleteTitle,
               text: t('Are you sure you want to delete this worktime?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         await deleteWorktime(id);
                         setWorktimes((prevWorktimes) => prevWorktimes.filter((worktime) => worktime.id !== id));

                         Swal.fire({
                              icon: 'success',
                              text: t('The worktime has been moved to the trash!'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    } catch (error) {
                         Swal.fire({
                              icon: 'error',
                              text: t('An error occurred while deleting the worktime.'),
                              position: 'top-right',
                              toast: true,
                              timer: 3000,
                              showConfirmButton: false,
                         });
                    }
               }
          });
     };

     const handleDeleteSuccess = (id) => {
          setWorktimes((prevWorktimes) => prevWorktimes.filter((worktime) => worktime.id !== id));
          Swal.fire({
               icon: 'success',
               title: t('Delete Successful!'),
               text: t('The worktime has been deleted successfully!'),
               timer: 2000,
               showConfirmButton: false,
          });
     };

     const handleEdit = (worktime) => {
          setEditingWorktime(worktime);
     };

     const handleUpdate = async () => {
          try {
               await updateWorktime(editingWorktime.id, editingWorktime);
               setWorktimes((prevWorktimes) => prevWorktimes.map((worktime) => (worktime.id === editingWorktime.id ? editingWorktime : worktime)));
               Swal.fire({
                    icon: 'success',
                    title: t('Update Successful!'),
                    text: t('The worktime has been updated successfully!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
               setEditingWorktime(null);
          } catch (err) {
               Swal.fire({
                    icon: 'error',
                    title: t('Update Failed!'),
                    text: t('Failed to update the worktime. Please try again later!'),
                    position: 'top-right',
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
               });
          }
     };

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleStart = async (worktime_id) => {
          Swal.fire({
               title: t('Are you sure you want to start?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonText: t('Start'),
               cancelButtonText: t('Cancel'),
          }).then(async (result) => {
               if (result.isConfirmed) {
                    try {
                         await updateWorktimeStatus(worktime_id, 2);
                         Swal.fire(t('Success!'), t('The worktime has been started.'), 'success');
                         const worktimeData = await getAllWorktimes();
                         setWorktimes(worktimeData);
                    } catch (error) {
                         Swal.fire(t('Error!'), t('Unable to update status. Please try again.'), 'error');
                    }
               }
          });
     };

     const handleComplete = async (worktime_id) => {
          const tasks = await getTasksByWorktimeId(worktime_id);
          const completedTasks = tasks.tasks.filter((task) => task.status === 'done').length;
          const todoTasks = tasks.tasks.filter((task) => task.status === 'to do').length;
          const previewTasks = tasks.tasks.filter((task) => task.status === 'preview').length;
          const inProgressTasks = tasks.tasks.filter((task) => task.status === 'in progress').length;
      
          const optionsHtml =
              inProgressTasks > 0
                  ? `
                  <option value="no_worktime">${t('No worktime (Default)')}</option>
                  ${worktimes
                      .filter((worktime) => worktime.id !== worktime_id)
                      .map((worktime) => `<option value="${worktime.id}">${worktime.name} (${worktime.status})</option>`)
                      .join('')}`
                  : '';
      
          const selectHtml =
              inProgressTasks > 0
                  ? `
                  <p>${t('Choose a worktime to manage remaining tasks:')}</p>
                  <div style="text-align: center;">
                      <select id="task-action" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem;">
                          ${optionsHtml}
                      </select>
                  </div>`
                  : `<p>${t('No remaining tasks to transfer.')}</p>`;
      
          Swal.fire({
              title: t('Are you sure you want to complete?'),
              icon: 'warning',
              html: `
                  <p>${t('Tasks Summary')}</p>
                  <ul>
                      <li>${t('Completed tasks:')} ${completedTasks}</li>
                      <li>${t('Preview tasks:')} ${previewTasks}</li>
                      <li>${t('In-progress tasks:')} ${inProgressTasks}</li>
                      <li>${t('To do tasks:')} ${todoTasks}</li>
                  </ul>
                  ${selectHtml}
              `,
              showCancelButton: true,
              confirmButtonText: t('Confirm'),
              cancelButtonText: t('Cancel'),
              preConfirm: () => {
                  const selectElement = document.getElementById('task-action');
                  if (selectElement) {
                      return { selectedWorktime: selectElement.value }; // Trả về giá trị worktime đã chọn
                  }
                  return null;
              },
          })
              .then(async (result) => {
                  if (!result.value) return;
                  const selectElement = document.getElementById('task-action');
                  try {
                      const selectedWorktime = selectElement.value;
                      await moveTasks(worktime_id, selectedWorktime === 'no_worktime' ? null : selectedWorktime);
                      await updateWorktimeStatus(worktime_id, 3);
                      Swal.fire(t('Success!'), t('The worktime has been updated.'), 'success');
      
                      const worktimeData = await getAllWorktimes();
                      setWorktimes(worktimeData);
                  } catch (error) {
                      Swal.fire(t('Error!'), t('Unable to update status. Please try again.'), 'error');
                  }
              })
              .catch((error) => {
                  if (error.message !== 'Action canceled') {
                      console.error('Unexpected error:', error);
                  }
              });
      };
      

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
     };

     const filteredWorktimes = worktimes.filter((worktime) => worktime.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
          return <div className="text-danger text-center">{error}</div>;
     }

     const WorktimeStatusButton = ({ status, worktimeId, handleStart, handleComplete }) => {
          return (
               <div className="d-flex gap-2">
                    {status === 'not start' ? (
                         <button onClick={() => handleStart(worktimeId)} className="btn btn-primary rounded-pill px-4 py-2">
                              <i className="bi bi-play me-2"></i> {t('Start')}
                         </button>
                    ) : (
                         <button onClick={() => handleComplete(worktimeId)} className="btn btn-success rounded-pill px-4 py-2">
                              <i className="bi bi-check-circle me-2"></i> {t('Done')}
                         </button>
                    )}
               </div>
          );
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center border-bottom py-3">
                    <h3 className="fw-bold text-center text-primary mb-0 fs-4">
                         <span className="marquee">{t('Worktimes')}</span>
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
                              <Link to="/taskmaneger/worktimes/add" className="btn btn-primary btn-sm rounded-pill">
                                   <i className="bi bi-plus me-2"></i> {t('Add')}
                              </Link>
                              <button
                                   className="btn btn-outline-secondary btn-sm ms-2 rounded-pill"
                                   onClick={() => navigate('/taskmaneger/worktimes/trashed')}>
                                   <i className="bi bi-trash me-2"></i>
                              </button>
                         </div>
                    </div>
               </div>

               <div className="card-body" style={{ padding: 0 }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th>{t('STT')}</th>
                                   <th>{t('ID')}</th>
                                   <th>{t('Name')}</th>
                                   <th>{t('Projects')}</th>
                                   <th>{t('User Create')}</th>
                                   <th>{t('Start Date')}</th>
                                   <th>{t('End Date')}</th>
                                   <th>{t('Status')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentWorktimes.length === 0 ? (
                                   <tr>
                                        <td colSpan="8" className="text-center">
                                             {t('No worktime found')}
                                        </td>
                                   </tr>
                              ) : (
                                   currentWorktimes.map((worktime, index) => {
                                        const project = worktime.project_id ? projects.find((proj) => proj.id === worktime.project_id) : null;
                                        const user = worktime.user_id ? users.find((usr) => usr.id === worktime.user_id) : null;

                                        return (
                                             <tr key={worktime.id}>
                                                  <td>{indexOfFirstItem + index + 1}</td>
                                                  <td>{worktime.id}</td>
                                                  <td>
                                                       {editingWorktime && editingWorktime.id === worktime.id ? (
                                                            <input
                                                                 type="text"
                                                                 value={editingWorktime.name}
                                                                 onChange={(e) => setEditingWorktime({ ...editingWorktime, name: e.target.value })}
                                                            />
                                                       ) : (
                                                            worktime.name
                                                       )}
                                                  </td>
                                                  <td>
                                                       {editingWorktime && editingWorktime.id === worktime.id ? (
                                                            <select
                                                                 value={editingWorktime.project_id}
                                                                 onChange={(e) =>
                                                                      setEditingWorktime({ ...editingWorktime, project_id: e.target.value })
                                                                 }>
                                                                 {projects.map((project) => (
                                                                      <option key={project.id} value={project.id}>
                                                                           {project.project_name}
                                                                      </option>
                                                                 ))}
                                                            </select>
                                                       ) : project ? (
                                                            project.project_name
                                                       ) : (
                                                            '-'
                                                       )}
                                                  </td>
                                                  <td>{user ? user.fullname : '-'}</td>
                                                  <td>
                                                       {editingWorktime && editingWorktime.id === worktime.id ? (
                                                            <input
                                                                 type="date"
                                                                 value={editingWorktime.start_date}
                                                                 onChange={(e) =>
                                                                      setEditingWorktime({ ...editingWorktime, start_date: e.target.value })
                                                                 }
                                                            />
                                                       ) : (
                                                            worktime.start_date
                                                       )}
                                                  </td>
                                                  <td>
                                                       {editingWorktime && editingWorktime.id === worktime.id ? (
                                                            <input
                                                                 type="date"
                                                                 value={editingWorktime.end_date}
                                                                 onChange={(e) =>
                                                                      setEditingWorktime({ ...editingWorktime, end_date: e.target.value })
                                                                 }
                                                            />
                                                       ) : (
                                                            worktime.end_date
                                                       )}
                                                  </td>
                                                  <td>{t(worktime.status)}</td>
                                                  <td>
                                                       <div className="dropdown">
                                                            <button
                                                                 className="btn btn-sm"
                                                                 type="button"
                                                                 data-bs-toggle="dropdown"
                                                                 aria-expanded="false">
                                                                 <i className="bi bi-three-dots-vertical"></i>
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                 <WorktimeStatusButton
                                                                      status={worktime.status}
                                                                      worktimeId={worktime.id}
                                                                      handleStart={handleStart}
                                                                      handleComplete={handleComplete}
                                                                 />
                                                                 <li>
                                                                      <button
                                                                           className="dropdown-item text-warning"
                                                                           onClick={() => handleEdit(worktime)}>
                                                                           <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                                      </button>
                                                                 </li>
                                                                 <li>
                                                                      <button
                                                                           className="dropdown-item text-danger"
                                                                           onClick={() => handleDeleteClick(worktime.id)}>
                                                                           <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                                      </button>
                                                                 </li>
                                                            </ul>
                                                       </div>
                                                  </td>
                                             </tr>
                                        );
                                   })
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
                    {editingWorktime && (
                         <div className="d-flex justify-content-end mt-3">
                              <button className="btn btn-success" onClick={handleUpdate}>
                                   {t('Save')}
                              </button>
                         </div>
                    )}
                    {showDeleteModal && (
                         <DeleteWorktime
                              show={showDeleteModal}
                              handleClose={() => setShowDeleteModal(false)}
                              handleDelete={handleDeleteSuccess}
                              worktimeId={selectedWorktimeId}
                         />
                    )}
               </div>
          </div>
     );
};
// 1
