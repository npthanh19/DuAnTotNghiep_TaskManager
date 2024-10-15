import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from './Delete';
import { getAllProjects } from '../../../services/projectsService';
import { getUserById } from '../../../services/usersService';
import AddDepartmentForm from './AddDepartmentForm';

export const View = () => {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 9;

     const { t } = useTranslation();
     const navigate = useNavigate();

     const [showDeleteModal, setShowDeleteModal] = useState(false);
     const [selectedProjectId, setSelectedProjectId] = useState(null);
     const [projects, setProjects] = useState([]);
     const [users, setUsers] = useState({});
     const [loading, setLoading] = useState(true);
     const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
     const [currentProjectId, setCurrentProjectId] = useState(null);

     useEffect(() => {
          const fetchProjects = async () => {
               try {
                    const data = await getAllProjects();
                    setProjects(data);
                    const userIds = [...new Set(data.map((project) => project.user_id))];
                    const userPromises = userIds.map((id) => getUserById(id));
                    const usersData = await Promise.all(userPromises);
                    const usersMap = usersData.reduce((acc, user) => {
                         acc[user.id] = user.name;
                         return acc;
                    }, {});
                    setUsers(usersMap);
               } catch (error) {
                    console.error('Error fetching projects:', error);
               } finally {
                    setLoading(false);
               }
          };

          fetchProjects();
     }, []);

     const handleDeleteClick = (id) => {
          setSelectedProjectId(id);
          setShowDeleteModal(true);
     };

     const handleCloseModal = () => {
          setShowDeleteModal(false);
          setSelectedProjectId(null);
     };

     const handleDeleteSuccess = (id) => {
          setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
     };

     const handleEdit = (id) => {
          navigate(`/taskmaneger/projects/edit/${id}`);
     };

     const handleAddDepartmentClick = (projectId) => {
          setCurrentProjectId(projectId);
          setShowAddDepartmentForm(true);
     };

     const handleAddSuccess = () => {
          setShowAddDepartmentForm(false);
     };

     const indexOfLastItem = currentPage * itemsPerPage;
     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
     const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);

     const totalPages = Math.ceil(projects.length / itemsPerPage);

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

     return (
          <div className="card">
               <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="fw-bold py-3 mb-4 highlighted-text">
                         <span className="marquee">{t('Projects')}</span>
                    </h3>
                    <Link to="/taskmaneger/projects/add" className="btn btn-primary">
                         <i className="bi bi-plus me-2"></i> {t('Add')}
                    </Link>
               </div>
               <div className="card-body" style={{ padding: '0' }}>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th className="col">ID</th>
                                   <th className="col">{t('Project Name')}</th>
                                   <th className="col">{t('Description')}</th>
                                   <th className="col">{t('Start Date')}</th>
                                   <th className="col">{t('End Date')}</th>
                                   <th className="col">{t('Status')}</th>
                                   <th className="col">{t('User ID')}</th>
                                   <th className="col">{t('Actions')}</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentProjects.map((project) => (
                                   <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.project_name}</td>
                                        <td>{project.description}</td>
                                        <td>{project.start_date}</td>
                                        <td>{project.end_date}</td>
                                        <td>
                                             <span className="badge bg-secondary">{project.status}</span>
                                        </td>
                                        <td>{users[project.user_id]}</td>
                                        <td>
                                             <div className="dropdown">
                                                  <button
                                                       className="btn btn-sm"
                                                       type="button"
                                                       id={`dropdownMenuButton${project.id}`}
                                                       data-bs-toggle="dropdown"
                                                       aria-expanded="false">
                                                       <i className="bi bi-three-dots-vertical"></i>
                                                  </button>
                                                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${project.id}`}>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-warning"
                                                                 onClick={() => handleAddDepartmentClick(project.id)}>
                                                                 <i className="bi bi-plus me-2"></i> {t('Room')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button className="dropdown-item text-warning" onClick={() => handleEdit(project.id)}>
                                                                 <i className="bi bi-pencil me-2"></i> {t('Edit')}
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 className="dropdown-item text-danger"
                                                                 onClick={() => handleDeleteClick(project.id)}>
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
               <ToastContainer position="top-right" autoClose={2000} />
               {showDeleteModal && (
                    <Delete show={showDeleteModal} onClose={handleCloseModal} projectId={selectedProjectId} onDeleteSuccess={handleDeleteSuccess} />
               )}
               {showAddDepartmentForm && (
                    <AddDepartmentForm projectId={currentProjectId} onClose={() => setShowAddDepartmentForm(false)} onAddSuccess={handleAddSuccess} />
               )}
          </div>
     );
};
