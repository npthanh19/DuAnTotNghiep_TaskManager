import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { DeleteActivity } from '../../../sections/admin/activity_log/Delete';

export const View = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const [searchTerm, setSearchTerm] = useState('');
     const [filteredActivityLog, setFilteredActivityLog] = useState([]);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [SelectedActivityId, setSelectedActivityId] = useState(null);

     const handleDeleteClick = (id) => {
          setSelectedActivityId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedActivityId(null);
     };

     const activityLog = [
          { id: 1, activity: 'Task Created', timestamp: '2024-09-25 10:00:00', user_id: 101, project_id: 1001, task_id: 501 },
          { id: 2, activity: 'Task Updated', timestamp: '2024-09-26 12:00:00', user_id: 102, project_id: 1002, task_id: 502 },
          { id: 3, activity: 'Task Deleted', timestamp: '2024-09-26 13:30:00', user_id: 103, project_id: 1003, task_id: 503 },
          { id: 4, activity: 'User Logged In', timestamp: '2024-09-26 14:00:00', user_id: 104, project_id: 1004, task_id: 504 },
          { id: 5, activity: 'Task Assigned', timestamp: '2024-09-27 09:45:00', user_id: 105, project_id: 1005, task_id: 505 },
          { id: 6, activity: 'Comment Added', timestamp: '2024-09-27 10:15:00', user_id: 106, project_id: 1006, task_id: 506 },
          { id: 7, activity: 'Task Completed', timestamp: '2024-09-27 11:00:00', user_id: 107, project_id: 1007, task_id: 507 },
          { id: 8, activity: 'Project Created', timestamp: '2024-09-27 11:30:00', user_id: 108, project_id: 1008, task_id: 508 },
          { id: 9, activity: 'User Logged Out', timestamp: '2024-09-27 12:00:00', user_id: 109, project_id: 1009, task_id: 509 },
          { id: 10, activity: 'File Uploaded', timestamp: '2024-09-27 13:00:00', user_id: 110, project_id: 1010, task_id: 510 },
          { id: 11, activity: 'Task Reopened', timestamp: '2024-09-27 14:00:00', user_id: 111, project_id: 1011, task_id: 511 },
     ];

     const fetchFilteredActivityLog = async (searchTerm) => {
          return new Promise((resolve) => {
               setTimeout(() => {
                    const filteredLogs = activityLog.filter((log) => log.activity.toLowerCase().includes(searchTerm.toLowerCase()));
                    resolve(filteredLogs);
               }, 500);
          });
     };

     useEffect(() => {
          const delayDebounceFn = setTimeout(() => {
               if (searchTerm) {
                    fetchFilteredActivityLog(searchTerm).then((filteredLogs) => {
                         setFilteredActivityLog(filteredLogs);
                    });
               } else {
                    setFilteredActivityLog(activityLog);
               }
          }, 300);

          return () => clearTimeout(delayDebounceFn);
     }, [searchTerm]);

     const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
     };

     const handleSort = (order) => {};

     const handleFilterByDate = () => {};

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentActivityLog = filteredActivityLog.slice(indexOfFirstItem, indexOfLastItem);

     const totalPages = Math.ceil(filteredActivityLog.length / itemsPerPage);

     const handlePageChange = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4">
                         <span>Activity Log</span>
                    </h3>

                    <div className="d-flex">
                         <input
                              type="text"
                              className="form-control me-3"
                              placeholder={t('Search by Activity...')}
                              style={{ width: '250px' }}
                              value={searchTerm}
                              onChange={handleSearchChange}
                         />

                         <Dropdown className="btn-group">
                              <button
                                   className="btn btn-secondary dropdown-toggle"
                                   type="button"
                                   id="dropdownFilter"
                                   data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                   <i className="bi bi-filter me-2"></i> {t('Filter')}
                              </button>

                              <ul className="dropdown-menu small" aria-labelledby="dropdownFilter">
                                   <li>
                                        <button className="dropdown-item" onClick={() => handleFilterByDate()}>
                                             <i className="bi bi-calendar3 me-2"></i> {t('Filter by Date')}
                                        </button>
                                   </li>
                                   <li>
                                        <hr className="dropdown-divider" />
                                   </li>
                                   <li>
                                        <button className="dropdown-item" onClick={() => handleSort('az')}>
                                             <i className="bi bi-sort-alpha-down me-2"></i> {t('Sort A-Z')}
                                        </button>
                                   </li>
                                   <li>
                                        <button className="dropdown-item" onClick={() => handleSort('za')}>
                                             <i className="bi bi-sort-alpha-up me-2"></i> {t('Sort Z-A')}
                                        </button>
                                   </li>
                              </ul>
                         </Dropdown>
                    </div>
               </div>

               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col-1">ID</th>
                                   <th className="col-3">{t('Activity')}</th>
                                   <th className="col-2">{t('Timestamp')}</th>
                                   <th className="col-2">{t('User ID')}</th>
                                   <th className="col-2">{t('Project ID')}</th>
                                   <th className="col-2">{t('Task ID')}</th>
                                   <th className="col-2">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentActivityLog.map((log) => (
                                   <tr key={log.id}>
                                        <td>{log.id}</td>
                                        <td>{log.activity}</td>
                                        <td>{log.timestamp}</td>
                                        <td>{log.user_id}</td>
                                        <td>{log.project_id}</td>
                                        <td>{log.task_id}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${log.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${log.id}`}>
                                                       <li>
                                                            <button className="dropdown-item text-warning">
                                                                 <i className="bi bi-info-circle me-2"></i> {t('Detail')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-danger" onClick={() => handleDeleteClick(log.id)}>
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
               {showDeleteModal && <DeleteActivity activityId={SelectedActivityId} onClose={handleCloseModal} />}
          </div>
     );
};
