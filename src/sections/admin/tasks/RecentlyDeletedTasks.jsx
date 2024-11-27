import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import { getTrashedTasks, restoreTask, forceDeleteTask } from '../../../services/tasksService';
import { useForm } from 'react-hook-form';

function RecentlyDeletedTasks() {
     const [tasks, setTasks] = useState([]);
     const { t } = useTranslation();
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;
     const [searchTerm, setSearchTerm] = useState('');
     const {
          register,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm();

     useEffect(() => {
          const fetchTrashedTasks = async () => {
               try {
                    const trashTasks = await getTrashedTasks();
                    setTasks(trashTasks.data);
               } catch (error) {
                    setError(error.message);
               } finally {
                    setLoading(false);
               }
          };

          fetchTrashedTasks();
     }, []);

     const handleRestore = async (id) => {
          const result = await Swal.fire({
               title: t('Restore task'),
               text: t('Are you sure you want to restore this task?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: t('Restore'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await restoreTask(id);
                    setTasks(tasks.filter((task) => task.id !== id));
                    Swal.fire({
                         icon: 'success',
                         title: t('Restored'),
                         text: t('Task restored successfully.'),
                         showConfirmButton: false,
                         timer: 2000,
                         toast: true,
                         position: 'top-right',
                    });
                    reset();
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         title: t('Restore Failed!'),
                         text: error.message || t('Something went wrong'),
                    });
               }
          }
     };

     const handleDeletePermanently = async (id) => {
          const result = await Swal.fire({
               title: t('Delete task'),
               text: t('Are you sure you want to permanently delete this task?'),
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: t('Delete'),
               cancelButtonText: t('Cancel'),
          });

          if (result.isConfirmed) {
               try {
                    await forceDeleteTask(id);
                    setTasks(tasks.filter((task) => task.id !== id));
                    Swal.fire({
                         icon: 'success',
                         title: t('Deleted'),
                         text: t('Task permanently deleted.'),
                         showConfirmButton: false,
                         timer: 3000,
                         toast: true,
                         position: 'top-right',
                    });
               } catch (error) {
                    Swal.fire({
                         icon: 'error',
                         title: t('Delete Failed!'),
                         text: t('An error occurred while deleting the task'),
                    });
               }
          }
     };

     const filteredTasks = Array.isArray(tasks)
          ? tasks.filter((task) => task.task_name && task.task_name.toLowerCase().includes(searchTerm.toLowerCase()))
          : [];

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);
     const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
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
                         <span>{t('Recently Deleted Tasks')}</span>
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
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr className="text-center">
                                   <th>{t('ID')}</th>
                                   <th>{t('Task Name')}</th>
                                   <th>{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentTasks.map((task) => (
                                   <tr key={task.id} className="text-center">
                                        <td>{task.id}</td>
                                        <td>{task.task_name}</td>
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
                                                            <button className="dropdown-item text-warning" onClick={() => handleRestore(task.id)}>
                                                                 <i className="bi bi-arrow-clockwise me-2"></i> {t('Restore')}
                                                            </button>
                                                       </li>

                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeletePermanently(task.id)}>
                                                                 <i className="bi bi-trash me-2"></i> {t('Delete')}
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                              {currentTasks.length === 0 && (
                                   <tr>
                                        <td colSpan="3" className="text-center">
                                             {t('No recently deleted tasks found.')}
                                        </td>
                                   </tr>
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
}

export default RecentlyDeletedTasks;
